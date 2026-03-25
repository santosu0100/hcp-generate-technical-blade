import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ClipboardPaste, Import } from 'lucide-react';

interface Props {
  onClose: () => void;
  onImport: (json: any) => void;
}

export function PasteJsonModal({ onClose, onImport }: Props) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    if (!text.trim()) return;
    try {
      const data = JSON.parse(text);
      if (!data.originator || !Array.isArray(data.components)) {
         throw new Error('Formato de JSON inválido. Deve conter "originator" e "components".');
      }
      onImport(data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'JSON inválido');
    }
  };

  return createPortal(
    <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-xl flex flex-col overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-200" 
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-slate-800/50">
           <div className="flex items-center gap-2">
             <ClipboardPaste className="text-blue-400" size={18} />
             <h4 className="text-lg font-semibold text-slate-100 m-0">Importar Payload via Texto</h4>
           </div>
           <button className="text-slate-400 hover:text-white transition-colors" onClick={onClose}>
             <X size={20} />
           </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <p className="text-sm text-slate-400">
            Cole abaixo o conteúdo JSON exportado anteriormente para restaurar o estado completo do construtor.
          </p>
          
          <textarea 
            className="w-full h-[300px] bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-sm text-emerald-400 outline-none focus:border-blue-500/50 transition-colors resize-none shadow-inner"
            placeholder='{ "originator": "hurst", "components": [...] }'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            autoFocus
          />

          {error && (
            <div className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 p-3 rounded-md flex items-center gap-2">
              <span className="font-bold">Erro:</span> {error}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-2">
            <button 
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button 
              className={`flex items-center gap-2 px-6 py-2 bg-blue-600 rounded-md text-sm font-semibold text-white transition-all shadow-lg active:scale-95 ${
                !text.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'
              }`}
              onClick={handleImport}
              disabled={!text.trim()}
            >
              <Import size={16} />
              Importar JSON
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
