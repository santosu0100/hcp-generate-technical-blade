import React from 'react';
import { Maximize2 } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface BoxGroupFieldsProps {
  config: any;
  onUpdateConfig: (config: any) => void;
}

export function BoxGroupFields({ config, onUpdateConfig }: BoxGroupFieldsProps) {
  return (
    <PropertySection title="Configurações da Grade" icon={<Maximize2 size={14}/>}>
      <div className="grid grid-cols-2 gap-4">
        <PropertyField 
          label="Colunas" 
          value={config.itemsPerRow} 
          onChange={(val: number) => onUpdateConfig({ itemsPerRow: val })} 
          type="number" 
          placeholder="2" 
        />
        <PropertyField 
          label="Espaçamento X" 
          value={config.gapX} 
          onChange={(val: number) => onUpdateConfig({ gapX: val })} 
          type="number" 
          placeholder="20" 
        />
      </div>
    </PropertySection>
  );
}
