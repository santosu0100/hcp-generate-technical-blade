
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  labelClass?: string;
}

export function ColorInput({ label, value, onChange, className = "", labelClass = "" }: ColorInputProps) {
  // Ensure we have a valid hex or fallback
  const safeValue = value || '#000000';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-2 items-center">
        <div className="relative w-10 h-10 shrink-0 group">
          <input 
            type="color" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            value={safeValue}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
          />
          <div 
            className="w-full h-full rounded-md border border-white/20 shadow-inner transition-transform group-hover:scale-105"
            style={{ backgroundColor: safeValue }}
          />
        </div>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">#</span>
          <input 
            type="text" 
            className="w-full bg-black/20 border border-white/10 text-slate-100 pl-6 pr-3 py-2 rounded text-sm outline-none transition-colors focus:border-blue-500 font-mono"
            value={safeValue.replace('#', '')}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 6) {
                onChange(`#${val.toUpperCase()}`);
              }
            }}
            placeholder="000000"
          />
        </div>
      </div>
    </div>
  );
}
