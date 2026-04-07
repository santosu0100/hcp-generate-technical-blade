import React from 'react';
import { ComponentType } from '@/types/components.dto';

// Shared modular components
import { MarginFields } from './fields/MarginFields';
import { TemplateFields } from './fields/TemplateFields';

// Component-specific modular fields
import { TextFields } from './fields/TextFields';
import { SectionFields } from './fields/SectionFields';
import { LinkFields } from './fields/LinkFields';
import { TitleDescriptionFields } from './fields/TitleDescriptionFields';
import { ListFields } from './fields/ListFields';
import { TableConfigFields } from './fields/TableConfigFields';
import { BoxGroupFields } from './fields/BoxGroupFields';
import { ImageViewFields } from './fields/ImageViewFields';
import { LabelValueFields } from './fields/LabelValueFields';
import { BigIntFields } from './fields/BigIntFields';

interface ComponentFieldsProps {
  type: ComponentType;
  data: any;
  config: any;
  dto?: any;
  onUpdateData: (data: any) => void;
  onUpdateConfig: (config: any) => void;
  onUpdateDtoRoot?: (changes: any) => void;
  onOpenTableEditor?: () => void;
}

/**
 * Main component to render property fields based on component type.
 * Delegates rendering to specialized sub-components.
 */
export function ComponentFields({ 
  type, 
  data, 
  config, 
  dto, 
  onUpdateData, 
  onUpdateConfig, 
  onUpdateDtoRoot, 
  onOpenTableEditor 
}: ComponentFieldsProps) {
  
  // Early return for page-break which has no editable props
  if (type === 'page-break') {
    return (
      <div className="p-4 text-center text-slate-400 text-sm bg-white/5 rounded-xl border border-white/5 font-medium">
        Este componente não possui configurações.
      </div>
    );
  }

  /**
   * Selection of specific fields based on component type.
   * Logic kept simple with mapping to modular components.
   */
  const renderSpecificFields = () => {
    const props = { type, data, config, onUpdateData, onUpdateConfig };

    if (type === 'text') return <TextFields {...props} />;
    if (['action-button', 'link'].includes(type)) return <LinkFields {...props} />;
    if (type === 'section') return <SectionFields {...props} />;
    if (type === 'title-description') return <TitleDescriptionFields data={data} onUpdateData={onUpdateData} />;
    if (['bullet-list', 'ordered-list', 'marker-list', 'arrow-list', 'ordered-description'].includes(type)) return <ListFields type={type} data={data} onUpdateData={onUpdateData} />;
    if (type === 'table' && onOpenTableEditor) return <TableConfigFields config={config} onUpdateConfig={onUpdateConfig} onOpenTableEditor={onOpenTableEditor} />;
    if (type === 'box-group') return <BoxGroupFields config={config} onUpdateConfig={onUpdateConfig} />;
    if (type === 'image-view') return <ImageViewFields {...props} />;
    if (type === 'label-value') return <LabelValueFields {...props} />;
    if (type === 'big-int') return <BigIntFields {...props} />;
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 1. Technical identification / template keys */}
      {onUpdateDtoRoot && <TemplateFields dto={dto} onUpdateDtoRoot={onUpdateDtoRoot} />}

      {/* 2. Content specific fields */}
      {renderSpecificFields()}

      {/* 3. Global layout and margin settings */}
      <MarginFields config={config} onUpdateConfig={onUpdateConfig} />
    </div>
  );
}
