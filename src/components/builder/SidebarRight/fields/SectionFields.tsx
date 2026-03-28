import React from 'react';
import { Columns, Maximize2 } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface SectionFieldsProps {
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
}

export function SectionFields({ data, config, onUpdateData, onUpdateConfig }: SectionFieldsProps) {
  return (
    <>
      <PropertySection title="Conteúdo da Seção" icon={<Columns size={14}/>}>
        <PropertyField 
          label="Título da Seção" 
          value={data.title} 
          onChange={(val: string) => onUpdateData({ title: val })} 
        />
        <PropertyField 
          label="Cor do Título" 
          value={config.titleColor} 
          onChange={(val: string) => onUpdateConfig({ titleColor: val })} 
          type="color" 
        />
      </PropertySection>

      <PropertySection title="Layout da Grade" icon={<Maximize2 size={14}/>}>
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
    </>
  );
}
