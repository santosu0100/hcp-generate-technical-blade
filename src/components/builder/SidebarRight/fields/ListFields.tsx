import React from 'react';
import { List } from 'lucide-react';
import { PropertySection } from '../PropertyBase';
import { ListItemEditor } from '../ListItemEditor';

interface ListFieldsProps {
  type: string;
  data: any;
  onUpdateData: (data: any) => void;
}

export function ListFields({ type, data, onUpdateData }: ListFieldsProps) {
  const title = type === 'ordered-list' ? 'Lista Ordenada' : 'Lista';
  
  return (
    <PropertySection title={title} icon={<List size={14}/>}>
      <ListItemEditor 
        items={data.items || []} 
        onUpdate={(items) => onUpdateData({ items })}
        title="Itens da Lista"
        fields={[{ name: 'content', label: 'Conteúdo', type: 'textarea' }]}
      />
    </PropertySection>
  );
}
