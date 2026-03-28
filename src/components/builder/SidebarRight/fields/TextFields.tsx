import React from 'react';
import { FileText } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface TextFieldsProps {
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
}

export function TextFields({ data, config, onUpdateData, onUpdateConfig }: TextFieldsProps) {
  return (
    <PropertySection title="Conteúdo" icon={<FileText size={14}/>}>
      <PropertyField 
        label="Texto" 
        value={data.content} 
        onChange={(val: string) => onUpdateData({ content: val })} 
        type="textarea" 
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <PropertyField 
          label="Fonte" 
          value={config.fontSize} 
          onChange={(val: number) => onUpdateConfig({ fontSize: val })} 
          type="number" 
          placeholder="10" 
        />
        <PropertyField 
          label="Cor" 
          value={config.color} 
          onChange={(val: string) => onUpdateConfig({ color: val })} 
          type="color" 
        />
      </div>
      <div className="mt-2">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Peso da Fonte
        </label>
        <div className="flex gap-2">
          <button 
            onClick={() => onUpdateConfig({ fontWeight: 'normal' })}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
              config.fontWeight !== 'bold' 
                ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                : 'bg-white/10 border-white/5 text-slate-500'
            }`}
          >
            NORMAL
          </button>
          <button 
            onClick={() => onUpdateConfig({ fontWeight: 'bold' })}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
              config.fontWeight === 'bold' 
                ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                : 'bg-white/10 border-white/5 text-slate-500'
            }`}
          >
            NEGRITO
          </button>
        </div>
      </div>
    </PropertySection>
  );
}
