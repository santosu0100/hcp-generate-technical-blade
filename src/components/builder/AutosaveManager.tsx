import React from 'react';
import { Trash2, Save } from 'lucide-react';

interface AutosaveManagerProps {
  lastSaved: Date | null;
  onClear: () => void;
}

export function AutosaveManager({ lastSaved, onClear }: AutosaveManagerProps) {
  if (!lastSaved) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-300">
      <div className="flex items-center gap-2">
        <Save size={14} className="animate-pulse" />
        <span>Autosave ativo: {lastSaved.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="w-px h-4 bg-blue-500/20" />
      <button
        onClick={onClear}
        className="flex items-center gap-1 hover:text-red-400 transition-colors bg-white/5 px-2 py-1 rounded hover:bg-white/10 border border-white/10"
        title="Limpar salvamento automático"
      >
        <Trash2 size={12} />
        <span>Limpar</span>
      </button>
    </div>
  );
}
