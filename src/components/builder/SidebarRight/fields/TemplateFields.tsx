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
  const hasItems = !!dto.data?.items || !!dto.data?.columns; // Tabelas também têm itens

  // Inicializar isTemplateModel como true se houver itens e ainda não estiver definido
  // Exceto para tabelas, onde o usuário geralmente quer as células povoadas por padrão.
  React.useEffect(() => {
    const isTable = dto.type === 'table';
    if (hasItems && !isTable && dto.internal_isTemplateModel === undefined) {
      onUpdateDtoRoot({ internal_isTemplateModel: true });
    }
  }, [hasItems, dto.type, dto.internal_isTemplateModel, onUpdateDtoRoot]);

  return (
    <PropertySection title="Configurações de Template" icon={<Edit3 size={14}/>}>
      <div className="space-y-4">
        <PropertyField 
          label="Origin Data Key (Chave)" 
          value={dto.internal_originDataKey || ''} 
          onChange={(val: string | number) => onUpdateDtoRoot({ internal_originDataKey: val })} 
          placeholder="Ex: NOME_DO_CAMPO"
        />
        
        {hasItems && dto.type !== 'table' && (
          <div className="flex items-center gap-2 px-1">
            <input 
              type="checkbox" 
              id="isTemplateModel"
              checked={dto.internal_isTemplateModel ?? false}
              onChange={(e) => onUpdateDtoRoot({ internal_isTemplateModel: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-white/10 bg-white/5 accent-blue-500"
            />
            <label htmlFor="isTemplateModel" className="text-[11px] text-slate-300 font-medium cursor-pointer">
              Usar items como modelo? (itemModel)
            </label>
          </div>
        )}

        <div className="flex items-center gap-2 px-1">
          <input 
            type="checkbox" 
            id="showLiteralValue"
            checked={dto.internal_showLiteralValue ?? false}
            onChange={(e) => onUpdateDtoRoot({ internal_showLiteralValue: e.target.checked })}
            className="w-3.5 h-3.5 rounded border-white/10 bg-white/5 accent-blue-500"
          />
          <label htmlFor="showLiteralValue" className="text-[11px] text-slate-300 font-medium cursor-pointer">
            Manter valores reais (sem {"{{ }}"})?
          </label>
        </div>

        {/* Mapeamento de Atributos do Item (Apenas para modelos) */}
        {hasItems && dto.internal_isTemplateModel && dto.type !== 'table' && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Mapeamento de Atributos (itemModel)
            </label>
            
            <div className="space-y-2">
              {(['bullet-list'].includes(dto.type)) && (
                <>
                  <PropertyField 
                    label="Remap: Label" 
                    value={dto.internal_itemRemap?.label} 
                    onChange={(val) => onUpdateDtoRoot({ 
                      internal_itemRemap: { ...(dto.internal_itemRemap || {}), label: val } 
                    })} 
                    placeholder="ex: nome_campo"
                  />
                  <PropertyField 
                    label="Remap: Value" 
                    value={dto.internal_itemRemap?.value} 
                    onChange={(val) => onUpdateDtoRoot({ 
                      internal_itemRemap: { ...(dto.internal_itemRemap || {}), value: val } 
                    })} 
                    placeholder="ex: valor_campo"
                  />
                </>
              )}
              {(['ordered-list', 'arrow-list', 'marker-list', 'ordered-description'].includes(dto.type)) && (
                <>
                  <PropertyField 
                    label="Remap: Title" 
                    value={dto.internal_itemRemap?.title} 
                    onChange={(val) => onUpdateDtoRoot({ 
                      internal_itemRemap: { ...(dto.internal_itemRemap || {}), title: val } 
                    })} 
                    placeholder="ex: titulo_campo"
                  />
                  <PropertyField 
                    label="Remap: Description" 
                    value={dto.internal_itemRemap?.description} 
                    onChange={(val) => onUpdateDtoRoot({ 
                      internal_itemRemap: { ...(dto.internal_itemRemap || {}), description: val } 
                    })} 
                    placeholder="ex: desc_campo"
                  />
                </>
              )}
              {dto.type === 'title-description' && (
                <>
                   <PropertyField 
                    label="Remap: Item Label" 
                    value={dto.internal_itemRemap?.label} 
                    onChange={(val) => onUpdateDtoRoot({ 
                      internal_itemRemap: { ...(dto.internal_itemRemap || {}), label: val } 
                    })} 
                    placeholder="ex: item_label"
                  />
                  <PropertyField 
                    label="Remap: Item Value" 
                    value={dto.internal_itemRemap?.value} 
                    onChange={(val) => onUpdateDtoRoot({ 
                      internal_itemRemap: { ...(dto.internal_itemRemap || {}), value: val } 
                    })} 
                    placeholder="ex: item_value"
                  />
                </>
              )}
            </div>
          </div>
        )}

        <p className="text-[10px] text-slate-500 italic mt-2 px-1 leading-relaxed">
          Define como este componente se comportará na geração do JSON Template.
        </p>
      </div>
    </PropertySection>
  );
}
