import React from 'react';
import { Settings } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface BigIntFieldsProps {
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
}

export function BigIntFields({ data, config, onUpdateData, onUpdateConfig }: BigIntFieldsProps) {
  return (
    <PropertySection title="Configurações de Valor" icon={<Settings size={14}/>}>
      <PropertyField 
        label="Valor Principal" 
        value={data.value} 
        onChange={(val: string) => onUpdateData({ value: val })} 
      />
      <PropertyField 
        label="Rótulo (Opcional)" 
        value={data.label} 
        onChange={(val: string) => onUpdateData({ label: val })} 
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <PropertyField 
          label="Tamanho da Fonte" 
          value={config.fontSize} 
          onChange={(val: number) => onUpdateConfig({ fontSize: val })} 
          type="number" 
          placeholder="24" 
        />
      </div>
      <div className="mt-4">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Posição do Rótulo
        </label>
        <div className="flex gap-2">
          <button 
            onClick={() => onUpdateConfig({ labelPosition: 'before' })}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
              config.labelPosition !== 'after' 
                ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                : 'bg-white/10 border-white/5 text-slate-500'
            }`}
          >
            ANTES
          </button>
          <button 
            onClick={() => onUpdateConfig({ labelPosition: 'after' })}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
              config.labelPosition === 'after' 
                ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                : 'bg-white/10 border-white/5 text-slate-500'
            }`}
          >
            DEPOIS
          </button>
        </div>
      </div>
    </PropertySection>
  );
}
