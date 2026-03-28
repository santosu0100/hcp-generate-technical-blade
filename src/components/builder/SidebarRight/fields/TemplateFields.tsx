import React from 'react';
import { Edit3 } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface TemplateFieldsProps {
  dto: any;
  onUpdateDtoRoot: (changes: any) => void;
}

/**
 * Technical Blade Template identification fields.
 * Extracted for better codebase modularity.
 */
export function TemplateFields({ dto, onUpdateDtoRoot }: TemplateFieldsProps) {
  return (
    <PropertySection title="Configurações de Template" icon={<Edit3 size={14}/>}>
      <PropertyField 
        label="Chave Customizada (Template)" 
        value={dto.internal_templateKey || ''} 
        onChange={(val: string | number) => onUpdateDtoRoot({ internal_templateKey: val })} 
        placeholder="Ex: NOME_DO_CAMPO"
      />
      <p className="text-[10px] text-slate-500 italic mt-1 px-1">
        Define uma identificação personalizada (key) para este componente no JSON Template.
      </p>
    </PropertySection>
  );
}
