// @ts-nocheck
import React from 'react';
import { usePdfBuilder } from '../../context/PdfBuilderContext';
import { Trash2, Plus } from 'lucide-react';
import { ColorInput } from './ColorInput';

export function SidebarRight() {
  const { components, selectedComponentId, updateComponent, originator, setOriginator } = usePdfBuilder();
  const selected = components.find(c => c.id === selectedComponentId);

  const inputClass = "w-full bg-black/20 border border-white/10 text-slate-100 px-3 py-2 rounded text-sm outline-none transition-colors focus:border-blue-500";
  const labelClass = "text-xs font-medium text-slate-400";
  const groupClass = "flex flex-col gap-1.5 mb-3";

  const dto = selected?.dto;

  const updateData = (key: string, value: any) => {
    updateComponent(selected.id, { data: { ...(dto.data || {}), [key]: value } });
  };
  
  const updateConfig = (key: string, value: any) => {
    updateComponent(selected.id, { config: { ...(dto.config || {}), [key]: value } });
  };

  const updateArrayItem = (arrayKey: string, index: number, field: string, value: any) => {
    const arr = [...(dto.data?.[arrayKey] || [])];
    arr[index] = { ...arr[index], [field]: value };
    updateData(arrayKey, arr);
  };

  const addArrayItem = (arrayKey: string, defaultItem: any) => {
    const arr = [...(dto.data?.[arrayKey] || []), defaultItem];
    updateData(arrayKey, arr);
  };

  const removeArrayItem = (arrayKey: string, index: number) => {
    const arr = [...(dto.data?.[arrayKey] || [])];
    arr.splice(index, 1);
    updateData(arrayKey, arr);
  };

  return (
    <div className="w-full flex flex-col text-slate-200 h-full">
      <div className="flex flex-col gap-4 mb-4 pb-4 border-b border-white/10 shrink-0">
        <h3 className="text-base font-semibold text-slate-100 text-left">Propriedades Globais</h3>
        <div className="flex flex-col gap-2 text-left">
          <label className={labelClass}>Originator:</label>
          <select className={inputClass} value={originator} onChange={e => setOriginator(e.target.value as any)}>
            <option value="hurst">hurst</option>
            <option value="borum">borum</option>
            <option value="ahlex">ahlex</option>
            <option value="artk">artk</option>
            <option value="kateto">kateto</option>
            <option value="muv">muv</option>
          </select>
        </div>
      </div>

      {!selected ? (
        <p className="text-xs opacity-70 mt-4 italic text-center text-slate-400">Selecione um componente no Canvas para editar suas propriedades específicas.</p>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 pb-6 mr-[-8px]">
          <h3 className="text-base font-semibold text-slate-100 mb-4 pb-2 border-b border-white/10">Propriedades - <span className="text-blue-400">{dto.type}</span></h3>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Data</h4>
            
            {['text'].includes(dto.type) && (
               <div className={groupClass}>
                <label className={labelClass}>Content</label>
                <textarea className={inputClass} value={dto.data?.content || ''} onChange={e => updateData('content', e.target.value)} rows={4} />
               </div>
            )}
            
            {['section', 'title-description'].includes(dto.type) && (
               <div className={groupClass}>
                <label className={labelClass}>Title</label>
                <input type="text" className={inputClass} value={dto.data?.title || ''} onChange={e => updateData('title', e.target.value)} />
               </div>
            )}

            {['title-description'].includes(dto.type) && (
               <div className={groupClass}>
                <label className={labelClass}>Description</label>
                <textarea className={inputClass} value={dto.data?.description || ''} onChange={e => updateData('description', e.target.value)} rows={4} />
               </div>
            )}
            
            {dto.type === 'label-value' && (
               <>
                 <div className={groupClass}>
                  <label className={labelClass}>Label</label>
                  <input type="text" className={inputClass} value={dto.data?.label || ''} onChange={e => updateData('label', e.target.value)} />
                 </div>
                 <div className={groupClass}>
                  <label className={labelClass}>Value</label>
                  <input type="text" className={inputClass} value={dto.data?.value || ''} onChange={e => updateData('value', e.target.value)} />
                 </div>
               </>
            )}
            
            {dto.type === 'big-int' && (
               <>
                 <div className={groupClass}>
                  <label className={labelClass}>Value</label>
                  <input type="text" className={inputClass} value={dto.data?.value || ''} onChange={e => updateData('value', e.target.value)} />
                 </div>
                 <div className={groupClass}>
                  <label className={labelClass}>Label</label>
                  <input type="text" className={inputClass} value={dto.data?.label || ''} onChange={e => updateData('label', e.target.value)} />
                 </div>
               </>
            )}

            {['link', 'action-button'].includes(dto.type) && (
               <>
                 <div className={groupClass}>
                  <label className={labelClass}>Label</label>
                  <input type="text" className={inputClass} value={dto.data?.label || ''} onChange={e => updateData('label', e.target.value)} />
                 </div>
                 <div className={groupClass}>
                  <label className={labelClass}>URL (href)</label>
                  <input type="text" className={inputClass} value={dto.data?.href || ''} onChange={e => updateData('href', e.target.value)} />
                 </div>
               </>
            )}

            {/* Nested Links inside Title-Description */}
            {['title-description'].includes(dto.type) && (
              <div className={groupClass}>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Links Extras</label>
                {(dto.data?.links || []).map((link: any, idx: number) => (
                  <div key={idx} className="p-2 bg-white/5 rounded relative mb-2 flex flex-col gap-1 border border-white/5">
                    <input type="text" placeholder="Label" className={inputClass} value={link.label || ''} onChange={(e) => updateArrayItem('links', idx, 'label', e.target.value)} />
                    <input type="text" placeholder="Href" className={inputClass} value={link.href || ''} onChange={(e) => updateArrayItem('links', idx, 'href', e.target.value)} />
                    <button onClick={() => removeArrayItem('links', idx)} className="absolute top-2 right-2 text-red-400 hover:text-red-300 transition-colors"><Trash2 size={12}/></button>
                  </div>
                ))}
                <button 
                  className="w-full bg-white/5 border border-dashed border-white/20 text-slate-300 px-3 py-2 rounded text-xs font-medium hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 mt-1" 
                  onClick={() => addArrayItem('links', { label: '', href: '' })}
                >
                  <Plus size={14}/> Adicionar Link
                </button>
              </div>
            )}

            {/* Arrays for List Components */}
            {['bullet-list', 'arrow-list', 'ordered-list', 'marker-list', 'timeline-ordered-description'].includes(dto.type) && (
              <div className={groupClass}>
                <label className="text-xs font-medium text-slate-400 mb-2 block">Itens da Lista</label>
                {(dto.data?.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white/5 rounded relative mb-3 flex flex-col gap-2 border border-white/5">
                    {dto.type === 'bullet-list' ? (
                      <>
                        <input type="text" placeholder="Label" className={inputClass} value={item.label || ''} onChange={(e) => updateArrayItem('items', idx, 'label', e.target.value)} />
                        <input type="text" placeholder="Value" className={inputClass} value={item.value || ''} onChange={(e) => updateArrayItem('items', idx, 'value', e.target.value)} />
                      </>
                    ) : (
                      <>
                        <input type="text" placeholder="Título" className={inputClass} value={item.title || ''} onChange={(e) => updateArrayItem('items', idx, 'title', e.target.value)} />
                        <textarea placeholder="Descrição" className={inputClass} value={item.description || ''} onChange={(e) => updateArrayItem('items', idx, 'description', e.target.value)} rows={2} />
                      </>
                    )}
                    <button onClick={() => removeArrayItem('items', idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-colors"><Trash2 size={14}/></button>
                  </div>
                ))}
                <button 
                  className="w-full bg-white/5 border border-dashed border-white/20 text-slate-300 px-3 py-2 rounded text-xs font-medium hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center gap-2 mt-1" 
                  onClick={() => addArrayItem('items', dto.type === 'bullet-list' ? { label: '', value: '' } : { title: '', description: '' })}
                >
                  <Plus size={14}/> Adicionar Item
                </button>
              </div>
            )}

          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Configurações de Estilo</h4>
            
            {['text', 'section'].includes(dto.type) && (
              <div className={groupClass}>
                <label className={labelClass}>Align</label>
                <select className={inputClass} value={dto.config?.align || ''} onChange={e => updateConfig('align', e.target.value)}>
                  <option value="">Default</option>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            )}

            {dto.type === 'text' && (
              <>
                <div className={groupClass}>
                  <label className={labelClass}>Font Size</label>
                  <input type="number" className={inputClass} value={dto.config?.fontSize || ''} onChange={e => updateConfig('fontSize', Number(e.target.value) || undefined)} />
                </div>
                <div className={groupClass}>
                  <label className={labelClass}>Font Weight</label>
                  <select className={inputClass} value={dto.config?.fontWeight || ''} onChange={e => updateConfig('fontWeight', e.target.value)}>
                    <option value="">Normal</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
                <ColorInput 
                  label="Color" 
                  value={dto.config?.color || ''} 
                  onChange={val => updateConfig('color', val)} 
                  labelClass={labelClass}
                />
              </>
            )}

            {dto.type === 'brand' && (
              <div className={groupClass}>
                <label className={labelClass}>Alignment</label>
                <select className={inputClass} value={dto.config?.alignment || ''} onChange={e => updateConfig('alignment', e.target.value)}>
                  <option value="">Default</option>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}

            {dto.type === 'big-int' && (
              <div className={groupClass}>
                <label className={labelClass}>Label Position</label>
                <select className={inputClass} value={dto.config?.labelPosition || ''} onChange={e => updateConfig('labelPosition', e.target.value)}>
                  <option value="">Default</option>
                  <option value="before">Before</option>
                  <option value="after">After</option>
                </select>
              </div>
            )}

            {dto.type === 'sidebar' && (
              <div className={groupClass}>
                <label className={labelClass}>Position</label>
                <select className={inputClass} value={dto.config?.position || ''} onChange={e => updateConfig('position', e.target.value)}>
                  <option value="">Default (Left)</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            )}
            
            {dto.type === 'sidebar' && (
              <div className={groupClass}>
                <label className={labelClass}>Width (%)</label>
                <input type="number" className={inputClass} value={dto.config?.width || ''} onChange={e => updateConfig('width', Number(e.target.value) || undefined)} />
              </div>
            )}

            {['label-value', 'bullet-list'].includes(dto.type) && (
              <div className={groupClass}>
                <label className={labelClass}>Variant</label>
                <select className={inputClass} value={dto.config?.variant || ''} onChange={e => updateConfig('variant', e.target.value)}>
                  <option value="">Default</option>
                  <option value="bolder-value">Bolder Value</option>
                  <option value="bolder-label">Bolder Label</option>
                  <option value="bolder-both">Bolder Both</option>
                </select>
              </div>
            )}

            {/* Global Color Options for Many Components */}
            {['title-description', 'timeline-ordered-description', 'arrow-list', 'ordered-list', 'marker-list', 'section'].includes(dto.type) && (
                <ColorInput 
                  label="Title Color" 
                  value={dto.config?.titleColor || ''} 
                  onChange={val => updateConfig('titleColor', val)} 
                  labelClass={labelClass}
                />
            )}
            
            {['title-description', 'timeline-ordered-description', 'arrow-list', 'ordered-list', 'marker-list'].includes(dto.type) && (
                <ColorInput 
                  label="Description Color" 
                  value={dto.config?.descriptionColor || ''} 
                  onChange={val => updateConfig('descriptionColor', val)} 
                  labelClass={labelClass}
                />
            )}

            {['title-description', 'timeline-ordered-description', 'link'].includes(dto.type) && (
                <ColorInput 
                  label="Link Color" 
                  value={dto.config?.linkColor || dto.config?.color || ''} 
                  onChange={val => updateConfig(dto.type === 'link' ? 'color' : 'linkColor', val)} 
                  labelClass={labelClass}
                />
            )}

            {dto.type === 'bullet-list' && (
              <>
                <ColorInput label="Bullet Color" value={dto.config?.bulletColor || ''} onChange={val => updateConfig('bulletColor', val)} labelClass={labelClass} className="mb-2" />
                <ColorInput label="Label Color" value={dto.config?.labelColor || ''} onChange={val => updateConfig('labelColor', val)} labelClass={labelClass} className="mb-2" />
                <ColorInput label="Value Color" value={dto.config?.valueColor || ''} onChange={val => updateConfig('valueColor', val)} labelClass={labelClass} className="mb-2" />
              </>
            )}
            
            {dto.type === 'ordered-list' && (
              <>
                <ColorInput label="Number Color" value={dto.config?.numberColor || ''} onChange={val => updateConfig('numberColor', val)} labelClass={labelClass} className="mb-2" />
                <ColorInput label="Number BG Color" value={dto.config?.numberBackgroundColor || ''} onChange={val => updateConfig('numberBackgroundColor', val)} labelClass={labelClass} className="mb-2" />
              </>
            )}

            {dto.type === 'marker-list' && (
              <>
                <ColorInput label="Marker Color" value={dto.config?.markerColor || ''} onChange={val => updateConfig('markerColor', val)} labelClass={labelClass} className="mb-2" />
                <div className={groupClass}><label className={labelClass}>Marker Size</label><input type="number" className={inputClass} value={dto.config?.markerSize || ''} onChange={e => updateConfig('markerSize', Number(e.target.value) || undefined)} /></div>
              </>
            )}
            
            {dto.type === 'arrow-list' && (
              <ColorInput label="Arrow Color" value={dto.config?.arrowColor || ''} onChange={val => updateConfig('arrowColor', val)} labelClass={labelClass} />
            )}
            
            {dto.type === 'timeline-ordered-description' && (
              <>
                <ColorInput label="Circle Color" value={dto.config?.circleColor || ''} onChange={val => updateConfig('circleColor', val)} labelClass={labelClass} className="mb-2" />
                <ColorInput label="Line Color" value={dto.config?.lineColor || ''} onChange={val => updateConfig('lineColor', val)} labelClass={labelClass} className="mb-2" />
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
