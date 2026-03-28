import React from 'react';
import { Settings } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface LabelValueFieldsProps {
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
}

export function LabelValueFields({ data, config, onUpdateData, onUpdateConfig }: LabelValueFieldsProps) {
  return (
    <PropertySection title="Conteúdo" icon={<Settings size={14}/>}>
      <PropertyField 
        label="Rótulo (Label)" 
        value={data.label} 
        onChange={(val: string) => onUpdateData({ label: val })} 
      />
      <PropertyField 
        label="Valor" 
        value={data.value} 
        onChange={(val: string) => onUpdateData({ value: val })} 
      />
      <div className="mt-4">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Alinhamento do Texto
        </label>
        <div className="flex gap-2">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <button 
              key={align}
              onClick={() => onUpdateConfig({ textAlign: align })}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
                config.textAlign === align 
                  ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                  : 'bg-white/10 border-white/5 text-slate-500'
              }`}
            >
              {align.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </PropertySection>
  );
}
