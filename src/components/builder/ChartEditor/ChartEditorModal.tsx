import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, BarChart3, Database, Palette, Maximize2, Minimize2, Check } from 'lucide-react';
import { usePdfBuilder } from '@/context/PdfBuilderContext';
import { ChartDataSettings } from './ChartDataSettings';
import { ChartStyleSettings } from './ChartStyleSettings';
import { ChartPreview } from './ChartPreview';
import { ChartData, ChartConfig } from '@/types/components.dto';

interface ChartEditorModalProps {
  componentId: string;
  onClose: () => void;
}

export function ChartEditorModal({ componentId, onClose }: ChartEditorModalProps) {
  const { rootComponents, updateComponent } = usePdfBuilder();
  const [activeTab, setActiveTab] = useState<'data' | 'style'>('data');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Find component to get current data and config
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
  if (!component) return null;

  const data: ChartData = component.dto.data || { labels: [], datasets: [] };
  const config: ChartConfig = component.dto.config || { type: 'bar', options: {} };

  const handleUpdateData = (newData: ChartData) => {
    updateComponent(componentId, { data: newData });
  };

  const handleUpdateConfig = (newConfig: ChartConfig) => {
    updateComponent(componentId, { config: newConfig });
  };

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        className={`bg-slate-900 border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ease-out z-20 ${
          isFullscreen ? 'fixed inset-0 rounded-0' : 'relative w-full max-w-6xl h-[85vh] rounded-3xl scale-in-center'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Editor de Gráfico</h2>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest mt-0.5">Configuração Visual e Dados</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-inner active:scale-95 group"
              title="Salvar e fechar"
            >
              <Check size={20} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Panel: Settings */}
          <aside className="w-[450px] border-r border-white/5 flex flex-col bg-slate-900/30 shrink-0">
            {/* Tabs Selector */}
            <div className="p-6 flex gap-2">
              <button 
                onClick={() => setActiveTab('data')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeTab === 'data' 
                    ? 'bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                <Database size={14} /> Dados
              </button>
              <button 
                onClick={() => setActiveTab('style')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border ${
                  activeTab === 'style' 
                    ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' 
                    : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                <Palette size={14} /> Estilo
              </button>
            </div>

            {/* Scrollable Settings Area */}
            <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
              {activeTab === 'data' ? (
                <ChartDataSettings 
                  data={data} 
                  onUpdate={handleUpdateData} 
                />
              ) : (
                <ChartStyleSettings 
                  config={config} 
                  onUpdate={handleUpdateConfig} 
                />
              )}
            </div>
          </aside>

          {/* Right Panel: Live Preview */}
          <main className="flex-1 bg-white p-12 flex flex-col items-center justify-center relative min-w-0">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-slate-50 backdrop-blur-md rounded-full border border-slate-200 shadow-sm z-20">
               <div className="w-2 h-2 rounded-full bg-green-500" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest underline decoration-blue-500/50 underline-offset-4">LIVE PREVIEW</span>
            </div>

            {/* Preview Container Wrapper */}
            <div className="w-full max-w-4xl aspect-4/3 flex items-center justify-center relative translate-y-4">
              <ChartPreview data={data} config={config} />
              
              {/* Decorative elements */}
              <div className="absolute -inset-8 bg-blue-500/5 blur-[80px] rounded-full -z-10" />
              <div className="absolute -inset-8 bg-indigo-500/5 blur-[120px] rounded-full -z-20 translate-x-20" />
            </div>

            {/* Footer info in main area */}
            <div className="mt-auto pt-12 flex gap-12 text-center text-slate-400">
               <div className="space-y-1">
                 <p className="text-[9px] font-bold uppercase tracking-tight">Componente</p>
                 <p className="text-xs text-slate-600 font-medium">Gráfico Dinâmico</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[9px] font-bold uppercase tracking-tight">Resolução</p>
                 <p className="text-xs text-slate-600 font-medium">{config.width || 400}x{config.height || 300}px</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[9px] font-bold uppercase tracking-tight">Status</p>
                 <p className="text-xs text-slate-600 font-medium">Sincronizado</p>
               </div>
            </div>
          </main>
        </div>
      </div>
    </div>,
    document.body
  );
}
