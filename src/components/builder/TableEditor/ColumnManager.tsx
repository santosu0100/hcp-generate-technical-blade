import { Plus, Trash2, Bold, Italic } from 'lucide-react';
import { TableColumnConfig } from '@/types/components.dto';
import { ColorInput } from '../ColorInput';

interface ColumnManagerProps {
  columns: TableColumnConfig[];
  setColumns: (cols: TableColumnConfig[]) => void;
}

export function ColumnManager({ columns, setColumns }: ColumnManagerProps) {
  const addColumn = () => {
    const newKey = `col_${columns.length + 1}`;
    setColumns([...columns, { 
      key: newKey, 
      label: `Nova Coluna ${columns.length + 1}`, 
      width: 'auto', 
      align: 'left',
      style: {} 
    }]);
  };

  const removeColumn = (index: number) => {
    const newCols = [...columns];
    newCols.splice(index, 1);
    setColumns(newCols);
  };

  const updateColumn = (index: number, field: string, value: any) => {
    const newCols = [...columns];
    if (['backgroundColor', 'textColor', 'bold', 'italic', 'fontSize'].includes(field)) {
      newCols[index] = { 
        ...newCols[index], 
        style: { ...(newCols[index].style || {}), [field]: value } 
      };
    } else {
      newCols[index] = { ...newCols[index], [field]: value };
    }
    setColumns(newCols);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Gerenciar Colunas</h3>
          <p className="text-sm text-slate-400">Defina os cabeçalhos e a largura proporcional de cada coluna.</p>
        </div>
        <button 
          onClick={addColumn}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/20"
        >
          <Plus size={16} /> Adicionar Coluna
        </button>
      </div>

      <div className="grid gap-3">
        {columns.length === 0 && (
          <div className="py-12 text-center text-slate-500 italic border-2 border-dashed border-white/5 rounded-xl">
            Nenhuma coluna definida. Adicione uma para começar.
          </div>
        )}
        {columns.map((col, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex gap-4 p-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Título (Label)</label>
                <input 
                  type="text" 
                  value={col.label}
                  onChange={(e) => updateColumn(idx, 'label', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="w-32 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Chave (ID)</label>
                <input 
                  type="text" 
                  value={col.key}
                  onChange={(e) => updateColumn(idx, 'key', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-mono outline-none focus:border-blue-500"
                />
              </div>
              <div className="w-24 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Largura</label>
                <input 
                  type="text" 
                  placeholder="ex: 25%"
                  value={col.width || ''}
                  onChange={(e) => updateColumn(idx, 'width', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="w-28 space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Alinhamento</label>
                <select 
                  value={col.align || 'left'}
                  onChange={(e) => updateColumn(idx, 'align', e.target.value as any)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500 appearance-none"
                >
                  <option value="left" className="bg-slate-800">Esquerda</option>
                  <option value="center" className="bg-slate-800">Centro</option>
                  <option value="right" className="bg-slate-800">Direita</option>
                </select>
              </div>
              <button 
                onClick={() => removeColumn(idx)}
                className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateColumn(idx, 'bold', !(col.style?.bold))}
                  className={`p-1.5 rounded transition-colors ${col.style?.bold ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}
                  title="Negrito"
                >
                  <Bold size={14} />
                </button>
                <button 
                  onClick={() => updateColumn(idx, 'italic', !(col.style?.italic))}
                  className={`p-1.5 rounded transition-colors ${col.style?.italic ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}
                  title="Itálico"
                >
                  <Italic size={14} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 flex-1">
                <ColorInput 
                  label="Texto"
                  value={col.style?.textColor || ''}
                  onChange={(val) => updateColumn(idx, 'textColor', val)}
                  labelClass="text-[10px] text-slate-500 uppercase font-bold"
                />
                <ColorInput 
                  label="Fundo"
                  value={col.style?.backgroundColor || ''}
                  onChange={(val) => updateColumn(idx, 'backgroundColor', val)}
                  labelClass="text-[10px] text-slate-500 uppercase font-bold"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
