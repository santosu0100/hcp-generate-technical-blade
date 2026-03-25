import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { OriginatorType } from '@/types/operation-technical-blade.dto';

interface OriginatorSelectorProps {
  value: OriginatorType;
  onChange: (val: OriginatorType) => void;
}

export function OriginatorSelector({ value, onChange }: OriginatorSelectorProps) {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="text-blue-500"><ImageIcon size={14}/></div>
        <h3 className="text-[11px] font-bold text-slate-100 uppercase tracking-[0.2em]">Originadora (Tema)</h3>
      </div>
      <div className="px-1">
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
          value={value} 
          onChange={e => onChange(e.target.value as any)}
        >
          <option value="hurst" className="bg-slate-800">Hurst</option>
          <option value="borum" className="bg-slate-800">Borum</option>
          <option value="ahlex" className="bg-slate-800">Ahlex</option>
          <option value="artk" className="bg-slate-800">ArtK</option>
          <option value="kateto" className="bg-slate-800">Kateto</option>
          <option value="muv" className="bg-slate-800">Muv</option>
        </select>
      </div>
    </div>
  );
}
