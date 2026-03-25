import React from 'react';

interface PropertyFieldProps {
  label: string;
  value: string | number | undefined;
  onChange: (val: string | number) => void;
  type?: 'text' | 'number' | 'color' | 'textarea';
}

export function PropertyField({ label, value, onChange, type = 'text' }: PropertyFieldProps) {
  if (type === 'textarea') {
    return (
      <div className="mb-4">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
        <textarea 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-inner resize-none"
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <input 
        type={type}
        value={value || ''} 
        onChange={(e) => {
          const val = type === 'number' ? (parseInt(e.target.value) || 0) : e.target.value;
          onChange(val);
        }}
        className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500 focus:bg-white/10 transition-all shadow-inner"
      />
    </div>
  );
}

interface PropertySectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function PropertySection({ title, icon, children }: PropertySectionProps) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="text-blue-500">{icon}</div>
        <h3 className="text-[11px] font-bold text-slate-100 uppercase tracking-[0.2em]">{title}</h3>
      </div>
      <div className="px-1">{children}</div>
    </div>
  );
}
