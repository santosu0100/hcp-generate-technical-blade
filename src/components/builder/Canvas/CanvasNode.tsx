import React, { useState } from 'react';
import { usePdfBuilder, WrappedComponent } from '@/context/PdfBuilderContext';
import { Trash2 } from 'lucide-react';

interface CanvasNodeProps {
  node: WrappedComponent;
  level?: number;
  index: number;
  parentId?: string;
}

export function CanvasNode({ node, level = 0, index, parentId }: CanvasNodeProps) {
  const { 
    removeComponent, 
    selectedComponentId, 
    setSelectedComponentId, 
    addComponent, 
    reorderComponent
  } = usePdfBuilder();
  
  const [dropPos, setDropPos] = useState<'before' | 'after' | 'inside' | null>(null);

  const supportsChildren = ['section', 'sidebar', 'footer', 'card'].includes(node.dto.type);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.dataTransfer.setData('application/json', JSON.stringify({ id: node.id }));
    e.dataTransfer.effectAllowed = 'move';
    (e.currentTarget as HTMLElement).style.opacity = '0.4';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDropPos(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const threshold = Math.min(rect.height * 0.3, 40);

    if (relY < threshold) {
      setDropPos('before');
    } else if (relY > rect.height - threshold) {
      setDropPos('after');
    } else if (supportsChildren) {
      setDropPos('inside');
    } else if (relY > rect.height / 2) {
      setDropPos('after');
    } else {
      setDropPos('before');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDropPos(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentPos = dropPos;
    setDropPos(null);

    try {
      const dataString = e.dataTransfer.getData('application/json');
      if (!dataString) return;
      
      const data = JSON.parse(dataString);
      const isNew = data.isNew;
      const sourceId = data.id;
      const type = data.type;

      if (currentPos === 'inside' && supportsChildren) {
        if (isNew) addComponent(type, node.id);
        else if (sourceId !== node.id) reorderComponent(sourceId, node.id);
      } else if (currentPos === 'before') {
        if (isNew) addComponent(type, parentId, index);
        else if (sourceId !== node.id) reorderComponent(sourceId, undefined, node.id, 'before');
      } else if (currentPos === 'after') {
        if (isNew) addComponent(type, parentId, index + 1);
        else if (sourceId !== node.id) reorderComponent(sourceId, undefined, node.id, 'after');
      }
    } catch(err) {}
  };

  return (
    <div className="relative group/node">
      {/* Drop indicator Before */}
      {dropPos === 'before' && (
        <div className="absolute top-[-6px] left-0 w-full h-[8px] flex items-center z-50 pointer-events-none">
          <div className="w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>
      )}
      
      <div 
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`mb-2 border bg-white rounded-md overflow-hidden transition-all cursor-move text-slate-700 shadow-sm ${
          selectedComponentId === node.id 
            ? 'border-blue-500 ring-2 ring-blue-500' 
            : dropPos === 'inside' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-400 ring-opacity-50' : 'border-slate-300'
        }`}
        onClick={(e) => { e.stopPropagation(); setSelectedComponentId(node.id); }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="bg-slate-100 py-1.5 px-3 flex justify-between items-center border-b border-slate-200">
           <span className="text-slate-900 font-semibold text-[11px] uppercase tracking-wider font-mono flex items-center gap-2">
             <span className="text-slate-400 group-hover/node:text-blue-500 transition-colors">⋮⋮</span>
             {node.dto.type}
           </span>
           <div className="flex gap-1">
             <button title="Excluir" onClick={(e) => { e.stopPropagation(); removeComponent(node.id); }} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors group">
               <Trash2 size={13}/>
             </button>
           </div>
        </div>
        
        <div className="p-2.5">
          {(node.dto as any).data?.title && <div className="font-bold mb-1 text-[13px]">{(node.dto as any).data.title}</div>}
          
          {supportsChildren && (
            <div className={`mt-2 p-2 border border-dashed rounded bg-slate-50 min-h-[40px] transition-colors ${dropPos === 'inside' ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300'}`}>
              {node._childrenWrapped && node._childrenWrapped.length > 0 ? (
                 node._childrenWrapped.map((child, idx) => (
                   <CanvasNode key={child.id} node={child} level={level + 1} index={idx} parentId={node.id} />
                 ))
              ) : (
                 <div className="text-[10px] text-slate-400 text-center italic pointer-events-none uppercase tracking-wider py-1">Conteúdo Interno</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Drop indicator After */}
      {dropPos === 'after' && (
        <div className="absolute bottom-[-2px] left-0 w-full h-[8px] flex items-center z-50 pointer-events-none">
          <div className="w-full h-[3px] bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
        </div>
      )}
    </div>
  );
}
