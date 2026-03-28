import React from 'react';
import { Settings, Edit3 } from 'lucide-react';
import { PropertySection, PropertyField } from '../PropertyBase';

interface TableConfigFieldsProps {
  config: any;
  onUpdateConfig: (cfg: any) => void;
  onOpenTableEditor: () => void;
}

export function TableConfigFields({ config, onUpdateConfig, onOpenTableEditor }: TableConfigFieldsProps) {
  return (
    <>
      <PropertySection title="Configurações da Tabela" icon={<Settings size={14}/>}>
        <div className="space-y-4">
          <PropertyField 
            label="Variante Visual" 
            value={config.variant} 
            onChange={(val: string) => onUpdateConfig({ variant: val })} 
            placeholder="default | light | dark" 
          />
        </div>
      </PropertySection>
      
      <div className="mb-4 px-2">
        <button 
          onClick={onOpenTableEditor}
          className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
        >
          <Edit3 size={18} /> 📊 Abrir Editor de Tabela
        </button>
      </div>
    </>
  );
}
