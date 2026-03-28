import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface LinkFieldsProps {
  type: string;
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
}

export function LinkFields({ type, data, config, onUpdateData, onUpdateConfig }: LinkFieldsProps) {
  return (
    <PropertySection title="Configurações" icon={<LinkIcon size={14}/>}>
      <PropertyField 
        label="Rótulo / Texto" 
        value={data.label} 
        onChange={(val: string) => onUpdateData({ label: val })} 
      />
      <PropertyField 
        label="Link (URL)" 
        value={data.href} 
        onChange={(val: string) => onUpdateData({ href: val })} 
      />
      
      <div className="mt-4">
        <PropertyField 
          label="Cor" 
          value={config.color} 
          onChange={(val: string) => onUpdateConfig({ color: val })} 
          type="color" 
        />
      </div>
    </PropertySection>
  );
}
