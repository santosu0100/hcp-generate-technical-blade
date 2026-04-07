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
  let title = 'Lista';
  let fields: any[] = [{ name: 'content', label: 'Conteúdo', type: 'textarea' }];

  if (type === 'ordered-list') title = 'Lista Ordenada';
  if (type === 'bullet-list') title = 'Lista de Bullets';
  if (type === 'marker-list') title = 'Lista com Marcadores';
  if (type === 'arrow-list') title = 'Lista com Setas';
  if (type === 'ordered-description') title = 'Descrição Ordenada';

  if (type === 'bullet-list') {
    fields = [
      { name: 'label', label: 'Rótulo (Negrito)' },
      { name: 'value', label: 'Valor', type: 'textarea' }
    ];
  } else if (['ordered-list', 'arrow-list', 'marker-list', 'ordered-description'].includes(type)) {
    fields = [
      { name: 'title', label: 'Título' },
      { name: 'description', label: 'Descrição', type: 'textarea' }
    ];
  }
  
  return (
    <PropertySection title={title} icon={<List size={14}/>}>
      <ListItemEditor 
        items={data.items || []} 
        onUpdate={(items) => onUpdateData({ items })}
        title="Itens da Lista"
        fields={fields}
      />
    </PropertySection>
  );
}
