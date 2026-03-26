import { ComponentType } from '@/types/components.dto';

interface ComponentItemProps {
  type: ComponentType;
  icon: string;
  label: string;
  desc: string;
  disabled: boolean;
  onAdd: (type: ComponentType) => void;
  onPreview: (type: ComponentType) => void;
}

export function ComponentItem({ type, icon, label, desc, disabled, onAdd, onPreview }: ComponentItemProps) {
  return (
    <div 
      className={`group flex items-start gap-3 p-3 border rounded-lg transition-all relative overflow-hidden ${
        disabled 
          ? 'opacity-60 cursor-not-allowed bg-white/2 border-white/5' 
          : 'cursor-grab bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-blue-50/5 shadow-sm'
      }`}
      onClick={() => { if (!disabled) onAdd(type); }}
      draggable={!disabled}
      onDragStart={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData('application/json', JSON.stringify({ type: type, isNew: true }));
        e.dataTransfer.effectAllowed = 'copy';
      }}
    >
      <div className="text-base w-5 text-center mt-0.5">{icon}</div>
      <div className="flex flex-col flex-1">
        <span className="font-semibold text-sm text-slate-100">
          {label}
        </span>
        <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">{desc}</span>
        
        {!disabled && type !== 'page-break' && (
          <button 
            className="mt-2 flex items-center gap-1.5 text-[10px] text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-300 ml-auto" 
            title="Visualizar Componente Real"
            onClick={(e) => { e.stopPropagation(); onPreview(type); }}
          >
            <span className="text-sm">👁️</span>
            Visualizar
          </button>
        )}
      </div>

      {disabled && (
        <div className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full shadow-lg border border-white/20">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5 text-white">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </div>
  );
}
