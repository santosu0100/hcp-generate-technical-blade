import React from 'react';
import { FileText, Settings, List, Edit3, Columns } from 'lucide-react';
import { PropertySection, PropertyField } from './PropertyBase';
import { ComponentType } from '@/components/pdf/render/types';
import { ListItemEditor } from './ListItemEditor';
import { Plus, Link as LinkIcon, Trash2 } from 'lucide-react';

interface ComponentFieldsProps {
  type: ComponentType;
  data: any;
  config: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
  onOpenTableEditor?: () => void;
}

export function ComponentFields({ type, data, config, onUpdateData, onUpdateConfig, onOpenTableEditor }: ComponentFieldsProps) {
  switch (type) {
    case 'text':
      return (
        <PropertySection title="Conteúdo" icon={<FileText size={14}/>}>
          <PropertyField label="Texto" value={data.content} onChange={(val) => onUpdateData({ content: val })} type="textarea" />
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
        </PropertySection>
      );

    case 'section':
      return (
        <PropertySection title="Configurações do Título" icon={<Settings size={14}/>}>
          <PropertyField label="Título da Seção" value={data.title} onChange={(val) => onUpdateData({ title: val })} />
          <PropertyField label="Cor do Título" value={config.titleColor} onChange={(val) => onUpdateConfig({ titleColor: val })} type="color" />
        </PropertySection>
      );

    case 'title-description':
      return (
        <PropertySection title="Conteúdo" icon={<FileText size={14}/>}>
          <PropertyField label="Título" value={data.title} onChange={(val) => onUpdateData({ title: val })} />
          <PropertyField label="Descrição" value={data.description} onChange={(val) => onUpdateData({ description: val })} />
          
          <div className="mt-4 pt-4 border-t border-white/5">
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

          <div className="mt-4 flex gap-4">
            <div className="flex-1">
              <PropertyField label="Fonte Título" value={config.titleFontSize} onChange={(val) => onUpdateConfig({ titleFontSize: val })} type="number" />
            </div>
            <div className="flex-1">
              <PropertyField label="Fonte Desc." value={config.descriptionFontSize} onChange={(val) => onUpdateConfig({ descriptionFontSize: val })} type="number" />
            </div>
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
                  : [{ name: 'title', label: 'Título' }, { name: 'description', label: 'Descrição', type: 'textarea' }]
              }
              addButtonLabel="Novo Item"
            />

            <div className="pt-4 border-t border-white/5 flex gap-4">
              <div className="flex-1">
                <PropertyField label="Fonte Título" value={config.titleFontSize} onChange={(val) => onUpdateConfig({ titleFontSize: val })} type="number" />
              </div>
              <div className="flex-1">
                <PropertyField label="Fonte Desc." value={config.descriptionFontSize} onChange={(val) => onUpdateConfig({ descriptionFontSize: val })} type="number" />
              </div>
            </div>
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
            {/* Nota: OrderedDescription também suporta links por item no DTO, mas simplificaremos por enquanto */}
            
            <div className="pt-4 border-t border-white/5 flex gap-4">
              <div className="flex-1">
                <PropertyField label="Fonte Título" value={config.titleFontSize} onChange={(val) => onUpdateConfig({ titleFontSize: val })} type="number" />
              </div>
              <div className="flex-1">
                <PropertyField label="Fonte Desc." value={config.descriptionFontSize} onChange={(val) => onUpdateConfig({ descriptionFontSize: val })} type="number" />
              </div>
            </div>
          </div>
        </PropertySection>
      );

    case 'table':
      return (
        <div className="mb-8">
          <button 
            onClick={onOpenTableEditor}
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            <Edit3 size={18} /> 🛠️ Abrir Editor de Tabela
          </button>
          <p className="text-[10px] text-slate-500 mt-2 text-center italic leading-relaxed">
            Utilize o editor em tela cheia para gerenciar colunas, linhas e alinhar dados complexos.
          </p>
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

    default:
      return null;
  }
}
