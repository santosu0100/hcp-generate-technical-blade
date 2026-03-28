import React, { useState, useMemo } from 'react';
import { usePdfBuilder } from '@/context/PdfBuilderContext';
import { generateTemplate } from '@/utils/templateUtils';

export function JsonTemplateViewer() {
  const { rootComponents, originator } = usePdfBuilder();
  const [copied, setCopied] = useState(false);

  const template = useMemo(() => {
    return generateTemplate(rootComponents, originator);
  }, [rootComponents, originator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(template, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!template) return null;

  return (
    <div className="w-full max-w-4xl flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-slate-400 text-sm font-mono italic">// JSON Technical Blade Template</span>
          <span className="text-slate-500 text-xs italic">Valores reais substituídos por chaves {'{{componentId.path}}'}</span>
        </div>
        <button 
          onClick={copyToClipboard}
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
              Copiar Template
            </>
          )}
        </button>
      </div>
      <div className="w-full bg-slate-950 p-6 rounded-lg text-blue-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner group">
        <pre className="group-hover:text-blue-300 transition-colors">
          {JSON.stringify(template, null, 2)}
        </pre>
      </div>
    </div>
  );
}
