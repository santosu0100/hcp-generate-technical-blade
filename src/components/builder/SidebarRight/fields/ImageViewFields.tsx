import React from 'react';
import { Maximize2 } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface ImageViewFieldsProps {
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
}

export function ImageViewFields({ data, config, onUpdateData, onUpdateConfig }: ImageViewFieldsProps) {
  return (
    <PropertySection title="Configurações da Imagem" icon={<Maximize2 size={14}/>}>
      <PropertyField 
        label="URL da Imagem" 
        value={data.url} 
        onChange={(val: string) => onUpdateData({ url: val })} 
        placeholder="https://exemplo.com/imagem.png" 
      />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <PropertyField 
          label="Largura (%)" 
          value={config.widthPercent} 
          onChange={(val: string) => onUpdateConfig({ widthPercent: val })} 
          placeholder="100%" 
        />
        <PropertyField 
          label="Altura Display" 
          value={config.displayHeight} 
          onChange={(val: number) => onUpdateConfig({ displayHeight: val })} 
          type="number" 
          placeholder="200" 
        />
      </div>
      <div className="mt-4">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
          Posicionamento
        </label>
        <div className="flex gap-2">
          <button 
            onClick={() => onUpdateConfig({ position: 'left' })}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
              config.position !== 'right' 
                ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                : 'bg-white/10 border-white/5 text-slate-500'
            }`}
          >
            ESQUERDA
          </button>
          <button 
            onClick={() => onUpdateConfig({ position: 'right' })}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${
              config.position === 'right' 
                ? 'bg-blue-500 border-blue-400 text-white shadow-md' 
                : 'bg-white/10 border-white/5 text-slate-500'
            }`}
          >
            DIREITA
          </button>
        </div>
      </div>
    </PropertySection>
  );
}
