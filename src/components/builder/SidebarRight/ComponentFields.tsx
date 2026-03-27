import { FileText, Settings, List, Edit3, Columns, Maximize2, MoveVertical, Plus, Link as LinkIcon, Trash2 } from 'lucide-react';
import { PropertySection, PropertyField } from './PropertyBase';
import { ComponentType } from '@/types/components.dto';
import { ListItemEditor } from './ListItemEditor';

interface ComponentFieldsProps {
  type: ComponentType;
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
  onOpenTableEditor?: () => void;
  onOpenChartEditor?: () => void;
}

/**
 * Common Margin Fields for all components
 */
function MarginFields({ config, onUpdateConfig }: { config: any, onUpdateConfig: (cfg: any) => void }) {
  return (
    <PropertySection title="Margens & Espaçamento" icon={<MoveVertical size={14}/>}>
      <div className="grid grid-cols-2 gap-4">
        <PropertyField label="Margem Superior" value={config.marginTop} onChange={(val) => onUpdateConfig({ marginTop: val })} type="number" placeholder="0" />
        <PropertyField label="Margem Inferior" value={config.marginBottom} onChange={(val) => onUpdateConfig({ marginBottom: val })} type="number" placeholder="0" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <PropertyField label="Margem Esquerda" value={config.marginLeft} onChange={(val) => onUpdateConfig({ marginLeft: val })} type="number" placeholder="0" />
        <PropertyField label="Margem Direita" value={config.marginRight} onChange={(val) => onUpdateConfig({ marginRight: val })} type="number" placeholder="0" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <PropertyField label="Largura Fixo" value={config.width} onChange={(val) => onUpdateConfig({ width: val })} placeholder="auto" />
        <PropertyField label="Altura Fixa" value={config.height} onChange={(val) => onUpdateConfig({ height: val })} placeholder="auto" />
      </div>
    </PropertySection>
  );
}

export function ComponentFields({ type, data, config, onUpdateData, onUpdateConfig, onOpenTableEditor, onOpenChartEditor }: ComponentFieldsProps) {
  if (type === 'page-break') {
    return (
      <div className="p-4 text-center text-slate-400 text-sm bg-white/5 rounded-xl border border-white/5 font-medium">
        Este componente não possui configurações.
      </div>
    );
  }

  const renderComponentSpecificFields = () => {
    switch (type) {
      case 'text':
        return (
          <PropertySection title="Conteúdo" icon={<FileText size={14}/>}>
            <PropertyField label="Texto" value={data.content} onChange={(val) => onUpdateData({ content: val })} type="textarea" />
            <div className="mt-4 grid grid-cols-2 gap-4">
               <PropertyField label="Fonte" value={config.fontSize} onChange={(val) => onUpdateConfig({ fontSize: val })} type="number" placeholder="10" />
               <PropertyField label="Cor" value={config.color} onChange={(val) => onUpdateConfig({ color: val })} type="color" />
            </div>
            <div className="mt-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Peso da Fonte</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => onUpdateConfig({ fontWeight: 'normal' })}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.fontWeight !== 'bold' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                >
                  NORMAL
                </button>
                <button 
                  onClick={() => onUpdateConfig({ fontWeight: 'bold' })}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.fontWeight === 'bold' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                >
                  NEGRITO
                </button>
              </div>
            </div>
          </PropertySection>
        );

      case 'action-button':
      case 'link':
        return (
          <PropertySection title="Configurações" icon={<LinkIcon size={14}/>}>
            <PropertyField label="Rótulo / Texto" value={data.label} onChange={(val) => onUpdateData({ label: val })} />
            <PropertyField label="Link (URL)" value={data.href} onChange={(val) => onUpdateData({ href: val })} />
            {type === 'action-button' && (
              <div className="pt-2">
                <PropertyField label="Cor de Fundo" value={config.backgroundColor} onChange={(val) => onUpdateConfig({ backgroundColor: val })} type="color" />
              </div>
            )}
            <PropertyField label="Cor do Texto" value={config.color} onChange={(val) => onUpdateConfig({ color: val })} type="color" />
          </PropertySection>
        );

      case 'brand':
        return (
          <PropertySection title="Configurações do Logo" icon={<Settings size={14}/>}>
            <PropertyField label="Originadora (Opcional)" value={config.originator} onChange={(val) => onUpdateConfig({ originator: val })} placeholder="Ex: hurst" />
            <div className="mt-4">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Alinhamento</label>
              <div className="flex gap-2">
                {['left', 'center', 'right'].map((align) => (
                  <button 
                    key={align}
                    onClick={() => onUpdateConfig({ alignment: align })}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.alignment === align ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                  >
                    {align.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </PropertySection>
        );

      case 'section':
        return (
          <PropertySection title="Configurações da Seção" icon={<Settings size={14}/>}>
            <PropertyField label="Título da Seção" value={data.title} onChange={(val) => onUpdateData({ title: val })} />
            <PropertyField label="Cor do Título" value={config.titleColor} onChange={(val) => onUpdateConfig({ titleColor: val })} type="color" />
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                <input type="checkbox" checked={config.equalWidth !== false} onChange={(e) => onUpdateConfig({ equalWidth: e.target.checked })} className="rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500/50" />
                Filhos com mesma largura (Row)
              </label>
            </div>
          </PropertySection>
        );

      case 'title-description':
        return (
          <PropertySection title="Conteúdo" icon={<FileText size={14}/>}>
            <PropertyField label="Título" value={data.title} onChange={(val) => onUpdateData({ title: val })} />
            <PropertyField label="Descrição" value={data.description} onChange={(val) => onUpdateData({ description: val })} type="textarea" />
            
            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
              <ListItemEditor 
                title="Lista de Tópicos (Key-Value)"
                items={data.items || []}
                onUpdate={(items) => onUpdateData({ ...data, items })}
                fields={[
                  { name: 'label', label: 'Rótulo', placeholder: 'Ex: Taxa' },
                  { name: 'value', label: 'Valor', placeholder: 'Ex: 10%' }
                ]}
                addButtonLabel="Novo Item"
              />
              <ListItemEditor 
                title="Links Relacionados"
                items={data.links || []}
                onUpdate={(links) => onUpdateData({ ...data, links })}
                fields={[
                  { name: 'label', label: 'Texto do Link', placeholder: 'Ver detalhes...' },
                  { name: 'href', label: 'URL / Link', placeholder: 'https://...' }
                ]}
                addButtonLabel="Novo Link"
              />
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <PropertyField label="Fonte Título" value={config.titleFontSize} onChange={(val) => onUpdateConfig({ titleFontSize: val })} type="number" placeholder="18" />
                <PropertyField label="Fonte Desc." value={config.descriptionFontSize} onChange={(val) => onUpdateConfig({ descriptionFontSize: val })} type="number" placeholder="11" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <PropertyField label="Cor Título" value={config.titleColor} onChange={(val) => onUpdateConfig({ titleColor: val })} type="color" />
                <PropertyField label="Cor Desc." value={config.descriptionColor} onChange={(val) => onUpdateConfig({ descriptionColor: val })} type="color" />
              </div>
              
              <div className="pt-2 grid grid-cols-2 gap-4">
                <PropertyField label="Espaç. Texto (Gap)" value={config.gap} onChange={(val) => onUpdateConfig({ gap: val })} type="number" placeholder="4" />
                <PropertyField label="Espaç. Lista" value={config.markerGap} onChange={(val) => onUpdateConfig({ markerGap: val })} type="number" placeholder="8" />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <PropertyField label="Fonte Tópicos" value={config.bulletFontSize} onChange={(val) => onUpdateConfig({ bulletFontSize: val })} type="number" placeholder="10" />
                <PropertyField label="Cor Link" value={config.linkColor} onChange={(val) => onUpdateConfig({ linkColor: val })} type="color" />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                 <PropertyField label="Cor Bullet" value={config.bulletColor} onChange={(val) => onUpdateConfig({ bulletColor: val })} type="color" />
                 <PropertyField label="Cor Rótulo (Lista)" value={config.labelColor} onChange={(val) => onUpdateConfig({ labelColor: val })} type="color" />
              </div>
              <PropertyField label="Cor Valor (Lista)" value={config.valueColor} onChange={(val) => onUpdateConfig({ valueColor: val })} type="color" />
            </div>
          </PropertySection>
        );

      case 'big-int':
        return (
          <PropertySection title="Configurações" icon={<List size={14}/>}>
            <div className="space-y-4">
              <PropertyField label="Valor" value={data.value} onChange={(val) => onUpdateData({ value: val })} />
              <PropertyField label="Rótulo" value={data.label} onChange={(val) => onUpdateData({ label: val })} />
              <PropertyField label="Tamanho da Fonte" value={config.fontSize} onChange={(val) => onUpdateConfig({ fontSize: val })} type="number" />
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Posição do Rótulo</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onUpdateConfig({ labelPosition: 'before' })}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.labelPosition === 'before' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                  >
                    ANTES
                  </button>
                  <button 
                    onClick={() => onUpdateConfig({ labelPosition: 'after' })}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.labelPosition !== 'before' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                  >
                    DEPOIS
                  </button>
                </div>
              </div>
            </div>
          </PropertySection>
        );

      case 'label-value':
        return (
          <PropertySection title="Conteúdo" icon={<List size={14}/>}>
            <PropertyField label="Rótulo" value={data.label} onChange={(val) => onUpdateData({ label: val })} />
            <PropertyField label="Valor" value={data.value} onChange={(val) => onUpdateData({ value: val })} />
            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <PropertyField label="Fonte" value={config.fontSize} onChange={(val) => onUpdateConfig({ fontSize: val })} type="number" placeholder="10" />
                <PropertyField label="Cor Texto" value={config.color} onChange={(val) => onUpdateConfig({ color: val })} type="color" />
              </div>
              <PropertyField label="Cor Rótulo" value={config.labelColor} onChange={(val) => onUpdateConfig({ labelColor: val })} type="color" />
              <PropertyField label="Cor Valor" value={config.valueColor} onChange={(val) => onUpdateConfig({ valueColor: val })} type="color" />
            </div>
          </PropertySection>
        );

      case 'bullet-list':
      case 'ordered-list':
      case 'marker-list':
      case 'arrow-list':
        return (
          <PropertySection title="Configurações da Lista" icon={<List size={14}/>}>
            <div className="space-y-6">
              <ListItemEditor 
                title="Itens da Lista"
                items={data.items || []}
                onUpdate={(items) => onUpdateData({ items })}
                fields={
                  type === 'bullet-list' 
                    ? [{ name: 'label', label: 'Rótulo' }, { name: 'value', label: 'Valor' }]
                    : type === 'marker-list'
                      ? [{ name: 'title', label: 'Título' }, { name: 'description', label: 'Descrição', type: 'textarea' }, { name: 'icon', label: 'Ícone (Opcional)' }]
                      : [{ name: 'title', label: 'Título' }, { name: 'description', label: 'Descrição', type: 'textarea' }]
                }
                addButtonLabel="Novo Item"
              />

              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-x-4 gap-y-2">
                <PropertyField label="Fonte Título" value={config.titleFontSize} onChange={(val) => onUpdateConfig({ titleFontSize: val })} type="number" placeholder="12" />
                <PropertyField label="Fonte Desc." value={config.descriptionFontSize} onChange={(val) => onUpdateConfig({ descriptionFontSize: val })} type="number" placeholder="10" />
                <PropertyField label="Espaçamento (Gap)" value={config.markerGap} onChange={(val) => onUpdateConfig({ markerGap: val })} type="number" placeholder="8" />
                {(type === 'ordered-list' || type === 'marker-list') && (
                  <PropertyField label="Fonte Marcador" value={config.numberFontSize} onChange={(val) => onUpdateConfig({ numberFontSize: val })} type="number" placeholder="10" />
                )}
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <PropertyField label="Cor Título" value={config.titleColor} onChange={(val) => onUpdateConfig({ titleColor: val })} type="color" />
                <PropertyField label="Cor Desc." value={config.descriptionColor} onChange={(val) => onUpdateConfig({ descriptionColor: val })} type="color" />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                {(type === 'ordered-list' || type === 'marker-list') && (
                  <PropertyField label="Cor Marcador" value={config.numberColor} onChange={(val) => onUpdateConfig({ numberColor: val })} type="color" />
                )}
                {type === 'marker-list' && (
                   <PropertyField label="Cor Linha" value={config.lineColor} onChange={(val) => onUpdateConfig({ lineColor: val })} type="color" />
                )}
              </div>
              
              {type === 'marker-list' && (
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input type="checkbox" checked={config.snakeLines === true} onChange={(e) => onUpdateConfig({ snakeLines: e.target.checked })} className="rounded bg-white/10 border-white/20 text-blue-500 focus:ring-blue-500/50" />
                    Habilitar Linhas Conexas (Snake-Lines)
                  </label>
                </div>
              )}

              {type === 'bullet-list' && (
                <div className="pt-2 grid grid-cols-2 gap-4">
                   <PropertyField label="Cor Valor" value={config.valueColor} onChange={(val) => onUpdateConfig({ valueColor: val })} type="color" />
                   <PropertyField label="Cor Bullet" value={config.bulletColor} onChange={(val) => onUpdateConfig({ bulletColor: val })} type="color" />
                </div>
              )}

              {type === 'bullet-list' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Variante</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                    value={config.variant || 'value-bolder'} 
                    onChange={e => onUpdateConfig({ variant: e.target.value })}
                  >
                    <option value="value-bolder" className="bg-slate-800">Valor em Negrito</option>
                    <option value="label-bolder" className="bg-slate-800">Rótulo em Negrito</option>
                  </select>
                </div>
              )}
            </div>
          </PropertySection>
        );

      case 'ordered-description':
        return (
          <PropertySection title="Lista de Itens" icon={<List size={14}/>}>
            <div className="space-y-6">
              <ListItemEditor 
                title="Itens"
                items={data.items || []}
                onUpdate={(items) => onUpdateData({ items })}
                fields={[
                  { name: 'title', label: 'Título' },
                  { name: 'description', label: 'Descrição', type: 'textarea' }
                ]}
                addButtonLabel="Novo Item"
              />
              
              <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-x-4 gap-y-2">
                <PropertyField label="Fonte Título" value={config.titleFontSize} onChange={(val) => onUpdateConfig({ titleFontSize: val })} type="number" placeholder="12" />
                <PropertyField label="Fonte Desc." value={config.descriptionFontSize} onChange={(val) => onUpdateConfig({ descriptionFontSize: val })} type="number" placeholder="10" />
                <PropertyField label="Fonte Número" value={config.numberFontSize} onChange={(val) => onUpdateConfig({ numberFontSize: val })} type="number" placeholder="10" />
                <PropertyField label="Vão Marcador" value={config.markerGap} onChange={(val) => onUpdateConfig({ markerGap: val })} type="number" placeholder="12" />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <PropertyField label="Cor Marcador" value={config.numberColor} onChange={(val) => onUpdateConfig({ numberColor: val })} type="color" />
                <PropertyField label="Fundo Marc." value={config.circleColor} onChange={(val) => onUpdateConfig({ circleColor: val })} type="color" />
                <PropertyField label="Cor Título" value={config.titleColor} onChange={(val) => onUpdateConfig({ titleColor: val })} type="color" />
                <PropertyField label="Cor Desc." value={config.descriptionColor} onChange={(val) => onUpdateConfig({ descriptionColor: val })} type="color" />
              </div>
              <PropertyField label="Cor da Linha" value={config.lineColor} onChange={(val) => onUpdateConfig({ lineColor: val })} type="color" />
            </div>
          </PropertySection>
        );

      case 'table':
        return (
          <div className="space-y-6">
            <PropertySection title="Configurações Rápidas" icon={<Settings size={14}/>}>
              <div className="space-y-4">
                <PropertyField label="Largura da Tabela" value={config.tableWidth} onChange={(val) => onUpdateConfig({ tableWidth: val })} placeholder="100%" />
                <div className="grid grid-cols-2 gap-4">
                   <PropertyField label="Fonte Header" value={config.fontSize} onChange={(val) => onUpdateConfig({ fontSize: val })} type="number" placeholder="10" />
                   <PropertyField label="Fonte Corpo" value={config.rowFontSize} onChange={(val) => onUpdateConfig({ rowFontSize: val })} type="number" placeholder="7" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <PropertyField label="Padding X" value={config.cellPadding} onChange={(val) => onUpdateConfig({ cellPadding: val })} type="number" placeholder="4" />
                   <PropertyField label="Padding Y" value={config.cellPaddingY} onChange={(val) => onUpdateConfig({ cellPaddingY: val })} type="number" placeholder="2" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <PropertyField label="Borda (px)" value={config.borderWidth} onChange={(val) => onUpdateConfig({ borderWidth: val })} type="number" placeholder="1" />
                    <PropertyField label="Raio Borda" value={config.borderRadius} onChange={(val) => onUpdateConfig({ borderRadius: val })} type="number" placeholder="4" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <PropertyField label="Cor Borda" value={config.borderColor} onChange={(val) => onUpdateConfig({ borderColor: val })} type="color" />
                    <PropertyField label="Fundo Header" value={config.headerBackgroundColor} onChange={(val) => onUpdateConfig({ headerBackgroundColor: val })} type="color" />
                 </div>
              </div>
            </PropertySection>

            <div className="mb-8">
              <button 
                onClick={onOpenTableEditor}
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                <Edit3 size={18} /> 🛠️ Abrir Editor de Tabela
              </button>
            </div>
          </div>
        );

      case 'sidebar':
        return (
          <PropertySection title="Layout" icon={<Columns size={14}/>}>
            <div className="space-y-4">
              <PropertyField label="Largura (ex: 200 ou 30%)" value={config.width} onChange={(val) => onUpdateConfig({ width: val })} />
              <div className="flex gap-2">
                <button 
                  onClick={() => onUpdateConfig({ position: 'left' })}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.position !== 'right' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                >
                  ESQUERDA
                </button>
                <button 
                  onClick={() => onUpdateConfig({ position: 'right' })}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.position === 'right' ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                >
                  DIREITA
                </button>
              </div>
            </div>
          </PropertySection>
        );

      case 'chart':
        return (
          <div className="space-y-6">
            <PropertySection title="Configurações Básicas" icon={<Settings size={14}/>}>
              <div className="space-y-4">
                <PropertyField label="Largura (%)" value={config.widthPercent} onChange={(val) => onUpdateConfig({ widthPercent: val })} placeholder="100%" />
                <PropertyField label="Altura Display" value={config.displayHeight} onChange={(val) => onUpdateConfig({ displayHeight: val })} type="number" placeholder="200" />
              </div>
            </PropertySection>

            <div className="mb-8">
              <button 
                onClick={onOpenChartEditor}
                className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
              >
                <Edit3 size={18} /> 📈 Abrir Editor de Gráfico
              </button>
            </div>
          </div>
        );

      case 'image-view':
        return (
          <PropertySection title="Configurações da Imagem" icon={<FileText size={14}/>}>
            <PropertyField label="URL da Imagem (src)" value={data.src} onChange={(val) => onUpdateData({ src: val })} placeholder="https://..." />
            
            <div className="mt-4 pt-4 border-t border-white/5 space-y-4">
              <PropertyField label="Largura" value={config.width} onChange={(val) => onUpdateConfig({ width: val })} placeholder="ex: 100%, 200px" />
              <PropertyField label="Altura" value={config.height} onChange={(val) => onUpdateConfig({ height: val })} placeholder="ex: auto, 150px" />
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Ajuste (Object Fit)</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white text-sm outline-none focus:border-blue-500"
                  value={config.objectFit || 'contain'} 
                  onChange={e => onUpdateConfig({ objectFit: e.target.value })}
                >
                  <option value="contain" className="bg-slate-800">Conter (Contain)</option>
                  <option value="cover" className="bg-slate-800">Preencher (Cover)</option>
                  <option value="fill" className="bg-slate-800">Esticar (Fill)</option>
                  <option value="none" className="bg-slate-800">Nenhum</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Alinhamento</label>
                <div className="flex gap-2">
                  {['left', 'center', 'right'].map((align) => (
                    <button 
                      key={align}
                      onClick={() => onUpdateConfig({ alignment: align })}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${config.alignment === align ? 'bg-blue-500 border-blue-400 text-white shadow-md' : 'bg-white/10 border-white/5 text-slate-500'}`}
                    >
                      {align.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PropertySection>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderComponentSpecificFields()}
      <MarginFields config={config} onUpdateConfig={onUpdateConfig} />
    </div>
  );
}
