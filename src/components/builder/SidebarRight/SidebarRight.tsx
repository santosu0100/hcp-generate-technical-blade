import { useState } from 'react';
import { usePdfBuilder } from '@/context/PdfBuilderContext';
import { Trash2, Settings } from 'lucide-react';
import { TableEditorModal } from '../TableEditor/TableEditorModal';
import { ComponentHeader } from './ComponentHeader';
import { OriginatorSelector } from './OriginatorSelector';
import { LayoutSettings } from './LayoutSettings';
import { ComponentFields } from './ComponentFields';

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

  const showAlignment = ['text', 'section', 'brand', 'label-value', 'arrow-list', 'bullet-list', 'ordered-list', 'marker-list', 'title-description'].includes(type);
  const showGrid = ['section', 'box-group'].includes(type);

  return (
    <div className="animate-in fade-in slide-in-from-right-2 duration-300 overflow-y-auto h-full pr-1">
      <ComponentHeader type={type} id={component.id} />

      <OriginatorSelector value={originator} onChange={setOriginator} />

      <ComponentFields 
        type={type} 
        data={data} 
        config={config} 
        onUpdateData={updateData} 
        onUpdateConfig={updateConfig}
        onOpenTableEditor={() => setIsTableModalOpen(true)}
      />

      {(showGrid || showAlignment) && (
        <LayoutSettings 
          layout={config.layout}
          itemsPerRow={config.itemsPerRow}
          gapX={config.gapX}
          gapY={config.gapY}
          align={config.align}
          textAlign={config.textAlign}
          onUpdateConfig={updateConfig}
          showGrid={showGrid}
          showAlignment={showAlignment}
        />
      )}

      {/* Generic Props / Actions */}
      <div className="mt-12 pt-6 border-t border-white/10 pb-8">
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
