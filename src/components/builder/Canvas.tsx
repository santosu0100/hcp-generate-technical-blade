import React, { useState } from 'react';
import { usePdfBuilder, WrappedComponent } from '../../context/PdfBuilderContext';
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import { OperationTechnicalBladeDocument } from '../../components/pdf/render/operation-technical-blade-document';
import { PDFViewer } from '@react-pdf/renderer';

function CanvasNode({ node, level = 0, index, parentId }: { node: WrappedComponent, level?: number, index: number, parentId?: string }) {
  const { 
    removeComponent, 
    selectedComponentId, 
    setSelectedComponentId, 
    addComponent, 
    moveComponent,
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
    const threshold = Math.min(rect.height * 0.3, 40); // Max 40px for thresholds

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
          {node.dto.data?.title && <div className="font-bold mb-1 text-[13px]">{node.dto.data.title}</div>}
          
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

function ZoneDropArea({ onDropType, currentNodes, title, className = '', initialConfig, parentId }: { onDropType: (type: string) => boolean, currentNodes: WrappedComponent[], title: string, className?: string, initialConfig?: any, parentId?: string }) {
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
        addComponent(data.type, parentId, initialConfig);
      } else if (data.id) {
        // Movendo componente existente para a zona raiz (sempre append se for na área vazia da zona)
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
       } ${isDragOver ? 'border-blue-500! bg-blue-50/50' : ''}`}
       onDragOver={handleDragOver}
       onDragLeave={handleDragLeave}
       onDrop={handleDrop}
    >
       {!hasContent && <div className="text-slate-400 text-sm font-semibold uppercase pointer-events-none text-center p-5">{title}</div>}
       {currentNodes.map((c, idx) => <CanvasNode key={c.id} node={c} index={idx} parentId={parentId} />)}
    </div>
  );
}

export function Canvas() {
  const { rootComponents, getPayload } = usePdfBuilder();
  const [activeTab, setActiveTab] = useState<'builder'|'preview'|'json'>('builder');
  const [copied, setCopied] = useState(false);

  const payload = getPayload();

  const brand = rootComponents.filter(c => c.dto.type === 'brand');
  const sidebar = rootComponents.filter(c => c.dto.type === 'sidebar');
  const footer = rootComponents.filter(c => c.dto.type === 'footer');
  const main = rootComponents.filter(c => !['brand', 'sidebar', 'footer'].includes(c.dto.type));

  const hasLeftSidebar = sidebar.some(c => c.dto.config?.position !== 'right');
  const hasRightSidebar = sidebar.some(c => c.dto.config?.position === 'right');
  const noSidebar = sidebar.length === 0;

  return (
    <div className="flex flex-col h-full bg-slate-900/40">
      <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 bg-black/20 shrink-0">
        <button 
          className={`relative text-sm font-medium px-3 py-2 transition-colors ${activeTab === 'builder' ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`} 
          onClick={() => setActiveTab('builder')}
        >
          Builder Visual
          {activeTab === 'builder' && <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-blue-500" />}
        </button>
        <button 
          className={`relative text-sm font-medium px-3 py-2 transition-colors ${activeTab === 'preview' ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`} 
          onClick={() => setActiveTab('preview')}
        >
          PDF Preview
          {activeTab === 'preview' && <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-blue-500" />}
        </button>
        <button 
          className={`relative text-sm font-medium px-3 py-2 transition-colors ${activeTab === 'json' ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`} 
          onClick={() => setActiveTab('json')}
        >
          JSON Payload
          {activeTab === 'json' && <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-blue-500" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        {activeTab === 'builder' && (
          <div className="bg-white w-full max-w-4xl mx-auto rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col min-h-[842px] p-8 gap-6 text-slate-800 shrink-0 mb-10">
            <ZoneDropArea 
              title="Arraste o LOGO (Brand) aqui" 
              currentNodes={brand} 
              onDropType={(type) => type === 'brand'} 
            />
            
            <div className="flex flex-1 gap-6 min-h-[450px]">
              {(noSidebar || hasLeftSidebar) && (
                <ZoneDropArea 
                  title="Sidebar Esquerda" 
                  className={`shrink-0 transition-all ${hasLeftSidebar ? 'w-[260px]' : 'w-[120px]'}`}
                  currentNodes={sidebar.filter(c => c.dto.config?.position !== 'right')} 
                  onDropType={(type) => type === 'sidebar'} 
                  initialConfig={{ position: 'left' }}
                />
              )}
              
              <ZoneDropArea 
                title="Conteúdo Principal (Seções, Textos, Cartões...)" 
                className="flex-1 min-w-[300px]"
                currentNodes={main} 
                onDropType={(type) => !['brand', 'sidebar', 'footer'].includes(type)} 
              />
              
              {(noSidebar || hasRightSidebar) && (
                <ZoneDropArea 
                  title="Sidebar Direita" 
                  className={`shrink-0 transition-all ${hasRightSidebar ? 'w-[260px]' : 'w-[120px]'}`}
                  currentNodes={sidebar.filter(c => c.dto.config?.position === 'right')} 
                  onDropType={(type) => type === 'sidebar'} 
                  initialConfig={{ position: 'right' }}
                />
              )}
            </div>

            <ZoneDropArea 
              title="Arraste o RODAPÉ (Footer) aqui" 
              currentNodes={footer} 
              onDropType={(type) => type === 'footer'} 
            />
          </div>
        )}

        {activeTab === 'preview' && (
           <div className="w-full h-full min-h-[800px] bg-white rounded-lg overflow-hidden shadow-2xl">
             <PDFViewer width="100%" height="100%" className="border-none">
               <OperationTechnicalBladeDocument fields={payload} />
             </PDFViewer>
           </div>
        )}

        {activeTab === 'json' && (
          <div className="w-full max-w-4xl flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-slate-400 text-sm font-mono italic">// Raw Component Structure</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all transform active:scale-95 ${
                  copied 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                    : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copiado!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copiar JSON
                  </>
                )}
              </button>
            </div>
            <div className="w-full bg-slate-950 p-6 rounded-lg text-emerald-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner">
              <pre>{JSON.stringify(payload, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
