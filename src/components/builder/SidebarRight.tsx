import React, { useState } from 'react';
import { usePdfBuilder } from '../../context/PdfBuilderContext';
import { 
  Trash2, Settings, FileText, Type, List, 
  Image as ImageIcon, Footprints, Columns, 
  Table as TableIcon, Edit3, AlignLeft, 
  AlignCenter, AlignRight, AlignJustify,
  Layout
} from 'lucide-react';
import { TableEditorModal } from './TableEditorModal';

export function SidebarRight() {
  const { rootComponents, selectedComponentId, updateComponent, originator, setOriginator } = usePdfBuilder();
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

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

  const component = selectedComponentId ? findComponent(rootComponents, selectedComponentId) : null;

  const updateData = (newData: any) => {
    if (!component) return;
    updateComponent(component.id, { data: { ...(component.dto.data || {}), ...newData } });
  };

  const updateConfig = (newConfig: any) => {
    if (!component) return;
    updateComponent(component.id, { config: { ...(component.dto.config || {}), ...newConfig } });
  };

  if (!component) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-slate-900/40">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5">
          <Settings size={32} className="opacity-20" />
        </div>
        <p className="text-sm font-medium">Selecione um componente para editar suas propriedades.</p>
      </div>
    );
  }

  const { dto } = component;
  const { type, data = {}, config = {} } = dto;

  const renderField = (label: string, value: string, onChange: (val: string) => void, fieldType: string = 'text') => (
    <div className="mb-4">
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <input 
        type={fieldType}
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-inner"
      />
    </div>
  );

  const renderSection = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="text-blue-500">{icon}</div>
        <h3 className="text-[11px] font-bold text-slate-100 uppercase tracking-[0.2em]">{title}</h3>
      </div>
      <div className="px-1">{children}</div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300">
      {/* Component Header Identity */}
      <div className="flex items-center gap-3 mb-8 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shrink-0">
           {type === 'text' && <Type size={20}/>}
           {type === 'section' && <Layout size={20}/>}
           {type === 'card' && <FileText size={20}/>}
           {type === 'sidebar' && <Columns size={20}/>}
           {type === 'footer' && <Footprints size={20}/>}
           {type === 'brand' && <ImageIcon size={20}/>}
           {type === 'table' && <TableIcon size={20}/>}
           {!['text', 'section', 'card', 'sidebar', 'footer', 'brand', 'table'].includes(type) && <Settings size={20}/>}
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-white uppercase tracking-tight truncate">{type}</h2>
          <p className="text-[10px] text-slate-400 font-mono truncate">{component.id}</p>
        </div>
      </div>

      {/* Originator Sync (Only on Root Components or Global) */}
      {renderSection('Originadora (Tema)', <ImageIcon size={14}/>, (
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
          value={originator} 
          onChange={e => setOriginator(e.target.value as any)}
        >
          <option value="hurst" className="bg-slate-800">Hurst</option>
          <option value="borum" className="bg-slate-800">Borum</option>
          <option value="ahlex" className="bg-slate-800">Ahlex</option>
          <option value="artk" className="bg-slate-800">ArtK</option>
          <option value="kateto" className="bg-slate-800">Kateto</option>
          <option value="muv" className="bg-slate-800">Muv</option>
        </select>
      ))}

      {/* Specific Component Data Fields */}
      {type === 'text' && renderSection('Conteúdo', <FileText size={14}/>, (
        <textarea 
          value={data.content || ''} 
          onChange={(e) => updateData({ content: e.target.value })}
          rows={6}
          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-inner resize-none"
        />
      ))}

      {type === 'section' && renderSection('Configurações', <Settings size={14}/>, 
        renderField('Título da Seção', data.title, (val) => updateData({ title: val }))
      )}

      {/* TABLE EDITOR TRIGGER */}
      {type === 'table' && (
        <div className="mb-8">
          <button 
            onClick={() => setIsTableModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            <Edit3 size={18} /> 🛠️ Abrir Editor de Tabela
          </button>
          <p className="text-[10px] text-slate-500 mt-2 text-center italic leading-relaxed">
            Utilize o editor em tela cheia para gerenciar colunas, linhas e alinhar dados complexos.
          </p>
        </div>
      )}

      {/* Layout Specific Configs */}
      {type === 'sidebar' && renderSection('Layout', <Columns size={14}/>, (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button 
              onClick={() => updateConfig({ position: 'left' })}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.position !== 'right' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
            >
              ESQUERDA
            </button>
            <button 
              onClick={() => updateConfig({ position: 'right' })}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.position === 'right' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
            >
              DIREITA
            </button>
          </div>
        </div>
      ))}

      {/* Global Appearance (Alignment) */}
      {['text', 'section', 'brand'].includes(type) && renderSection('Alinhamento', <AlignLeft size={14}/>, (
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/5">
           {[
             { val: 'left', icon: <AlignLeft size={16}/> },
             { val: 'center', icon: <AlignCenter size={16}/> },
             { val: 'right', icon: <AlignRight size={16}/> },
             { val: 'justify', icon: <AlignJustify size={16}/> }
           ].map(a => (
             <button 
                key={a.val}
                onClick={() => updateConfig({ align: a.val })}
                className={`flex-1 flex items-center justify-center py-2 rounded-md transition-all ${config.align === a.val ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
             >
                {a.icon}
             </button>
           ))}
        </div>
      ))}

      {/* Generic Props / Actions */}
      <div className="mt-12 pt-6 border-t border-white/10">
        <button 
          className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all group"
          title="Remover este componente"
        >
          <Trash2 size={16} className="group-hover:animate-bounce" />
          EXCLUIR COMPONENTE
        </button>
      </div>

      {/* Modal for Table */}
      {isTableModalOpen && (
        <TableEditorModal 
          componentId={component.id} 
          onClose={() => setIsTableModalOpen(false)} 
        />
      )}
    </div>
  );
}
