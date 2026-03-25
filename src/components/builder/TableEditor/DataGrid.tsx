import React from 'react';
import { Plus, Trash2, Palette, Bold, Italic } from 'lucide-react';
import { TableColumnConfig } from '@/types/components.dto';
import { ColorInput } from '../ColorInput';

interface DataGridProps {
  columns: TableColumnConfig[];
  items: any[];
  setItems: (items: any[]) => void;
}

export function DataGrid({ columns, items, setItems }: DataGridProps) {
  const addRow = () => {
    setItems([...items, { cells: {} }]);
  };

  const removeRow = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const updateCell = (rowIndex: number, colKey: string, value: string) => {
    const newItems = [...items];
    const cells = { ...(newItems[rowIndex].cells || {}), [colKey]: value };
    newItems[rowIndex] = { ...newItems[rowIndex], cells };
    setItems(newItems);
  };

  const updateRowStyle = (rowIndex: number, field: string, value: any) => {
    const newItems = [...items];
    const style = { ...(newItems[rowIndex].style || {}), [field]: value };
    newItems[rowIndex] = { ...newItems[rowIndex], style };
    setItems(newItems);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div>
          <h3 className="text-lg font-bold text-white">Preencher Dados</h3>
          <p className="text-sm text-slate-400">Insira as informações de cada linha da tabela.</p>
        </div>
        <button 
          onClick={addRow}
          disabled={columns.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/20"
        >
          <Plus size={16} /> Adicionar Linha
        </button>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        {columns.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-slate-500 italic p-12 text-center">
            Defina as colunas primeiro para poder inserir dados.
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-800">
                <tr>
                  <th className="w-12 border-b border-white/10 p-4 text-left font-bold text-[10px] text-slate-400 uppercase">#</th>
                  {columns.map(col => (
                    <th key={col.key} className="border-b border-white/10 p-4 text-left font-bold text-[10px] text-slate-100 uppercase min-w-[150px]">
                      {col.label}
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5">{col.key}</div>
                    </th>
                  ))}
                  <th className="w-16 border-b border-white/10 p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + 2} className="p-8 text-center text-slate-600 italic">
                      Nenhuma linha cadastrada.
                    </td>
                  </tr>
                ) : (
                  items.map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      <tr className="hover:bg-white/5 group transition-colors">
                        <td className="p-4 text-[11px] font-mono text-slate-500">{rIdx + 1}</td>
                        {columns.map(col => (
                          <td key={col.key} className="p-2">
                            <input 
                              type="text"
                              value={row.cells?.[col.key] || ''}
                              onChange={(e) => updateCell(rIdx, col.key, e.target.value)}
                              className="w-full bg-transparent border border-transparent group-hover:border-white/10 hover:bg-black/20 rounded px-3 py-1.5 text-sm text-slate-200 focus:bg-black/40 focus:border-blue-500/50 outline-none transition-all"
                              placeholder="..."
                            />
                          </td>
                        ))}
                        <td className="p-2 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button 
                              onClick={() => updateRowStyle(rIdx, '_editingStyle', !row.style?._editingStyle)}
                              className={`p-2 rounded transition-colors ${row.style?._editingStyle ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:text-slate-300'}`}
                              title="Estilo da Linha"
                            >
                              <Palette size={16} />
                            </button>
                            <button 
                              onClick={() => removeRow(rIdx)}
                              className="p-2 text-slate-600 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {row.style?._editingStyle && (
                        <tr className="bg-blue-500/5 border-x border-blue-500/20">
                          <td colSpan={columns.length + 2} className="px-12 py-3">
                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => updateRowStyle(rIdx, 'bold', !row.style?.bold)}
                                  className={`p-1.5 rounded transition-colors ${row.style?.bold ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}
                                >
                                  <Bold size={14} />
                                </button>
                                <button 
                                  onClick={() => updateRowStyle(rIdx, 'italic', !row.style?.italic)}
                                  className={`p-1.5 rounded transition-colors ${row.style?.italic ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}
                                >
                                  <Italic size={14} />
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-4 flex-1">
                                <ColorInput 
                                  label="Texto"
                                  value={row.style?.textColor || ''}
                                  onChange={(val) => updateRowStyle(rIdx, 'textColor', val)}
                                  labelClass="text-[10px] text-slate-500 uppercase font-bold"
                                />
                                <ColorInput 
                                  label="Fundo"
                                  value={row.style?.backgroundColor || ''}
                                  onChange={(val) => updateRowStyle(rIdx, 'backgroundColor', val)}
                                  labelClass="text-[10px] text-slate-500 uppercase font-bold"
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
