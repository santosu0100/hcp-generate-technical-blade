import React from 'react';
import { FileText } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';
import { ListItemEditor } from '../ListItemEditor';

interface TitleDescriptionFieldsProps {
  data: any;
  onUpdateData: (data: any) => void;
}

export function TitleDescriptionFields({ data, onUpdateData }: TitleDescriptionFieldsProps) {
  return (
    <PropertySection title="Título e Descrição" icon={<FileText size={14}/>}>
      <PropertyField 
        label="Título" 
        value={data.title} 
        onChange={(val: string) => onUpdateData({ title: val })} 
      />
      <PropertyField 
        label="Descrição" 
        value={data.description} 
        onChange={(val: string) => onUpdateData({ description: val })} 
        type="textarea" 
      />
      <div className="mt-4">
        <ListItemEditor 
          items={data.links || []} 
          onUpdate={(links) => onUpdateData({ links })}
          title="Links Relacionados"
          fields={[
            { name: 'label', label: 'Rótulo' },
            { name: 'href', label: 'URL' }
          ]}
        />
      </div>
    </PropertySection>
  );
}
