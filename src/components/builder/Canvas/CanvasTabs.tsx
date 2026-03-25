import React from 'react';

interface CanvasTabsProps {
  activeTab: 'builder' | 'preview' | 'json';
  onTabChange: (tab: 'builder' | 'preview' | 'json') => void;
}

export function CanvasTabs({ activeTab, onTabChange }: CanvasTabsProps) {
  return (
    <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 bg-black/20 shrink-0">
      <button 
        className={`relative text-sm font-medium px-3 py-2 transition-colors ${activeTab === 'builder' ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`} 
        onClick={() => onTabChange('builder')}
      >
        Builder Visual
        {activeTab === 'builder' && <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-blue-500" />}
      </button>
      <button 
        className={`relative text-sm font-medium px-3 py-2 transition-colors ${activeTab === 'preview' ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`} 
        onClick={() => onTabChange('preview')}
      >
        PDF Preview
        {activeTab === 'preview' && <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-blue-500" />}
      </button>
      <button 
        className={`relative text-sm font-medium px-3 py-2 transition-colors ${activeTab === 'json' ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200'}`} 
        onClick={() => onTabChange('json')}
      >
        JSON Payload
        {activeTab === 'json' && <div className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-blue-500" />}
      </button>
    </div>
  );
}
