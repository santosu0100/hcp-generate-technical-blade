import { ReactElement } from 'react';
import { ComponentThemeConfig } from '../utils/themes';
import {
  ActionButtonDataDTO,
  TextDataDTO,
  LabelValueDataDTO,
  BigIntDataDTO,
  LabelValueVariant,
} from './operation-technical-blade.dto';

export type ComponentTheme = ComponentThemeConfig;

export const ComponentCategory = {
  LAYOUT: 'Layout Estrutural',
  COMPONENTS: 'Componentes Principais',
} as const;

export type ComponentCategory = typeof ComponentCategory[keyof typeof ComponentCategory];

export type ComponentType = 
  | 'brand' 
  | 'highlight-card' 
  | 'label-value' 
  | 'big-int' 
  | 'action-button' 
  | 'sidebar' 
  | 'text' 
  | 'section' 
  | 'page-break' 
  | 'header' 
  | 'footer' 
  | 'link' 
  | 'title-description' 
  | 'timeline-ordered-description' 
  | 'bullet-list' 
  | 'arrow-list' 
  | 'ordered-list' 
  | 'marker-list';

export interface ComponentDTO {
  type: ComponentType;
  config?: any;
  data?: any;
  children?: ComponentDTO[];
}

// Prop types for individual renderers to keep registry clean
export type RenderChildFn = (child: ComponentDTO) => ReactElement | null;

export interface BrandRenderProps {
  config?: { originator?: string; alignment?: 'left' | 'right' | 'center' };
}

export interface HighlightCardRenderProps {
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
  theme?: ComponentTheme;
}

export interface LabelValueRenderProps {
  data?: LabelValueDataDTO;
  config?: { variant?: LabelValueVariant };
  theme?: ComponentTheme;
}

export interface BigIntRenderProps {
  data?: BigIntDataDTO;
  config?: { labelPosition?: 'before' | 'after' };
  theme?: ComponentTheme;
}

export interface ActionButtonRenderProps {
  data?: ActionButtonDataDTO;
  theme?: ComponentTheme;
}

export interface SidebarRenderProps {
  config?: { width?: number };
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
}

export interface TextRenderProps {
  data?: TextDataDTO;
  config?: {
    align?: 'left' | 'right' | 'center' | 'justify';
    fontSize?: number;
    fontWeight?: 'normal' | 'bold';
    color?: string;
  };
  theme?: ComponentTheme;
}

export interface SeparatorRenderProps {
  config?: { spacing?: number };
}

export interface SectionRenderProps {
  data?: { title: string };
  config?: { titleColor?: string };
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
  theme?: ComponentTheme;
}

export interface FooterRenderProps {
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
}

export interface LinkRenderProps {
  data?: { label: string; href: string };
  config?: { color?: string };
  theme?: ComponentTheme;
}

export interface TitleDescriptionRenderProps {
  data?: { title: string; description: string; links?: { label: string; href: string }[] };
  config?: { titleColor?: string; descriptionColor?: string; linkColor?: string };
  theme?: ComponentTheme;
}

export interface TimelineOrderedDescriptionRenderProps {
  data?: {
    items: {
      title: string;
      description: string;
      links?: { label: string; href: string }[];
    }[];
  };
  config?: {
    circleColor?: string;
    titleColor?: string;
    descriptionColor?: string;
    lineColor?: string;
    linkColor?: string;
  };
  theme?: ComponentTheme;
}

export interface BulletListRenderProps {
  data?: {
    items: {
      label: string;
      value: string;
    }[];
  };
  config?: {
    bulletColor?: string;
    labelColor?: string;
    valueColor?: string;
    variant?: any; // BulletListVariant
  };
  theme?: ComponentTheme;
}

export interface ArrowListRenderProps {
  data?: {
    items: {
      title: string;
      description: string;
    }[];
  };
  config?: {
    arrowColor?: string;
    titleColor?: string;
    descriptionColor?: string;
  };
  theme?: ComponentTheme;
}

export interface OrderedListRenderProps {
  data?: {
    items: {
      title: string;
      description: string;
    }[];
  };
  config?: {
    numberColor?: string;
    numberBackgroundColor?: string;
    titleColor?: string;
    descriptionColor?: string;
  };
  theme?: ComponentTheme;
}

export interface MarkerListRenderProps {
  data?: {
    items: {
      title: string;
      description: string;
    }[];
  };
  config?: {
    markerColor?: string;
    markerSize?: number;
    titleColor?: string;
    descriptionColor?: string;
  };
  theme?: ComponentTheme;
}
