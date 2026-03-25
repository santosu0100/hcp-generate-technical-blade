import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, List, Palette, GripVertical, Layers } from 'lucide-react';
import { useTableState } from '@/hooks/useTableState';
import { ColumnManager } from './ColumnManager';
import { DataGrid } from './DataGrid';
import { GroupManager } from './GroupManager';
import { StyleSettings } from './StyleSettings';

interface Props {
  componentId: string;
  onClose: () => void;
}

export function TableEditorModal({ componentId, onClose }: Props) {
  const { 
    component, columns, setColumns, items, setItems, groups, setGroups, config, setConfig 
  } = useTableState(componentId);
  
  const [activeTab, setActiveTab] = useState<'columns' | 'data' | 'groups' | 'style'>('columns');

  if (!component) return null;

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
            {[
              { id: 'columns', label: 'Colunas', icon: <GripVertical size={18} /> },
              { id: 'data', label: 'Dados (Linhas)', icon: <List size={18} /> },
              { id: 'groups', label: 'Agrupamentos', icon: <Layers size={18} /> },
              { id: 'style', label: 'Estilos & Cores', icon: <Palette size={18} /> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.id ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            
            <div className="mt-auto p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                As alterações são salvas automaticamente no builder conforme você as realiza.
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto bg-slate-900/40 p-8">
            {activeTab === 'columns' && <ColumnManager columns={columns} setColumns={setColumns} />}
            {activeTab === 'data' && <DataGrid columns={columns} items={items} setItems={setItems} />}
            {activeTab === 'groups' && <GroupManager columns={columns} groups={groups} setGroups={setGroups} />}
            {activeTab === 'style' && <StyleSettings config={config} setConfig={setConfig} />}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/10 bg-black/20 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            Concluir Edição
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
