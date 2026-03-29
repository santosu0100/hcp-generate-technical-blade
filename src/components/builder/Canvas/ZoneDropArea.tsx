import React, { useState } from 'react';
import { usePdfBuilder, WrappedComponent } from '@/context/PdfBuilderContext';
import { CanvasNode } from './CanvasNode';

interface ZoneDropAreaProps {
  onDropType: (type: string) => boolean;
  currentNodes: WrappedComponent[];
  title: string;
  className?: string;
  initialConfig?: any;
  parentId?: string;
}

export function ZoneDropArea({ onDropType, currentNodes, title, className = '', initialConfig, parentId }: ZoneDropAreaProps) {
  const { addComponent, reorderComponent } = usePdfBuilder();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = () => setIsDragOver(false);
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.isNew && data.type && onDropType(data.type)) {
        addComponent(data.type, parentId, undefined, initialConfig);
      } else if (data.id) {
        reorderComponent(data.id, parentId);
      }
    } catch(err) {}
  };

  const hasContent = currentNodes.length > 0;

  return (
    <div 
       className={`rounded-md transition-all relative flex flex-col ${className} ${
         hasContent 
           ? 'border border-slate-200 bg-transparent py-3 px-3 items-stretch justify-start min-h-[80px]' 
           : 'border-2 border-dashed border-slate-300 bg-slate-50 min-h-[100px] items-center justify-center'
       } ${isDragOver ? 'border-blue-500 bg-blue-50/50' : ''}`}
       onDragOver={handleDragOver}
       onDragLeave={handleDragLeave}
       onDrop={handleDrop}
    >
       {!hasContent && <div className="text-slate-400 text-sm font-semibold uppercase pointer-events-none text-center p-5">{title}</div>}
       {currentNodes.map((c, idx) => <CanvasNode key={c.id} node={c} index={idx} parentId={parentId} />)}
    </div>
  );
}
