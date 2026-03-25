import React, { useState } from 'react';
import { usePdfBuilder } from '../../context/PdfBuilderContext';
import { ComponentType, ComponentCategory } from '../../types/pdf-components.types';
import { ComponentPreviewModal } from './ComponentPreviewModal';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

const COMPONENT_LIST: { type: ComponentType, icon: string, label: string, desc: string, category: ComponentCategory }[] = [
  { type: 'brand', icon: '🎨', label: 'Logo Originadora', desc: 'Logotipo / Assinatura (Topo)', category: ComponentCategory.LAYOUT },
  { type: 'footer', icon: '🦶', label: 'Rodapé', desc: 'Fechamento da página/documento', category: ComponentCategory.LAYOUT },
  { type: 'sidebar', icon: '🗄️', label: 'Barra Lateral', desc: 'Barra lateral de Destaques', category: ComponentCategory.LAYOUT },
  { type: 'page-break', icon: '✂️', label: 'Quebra de Página', desc: 'Força o pulo de página', category: ComponentCategory.LAYOUT },
  
  { type: 'action-button', icon: '🔘', label: 'Botão de Ação', desc: 'Call-to-action clicável', category: ComponentCategory.COMPONENTS },
  { type: 'highlight-card', icon: '⭐️', label: 'Cartão de Destaque', desc: 'Placar/Card de Valores', category: ComponentCategory.COMPONENTS },
  { type: 'timeline-ordered-description', icon: '⏱️', label: 'Linha do Tempo', desc: 'Etapas passo a passo', category: ComponentCategory.COMPONENTS },
  { type: 'link', icon: '🔗', label: 'Link', desc: 'Texto clicável (URL)', category: ComponentCategory.COMPONENTS },
  { type: 'marker-list', icon: '📌', label: 'Lista com Marcadores', desc: 'Tópicos com ícones redondos', category: ComponentCategory.COMPONENTS },
  { type: 'arrow-list', icon: '➔', label: 'Lista com Setas', desc: 'Tópicos com setas', category: ComponentCategory.COMPONENTS },
  { type: 'bullet-list', icon: '•', label: 'Lista de Pontos', desc: 'Tópicos de Rótulo e Valores', category: ComponentCategory.COMPONENTS },
  { type: 'ordered-list', icon: '1.', label: 'Lista Numerada', desc: 'Lista de passos numerados', category: ComponentCategory.COMPONENTS },
  { type: 'big-int', icon: '🔢', label: 'Número Gigante', desc: 'Dado de alto impacto (ex. 21%)', category: ComponentCategory.COMPONENTS },
  { type: 'label-value', icon: '🏷️', label: 'Rótulo e Valor', desc: 'Par de chave-valor pequeno', category: ComponentCategory.COMPONENTS },
  { type: 'section', icon: '🗂️', label: 'Seção', desc: 'Bloco de conteúdo com Título', category: ComponentCategory.COMPONENTS },
  { type: 'text', icon: '📝', label: 'Texto', desc: 'Texto simples ou longo', category: ComponentCategory.COMPONENTS },
  { type: 'title-description', icon: 'Aa', label: 'Título e Descrição', desc: 'Bloco de texto com links', category: ComponentCategory.COMPONENTS },
];

export function SidebarLeft() {
  const { addComponent, components } = usePdfBuilder();
  const [previewType, setPreviewType] = useState<ComponentType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<ComponentCategory, boolean>>({
    [ComponentCategory.LAYOUT]: true,
    [ComponentCategory.COMPONENTS]: true,
  });

  const hasComponent = (type: ComponentType) => components.some(c => c.dto.type === type);
  const isSingleton = (type: ComponentType) => ['brand', 'sidebar', 'footer'].includes(type);

  const toggleCategory = (cat: ComponentCategory) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const filteredList = COMPONENT_LIST.filter(c => 
    c.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderGroup = (category: ComponentCategory) => {
    const items = filteredList.filter(c => c.category === category);
    if (items.length === 0 && searchTerm) return null;

    const isOpen = openCategories[category];

    return (
      <div key={category} className="flex flex-col gap-2 w-full border-b border-white/5 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
        <div 
          className="flex items-center justify-between px-4 py-3 cursor-pointer transition-colors bg-black/20 hover:bg-white/5 select-none" 
          onClick={() => toggleCategory(category)}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{category}</span>
          <div className="flex justify-center items-center text-slate-500">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
        </div>
        
        {isOpen && (
          <div className="flex flex-col gap-2 px-4 py-3 bg-black/5">
            {items.map((item) => {
              const disabled = isSingleton(item.type) && hasComponent(item.type);
              return (
                <div 
                  key={item.type} 
                  className={`group flex items-start gap-3 p-3 border rounded-lg transition-all relative overflow-hidden ${
                    disabled 
                      ? 'opacity-60 cursor-not-allowed bg-white/2 border-white/5' 
                      : 'cursor-grab bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-blue-50/5 shadow-sm'
                  }`}
                  onClick={() => { if (!disabled) addComponent(item.type); }}
                  draggable={!disabled}
                  onDragStart={(e) => {
                    if (disabled) {
                      e.preventDefault();
                      return;
                    }
                    e.dataTransfer.setData('application/json', JSON.stringify({ type: item.type, isNew: true }));
                    e.dataTransfer.effectAllowed = 'copy';
                  }}
                >
                  <div className="text-base w-5 text-center mt-0.5">{item.icon}</div>
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-sm text-slate-100">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">{item.desc}</span>
                    
                    {!disabled && item.type !== 'page-break' && (
                      <button 
                        className="mt-2 flex items-center gap-1.5 text-[10px] text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-300 ml-auto" 
                        title="Visualizar Componente Real"
                        onClick={(e) => { e.stopPropagation(); setPreviewType(item.type); }}
                      >
                        <span className="text-sm">👁️</span>
                        Visualizar
                      </button>
                    )}
                  </div>

                  {disabled && (
                    <div className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full shadow-lg border border-white/20">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5 text-white">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="p-4 border-b border-white/10 relative flex items-center bg-black/10 shrink-0">
        <Search size={16} className="absolute left-7 text-slate-400" />
        <input 
          type="text" 
          placeholder="Pesquisar componentes..." 
          className="w-full bg-white/5 border border-white/10 rounded-md py-2.5 pr-3 pl-9 text-slate-100 text-sm outline-none transition focus:border-blue-500 focus:bg-white/10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {renderGroup(ComponentCategory.LAYOUT)}
        {renderGroup(ComponentCategory.COMPONENTS)}

        {filteredList.length === 0 && (
          <div className="p-6 text-center text-slate-400 text-sm italic">
            Nenhum componente encontrado.
          </div>
        )}

        {previewType && (
          <ComponentPreviewModal 
             type={previewType} 
             onClose={() => setPreviewType(null)} 
          />
        )}
      </div>
    </div>
  );
}
