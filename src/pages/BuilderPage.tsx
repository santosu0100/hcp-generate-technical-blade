import React, { useRef, useState } from 'react';
import { usePdfBuilder } from '../context/PdfBuilderContext';
import { Download, FileJson, Upload, Plus } from 'lucide-react';
import { SidebarLeft } from '@/components/builder/SidebarLeft/SidebarLeft';
import { Canvas } from '@/components/builder/Canvas/Canvas';
import { SidebarRight } from '@/components/builder/SidebarRight/SidebarRight';
import { AutosaveManager } from '@/components/builder/AutosaveManager';
import { useAutosave } from '@/hooks/useAutosave';
import { pdf } from '@react-pdf/renderer';
import { OperationTechnicalBladeDocument } from '../components/pdf/render/OperationTechnicalBladeDocument';
import { PasteJsonModal } from '../components/builder/PasteJsonModal';

export function BuilderPage() {
  const { getPayload, loadPayload } = usePdfBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { lastSaved, clearAutosave } = useAutosave();
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);

  const handleExportJson = () => {
    const payload = getPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdf-payload.json';
    a.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        loadPayload(data);
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };
  
  const handlePasteJson = (data: any) => {
    loadPayload(data);
  };

  const handleDownloadPdf = async () => {
    const payload = getPayload();
    const blob = await pdf(<OperationTechnicalBladeDocument fields={payload} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'operation-blade.pdf';
    a.click();
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-900 text-slate-100">
      <header className="h-[60px] bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="font-semibold text-lg text-slate-100 flex items-center gap-4">
          <span>Hurst PDF Builder</span>
          <AutosaveManager lastSaved={lastSaved} onClear={clearAutosave} />
        </div>
        <div className="flex gap-3">
          <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImportJson} />
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16}/> Importar JSON
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
            onClick={handleExportJson}
          >
            <FileJson size={16}/> Exportar
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-sm font-medium hover:bg-white/10 transition-colors"
            onClick={() => setIsPasteModalOpen(true)}
          >
            <Plus size={16}/> Colar JSON
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 border border-blue-500 rounded-md text-sm font-medium text-white hover:bg-blue-600 transition-colors"
            onClick={handleDownloadPdf}
          >
            <Download size={16}/> Download PDF
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-[260px] bg-slate-900/60 backdrop-blur-md border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3 font-bold text-xs text-slate-300 uppercase tracking-widest border-b border-white/10 bg-black/20 shrink-0">
            COMPONENTES
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            <SidebarLeft />
          </div>
        </aside>

        <section className="flex-1 flex flex-col relative bg-black/20 overflow-hidden">
          <Canvas />
        </section>

        <aside className="w-[300px] bg-slate-900/60 backdrop-blur-md border-l border-white/10 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3 font-semibold text-xs text-slate-400 uppercase tracking-wider border-b border-white/10 bg-black/20 shrink-0">
            Propriedades
          </div>
          <div className="flex-1 overflow-y-auto p-4 min-h-0">
            <SidebarRight />
          </div>
        </aside>
      </main>

      {isPasteModalOpen && (
        <PasteJsonModal 
          onClose={() => setIsPasteModalOpen(false)} 
          onImport={handlePasteJson} 
        />
      )}
    </div>
  );
}
