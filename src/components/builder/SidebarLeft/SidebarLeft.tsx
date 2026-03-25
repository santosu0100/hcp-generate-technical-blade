import { useState } from 'react';
import { usePdfBuilder } from '@/context/PdfBuilderContext';
import { ComponentType, ComponentCategory } from '@/components/pdf/render/types';
import { ComponentPreviewModal } from '../ComponentPreviewModal';
import { SearchBox } from './SearchBox';
import { CategoryGroup } from './CategoryGroup';
import { ComponentItem } from './ComponentItem';
import { COMPONENT_LIST } from './constants';

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

    return (
      <CategoryGroup 
        key={category} 
        category={category} 
        isOpen={openCategories[category]} 
        onToggle={toggleCategory}
      >
        {items.map((item) => (
          <ComponentItem 
            key={item.type}
            type={item.type}
            icon={item.icon}
            label={item.label}
            desc={item.desc}
            disabled={isSingleton(item.type) && hasComponent(item.type)}
            onAdd={addComponent}
            onPreview={setPreviewType}
          />
        ))}
      </CategoryGroup>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <SearchBox value={searchTerm} onChange={setSearchTerm} />

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
