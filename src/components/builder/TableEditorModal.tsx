import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePdfBuilder } from '../../context/PdfBuilderContext';
import { X, Plus, Trash2, Settings, List, Palette, ChevronLeft, ChevronRight, GripVertical, Layers, LayoutGrid, Type, Bold, Italic } from 'lucide-react';
import { TableColumnConfig } from '../../types/pdf-components.types';
import { ColorInput } from './ColorInput';

interface Props {
  componentId: string;
  onClose: () => void;
}

export function TableEditorModal({ componentId, onClose }: Props) {
  const { rootComponents, updateComponent } = usePdfBuilder();
  
  // Encontrar o componente atual na árvore
  const findComponent = (nodes: any[], id: string): any => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node._childrenWrapped) {
        const found = findComponent(node._childrenWrapped, id);
        if (found) return found;
      }
    }
    return null;
  };

  const component = findComponent(rootComponents, componentId);
  const [activeTab, setActiveTab] = useState<'columns' | 'data' | 'groups' | 'style'>('columns');
  
  // State local para edição fluída
  const [columns, setColumns] = useState<TableColumnConfig[]>(component?.dto.data?.columns || []);
  const [items, setItems] = useState<any[]>(component?.dto.data?.items || []);
  const [groups, setGroups] = useState<any[]>(component?.dto.data?.groups || []);
  const [config, setConfig] = useState<any>(component?.dto.config || {});

  // Sincronizar com o contexto ao mudar
  useEffect(() => {
    updateComponent(componentId, {
      data: { ...component?.dto.data, columns, items, groups },
      config: config
    });
  }, [columns, items, groups, config]);

  if (!component) return null;

  const addColumn = () => {
    const newKey = `col_${columns.length + 1}`;
    setColumns([...columns, { key: newKey, label: `Nova Coluna ${columns.length + 1}`, width: 'auto', align: 'left' }]);
  };

  const removeColumn = (index: number) => {
    const newCols = [...columns];
    newCols.splice(index, 1);
    setColumns(newCols);
  };

  const updateColumn = (index: number, field: string, value: any) => {
    const newCols = [...columns];
    newCols[index] = { ...newCols[index], [field]: value };
    setColumns(newCols);
  };

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

  const addGroup = () => {
    setGroups([...groups, { label: 'Novo Grupo', columns: [], backgroundColor: '', textColor: '', bold: false, italic: false }]);
  };

  const removeGroup = (index: number) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const updateGroup = (index: number, field: string, value: any) => {
    const newGroups = [...groups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    setGroups(newGroups);
  };

  const toggleColumnInGroup = (groupIndex: number, colKey: string) => {
    const newGroups = [...groups];
    const currentCols = newGroups[groupIndex].columns || [];
    if (currentCols.includes(colKey)) {
      newGroups[groupIndex].columns = currentCols.filter((k: string) => k !== colKey);
    } else {
      newGroups[groupIndex].columns = [...currentCols, colKey];
    }
    setGroups(newGroups);
  };

  return createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-md z-100 flex items-center justify-center p-8 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 w-full max-w-6xl h-full max-h-[85vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               <List className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-0.5">Editor de Tabela</h2>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Configuração de Estrutura e Dados</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 border-r border-white/10 bg-black/20 flex flex-col p-4 gap-2">
            <button 
              onClick={() => setActiveTab('columns')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'columns' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <GripVertical size={18} /> Colunas
            </button>
            <button 
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'data' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <List size={18} /> Dados (Linhas)
            </button>
            <button 
              onClick={() => setActiveTab('groups')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'groups' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Layers size={18} /> Agrupamentos
            </button>
            <button 
              onClick={() => setActiveTab('style')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'style' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              <Palette size={18} /> Estilos & Cores
            </button>
            
            <div className="mt-auto p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                As alterações são salvas automaticamente no builder conforme você as realiza.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-900/40 p-8">
            
            {/* TAB: COLUMNS */}
            {activeTab === 'columns' && (
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
                      
                      {/* Estilos da Coluna */}
                      <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateColumn(idx, 'bold', !col.bold as any)}
                            className={`p-1.5 rounded transition-colors ${col.bold ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}
                            title="Negrito"
                          >
                            <Bold size={14} />
                          </button>
                          <button 
                            onClick={() => updateColumn(idx, 'italic', !col.italic as any)}
                            className={`p-1.5 rounded transition-colors ${col.italic ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10'}`}
                            title="Itálico"
                          >
                            <Italic size={14} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 flex-1">
                          <ColorInput 
                            label="Texto"
                            value={col.color || ''}
                            onChange={(val) => updateColumn(idx, 'color', val)}
                            labelClass="text-[10px] text-slate-500 uppercase font-bold"
                          />
                          <ColorInput 
                            label="Fundo"
                            value={col.backgroundColor || ''}
                            onChange={(val) => updateColumn(idx, 'backgroundColor', val)}
                            labelClass="text-[10px] text-slate-500 uppercase font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: GROUPS */}
            {activeTab === 'groups' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Agrupamentos de Colunas</h3>
                    <p className="text-sm text-slate-400">Crie cabeçalhos superiores que agrupam múltiplas colunas.</p>
                  </div>
                  <button 
                    onClick={addGroup}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all"
                  >
                    <Plus size={16} /> Novo Grupo
                  </button>
                </div>

                <div className="grid gap-4">
                  {groups.length === 0 && (
                    <div className="py-12 text-center text-slate-500 italic border-2 border-dashed border-white/5 rounded-xl">
                      Nenhum grupo definido.
                    </div>
                  )}
                  {groups.map((group, gIdx) => (
                    <div key={gIdx} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 max-w-sm space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Título do Grupo</label>
                          <input 
                            type="text"
                            value={group.label}
                            onChange={(e) => updateGroup(gIdx, 'label', e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                          />
                        </div>
                        <button 
                          onClick={() => removeGroup(gIdx)}
                          className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Colunas Incluídas</label>
                        <div className="flex flex-wrap gap-2">
                          {columns.map(col => (
                            <button
                              key={col.key}
                              onClick={() => toggleColumnInGroup(gIdx, col.key)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                                (group.columns || []).includes(col.key)
                                  ? 'bg-blue-500 border-blue-400 text-white shadow-md'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                              }`}
                            >
                              {col.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-8">
                        <ColorInput 
                          label="Cor de Fundo"
                          value={group.backgroundColor || ''}
                          onChange={(val) => updateGroup(gIdx, 'backgroundColor', val)}
                          labelClass="text-[10px] text-slate-500 uppercase font-bold mb-2 block"
                        />
                        <ColorInput 
                          label="Cor do Texto"
                          value={group.textColor || ''}
                          onChange={(val) => updateGroup(gIdx, 'textColor', val)}
                          labelClass="text-[10px] text-slate-500 uppercase font-bold mb-2 block"
                        />
                      </div>

                      <div className="flex justify-end gap-2 px-2">
                        <button 
                          onClick={() => updateGroup(gIdx, 'bold', !group.bold)}
                          className={`p-2 rounded transition-colors ${group.bold ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10 border border-white/10'}`}
                          title="Negrito"
                        >
                          <Bold size={16} />
                        </button>
                        <button 
                          onClick={() => updateGroup(gIdx, 'italic', !group.italic)}
                          className={`p-2 rounded transition-colors ${group.italic ? 'bg-blue-500 text-white' : 'text-slate-500 hover:bg-white/10 border border-white/10'}`}
                          title="Itálico"
                        >
                          <Italic size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: DATA */}
            {activeTab === 'data' && (
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
            )}

            {/* TAB: STYLE */}
            {activeTab === 'style' && (
              <div className="space-y-10 animate-in slide-in-from-right-4 duration-300 pb-10">
                {/* 1. Design Geral */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <LayoutGrid size={18} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Design Geral</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-300 text-[11px] uppercase tracking-wider">Variante base</label>
                      <div className="flex gap-2">
                        {['standard', 'secondary'].map(v => (
                          <button 
                            key={v}
                            onClick={() => setConfig({ ...config, variant: v })}
                            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                              (config.variant || 'standard') === v 
                                ? 'bg-blue-500 border-blue-400 text-white shadow-lg' 
                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                            }`}
                          >
                            {v === 'standard' ? 'Padrão' : 'Secundária'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-300 text-[11px] uppercase tracking-wider">Efeitos dinâmicos</label>
                      <button 
                        onClick={() => setConfig({ ...config, enableAlternateRows: !config.enableAlternateRows })}
                        className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-between ${
                          config.enableAlternateRows 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        Linhas Alternadas (Zebra)
                        <div className={`w-8 h-4 rounded-full relative transition-colors ${config.enableAlternateRows ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                          <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${config.enableAlternateRows ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                      </button>
                    </div>
                  </div>
                </section>

                {/* 2. Cabeçalhos */}
                <section className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Type size={18} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Cabeçalhos (Header)</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Header Principal</p>
                      <div className="grid grid-cols-2 gap-4">
                        <ColorInput 
                          label="Fundo"
                          value={config.headerBackgroundColor || ''}
                          onChange={(val) => setConfig({ ...config, headerBackgroundColor: val })}
                          labelClass="text-[10px] text-slate-500"
                        />
                        <ColorInput 
                          label="Texto"
                          value={config.headerTextColor || ''}
                          onChange={(val) => setConfig({ ...config, headerTextColor: val })}
                          labelClass="text-[10px] text-slate-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setConfig({ ...config, headerBold: !config.headerBold })}
                          className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.headerBold ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                        >
                          <Bold size={12} /> Negrito
                        </button>
                        <button 
                          onClick={() => setConfig({ ...config, headerItalic: !config.headerItalic })}
                          className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.headerItalic ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                        >
                          <Italic size={12} /> Itálico
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Header de Agrupamento</p>
                      <div className="grid grid-cols-2 gap-4">
                        <ColorInput 
                          label="Fundo"
                          value={config.groupHeaderBackgroundColor || ''}
                          onChange={(val) => setConfig({ ...config, groupHeaderBackgroundColor: val })}
                          labelClass="text-[10px] text-slate-500"
                        />
                        <ColorInput 
                          label="Texto"
                          value={config.groupHeaderTextColor || ''}
                          onChange={(val) => setConfig({ ...config, groupHeaderTextColor: val })}
                          labelClass="text-[10px] text-slate-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setConfig({ ...config, groupHeaderBold: !config.groupHeaderBold })}
                          className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.groupHeaderBold ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                        >
                          <Bold size={12} /> Negrito
                        </button>
                        <button 
                          onClick={() => setConfig({ ...config, groupHeaderItalic: !config.groupHeaderItalic })}
                          className={`flex-1 py-1.5 rounded border text-xs font-bold transition-all flex items-center justify-center gap-2 ${config.groupHeaderItalic ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                        >
                          <Italic size={12} /> Itálico
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Corpo e Fontes */}
                <section className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <List size={18} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Corpo & Fontes</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Tam. Fonte (Header)</label>
                      <input 
                        type="number" 
                        value={config.fontSize || 8}
                        onChange={(e) => setConfig({ ...config, fontSize: parseInt(e.target.value) })}
                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Tam. Fonte (Corpo)</label>
                      <input 
                        type="number" 
                        value={config.rowFontSize || 7}
                        onChange={(e) => setConfig({ ...config, rowFontSize: parseInt(e.target.value) })}
                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <ColorInput 
                      label="Fundo Padrão"
                      value={config.rowBackgroundColor || ''}
                      onChange={(val) => setConfig({ ...config, rowBackgroundColor: val })}
                      labelClass="text-[10px] text-slate-500 uppercase font-bold"
                    />
                    <ColorInput 
                      label="Fundo Zebra"
                      value={config.alternateRowBackgroundColor || ''}
                      onChange={(val) => setConfig({ ...config, alternateRowBackgroundColor: val })}
                      labelClass="text-[10px] text-slate-500 uppercase font-bold"
                    />
                  </div>
                </section>

                {/* 4. Bordas e Dimensões */}
                <section className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Settings size={18} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Bordas & Dimensões</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Largura Tabela</label>
                      <input 
                        type="text" 
                        value={config.tableWidth || '100%'}
                        onChange={(e) => setConfig({ ...config, tableWidth: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <ColorInput 
                      label="Cor da Borda"
                      value={config.borderColor || ''}
                      onChange={(val) => setConfig({ ...config, borderColor: val })}
                      labelClass="text-[10px] text-slate-500 uppercase font-bold"
                    />
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Espessura</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={config.borderWidth || 1}
                        onChange={(e) => setConfig({ ...config, borderWidth: parseFloat(e.target.value) })}
                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-bold">Arredondamento</label>
                      <input 
                        type="number" 
                        value={config.borderRadius || 4}
                        onChange={(e) => setConfig({ ...config, borderRadius: parseInt(e.target.value) })}
                        className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </section>

                {/* 5. Espaçamentos (Padding) */}
                <section className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <GripVertical size={18} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Espaçamentos (Padding & Margins)</h3>
                  </div>

                  <div className="grid grid-cols-4 gap-x-6 gap-y-8">
                     <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Padding X Célula</label>
                        <input 
                          type="number" 
                          value={config.cellPadding || 4}
                          onChange={(e) => setConfig({ ...config, cellPadding: parseInt(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Padding Y Célula</label>
                        <input 
                          type="number" 
                          value={config.cellPaddingY || 2}
                          onChange={(e) => setConfig({ ...config, cellPaddingY: parseInt(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Margem Header</label>
                        <input 
                          type="number" 
                          value={config.headerMarginBottom || 4}
                          onChange={(e) => setConfig({ ...config, headerMarginBottom: parseInt(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Margem Abaixo Grupo</label>
                        <input 
                          type="number" 
                          value={config.groupHeaderMarginBottom || 2}
                          onChange={(e) => setConfig({ ...config, groupHeaderMarginBottom: parseInt(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Espaçamento X</label>
                        <input 
                          type="number" 
                          value={config.cellSpacingX || 4}
                          onChange={(e) => setConfig({ ...config, cellSpacingX: parseInt(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">Espaçamento Y</label>
                        <input 
                          type="number" 
                          value={config.cellSpacingY || 4}
                          onChange={(e) => setConfig({ ...config, cellSpacingY: parseInt(e.target.value) })}
                          className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                        />
                     </div>
                  </div>
                </section>

              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/10 bg-black/20 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-lg active:scale-95"
          >
            Concluir Edição
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
