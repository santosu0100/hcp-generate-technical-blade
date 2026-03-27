import type { ReactElement } from 'react';
import type {
  ComponentTheme,
  BaseComponentDTO,
  BrandConfig,
  SectionConfig,
  TextConfig,
  LinkConfig,
  TitleDescriptionConfig,
  OrderedDescriptionConfig,
  BulletListConfig,
  ArrowListConfig,
  OrderedListConfig,
  MarkerListConfig,
  BoxGroupConfig,
  TableConfig,
  ImageViewConfig,
  ImageViewData,
  LabelValueDataDTO,
  BigIntDataDTO,
  ActionButtonDataDTO,
  TextDataDTO,
  SectionData,
  LinkData,
  TitleDescriptionData,
  OrderedDescriptionData,
  BulletListData,
  ArrowListData,
  OrderedListData,
  MarkerListData,
  TableData,
  LabelValueVariant,
} from '@/types/components.dto';

export const ComponentCategory = {
  LAYOUT: 'Layout',
  COMPONENTS: 'Componentes',
} as const;

export type ComponentCategory = (typeof ComponentCategory)[keyof typeof ComponentCategory];

// ============================================
// Render function types
// ============================================

export type RenderChildFn = (child: BaseComponentDTO) => ReactElement | null;

// Note: ComponentRendererContext is defined in ComponentRenderer.tsx
// and imported from there when needed

export interface BaseRendererProps {
  config?: unknown;
  data?: unknown;
  children?: BaseComponentDTO[];
  theme?: ComponentTheme;
  renderChild: RenderChildFn;
  context?: { originator?: string };
}

export type ComponentRendererFn = (props: BaseRendererProps) => ReactElement | null;

// ============================================
// Renderer props for each component
// ============================================

export interface BrandRendererProps {
  config?: BrandConfig;
  context?: { originator?: string };
}

export interface CardRendererProps {
  config?: { width?: number | string; height?: number | string };
  children?: BaseComponentDTO[];
  renderChild: RenderChildFn;
  theme?: ComponentTheme;
}

export interface LabelValueRendererProps {
  data?: LabelValueDataDTO;
  config?: { variant?: LabelValueVariant; textAlign?: 'left' | 'right' | 'center' | 'justify' };
  theme?: ComponentTheme;
}

export interface BigIntRendererProps {
  data?: BigIntDataDTO;
  config?: { labelPosition?: 'before' | 'after'; fontSize?: number };
  theme?: ComponentTheme;
}

export interface ActionButtonRendererProps {
  data?: ActionButtonDataDTO;
  theme?: ComponentTheme;
}

export interface SidebarRendererProps {
  config?: { width?: number };
  children?: BaseComponentDTO[];
  renderChild: RenderChildFn;
}

export interface TextRendererProps {
  data?: TextDataDTO;
  config?: TextConfig;
  theme?: ComponentTheme;
}

export interface SectionRendererProps {
  data?: SectionData;
  config?: SectionConfig;
  children?: BaseComponentDTO[];
  renderChild: RenderChildFn;
  theme?: ComponentTheme;
}

export interface FooterRendererProps {
  children?: BaseComponentDTO[];
  renderChild: RenderChildFn;
}

export interface LinkRendererProps {
  data?: LinkData;
  config?: LinkConfig;
  theme?: ComponentTheme;
}

export interface TitleDescriptionRendererProps {
  data?: TitleDescriptionData;
  config?: TitleDescriptionConfig;
  theme?: ComponentTheme;
  children?: BaseComponentDTO[];
  renderChild: RenderChildFn;
}

export interface OrderedDescriptionRendererProps {
  data?: OrderedDescriptionData;
  config?: OrderedDescriptionConfig;
  theme?: ComponentTheme;
}

export interface BulletListRendererProps {
  data?: BulletListData;
  config?: BulletListConfig;
  theme?: ComponentTheme;
}

export interface ArrowListRendererProps {
  data?: ArrowListData;
  config?: ArrowListConfig;
  theme?: ComponentTheme;
}

export interface OrderedListRendererProps {
  data?: OrderedListData;
  config?: OrderedListConfig;
  theme?: ComponentTheme;
}

export interface MarkerListRendererProps {
  data?: MarkerListData;
  config?: MarkerListConfig;
  theme?: ComponentTheme;
}

export interface TableRendererProps {
  data?: TableData;
  config?: TableConfig;
  theme?: ComponentTheme;
}

export interface BoxGroupRendererProps {
  config?: BoxGroupConfig;
  children?: BaseComponentDTO[];
  renderChild: RenderChildFn;
}


export interface ImageViewRendererProps {
  data?: ImageViewData;
  config?: ImageViewConfig;
  theme?: ComponentTheme;
}
