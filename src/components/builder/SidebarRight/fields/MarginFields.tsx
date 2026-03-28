import React from 'react';
import { MoveVertical } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface MarginFieldsProps {
  config: any;
  onUpdateConfig: (cfg: any) => void;
}

/**
 * Common Margin and Dimension fields for all components.
 * Extracted for better codebase modularity.
 */
export function MarginFields({ config, onUpdateConfig }: MarginFieldsProps) {
  return (
    <PropertySection title="Margens & Espaçamento" icon={<MoveVertical size={14}/>}>
      <div className="grid grid-cols-2 gap-4">
        <PropertyField 
          label="Margem Superior" 
          value={config.marginTop} 
          onChange={(val: string | number) => onUpdateConfig({ marginTop: val })} 
          type="number" 
          placeholder="0" 
        />
        <PropertyField 
          label="Margem Inferior" 
          value={config.marginBottom} 
          onChange={(val: string | number) => onUpdateConfig({ marginBottom: val })} 
          type="number" 
          placeholder="0" 
        />
      </div>
      
      <div className="mt-2 grid grid-cols-2 gap-4">
        <PropertyField 
          label="Margem Esquerda" 
          value={config.marginLeft} 
          onChange={(val: string | number) => onUpdateConfig({ marginLeft: val })} 
          type="number" 
          placeholder="0" 
        />
        <PropertyField 
          label="Margem Direita" 
          value={config.marginRight} 
          onChange={(val: string | number) => onUpdateConfig({ marginRight: val })} 
          type="number" 
          placeholder="0" 
        />
      </div>
      
      <div className="mt-2 grid grid-cols-2 gap-4">
        <PropertyField 
          label="Largura Fixa" 
          value={config.width} 
          onChange={(val: string | number) => onUpdateConfig({ width: val })} 
          placeholder="auto" 
        />
        <PropertyField 
          label="Altura Fixa" 
          value={config.height} 
          onChange={(val: string | number) => onUpdateConfig({ height: val })} 
          placeholder="auto" 
        />
      </div>
    </PropertySection>
  );
}
