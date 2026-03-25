import React from 'react';
import { Columns, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { PropertySection, PropertyField } from './PropertyBase';

interface LayoutSettingsProps {
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
  align?: string;
  textAlign?: string;
  onUpdateConfig: (config: any) => void;
  showGrid?: boolean;
  showAlignment?: boolean;
}

export function LayoutSettings({ 
  layout, itemsPerRow, gapX, gapY, align, textAlign, onUpdateConfig, 
  showGrid = true, showAlignment = true 
}: LayoutSettingsProps) {
  return (
    <>
      {showGrid && (
        <PropertySection title="Grade / Layout" icon={<Columns size={14}/>}>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Direção</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => onUpdateConfig({ layout: 'column' })}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${layout !== 'row' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                >
                  COLUNA
                </button>
                <button 
                  onClick={() => onUpdateConfig({ layout: 'row' })}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${layout === 'row' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                >
                  LINHA
                </button>
              </div>
            </div>
            
            {layout === 'row' && (
              <PropertyField label="Itens por Linha" value={itemsPerRow} onChange={(val) => onUpdateConfig({ itemsPerRow: val })} type="number" />
            )}
            
            <div className="flex gap-4">
              <div className="flex-1">
                <PropertyField label="Gap X" value={gapX} onChange={(val) => onUpdateConfig({ gapX: val })} type="number" />
              </div>
              <div className="flex-1">
                <PropertyField label="Gap Y" value={gapY} onChange={(val) => onUpdateConfig({ gapY: val })} type="number" />
              </div>
            </div>
          </div>
        </PropertySection>
      )}

      {showAlignment && (
        <PropertySection title="Alinhamento" icon={<AlignLeft size={14}/>}>
          <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/5">
            {[
              { val: 'left', icon: <AlignLeft size={16}/> },
              { val: 'center', icon: <AlignCenter size={16}/> },
              { val: 'right', icon: <AlignRight size={16}/> },
              { val: 'justify', icon: <AlignJustify size={16}/> }
            ].map(a => (
              <button 
                key={a.val}
                onClick={() => onUpdateConfig({ align: a.val, textAlign: a.val })}
                className={`flex-1 flex items-center justify-center py-2 rounded-md transition-all ${(align === a.val || textAlign === a.val) ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
              >
                {a.icon}
              </button>
            ))}
          </div>
        </PropertySection>
      )}
    </>
  );
}
