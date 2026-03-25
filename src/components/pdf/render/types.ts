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
  LabelValueData,
  BigIntData,
  ActionButtonData,
  TextData,
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
  ComponentDTO,
  ComponentConfigDTO,
  ComponentType,
} from '@/types/components.dto';

// ============================================
// Categories (Frontend Builder Specific)
// ============================================

export const ComponentCategory = {
  LAYOUT: 'Layout Estrutural',
  COMPONENTS: 'Componentes Principais',
} as const;

export type ComponentCategory = typeof ComponentCategory[keyof typeof ComponentCategory];

// ============================================
// Types exported for the rest of the app
// ============================================

export type { ComponentDTO, ComponentType, ComponentTheme, BaseComponentDTO };

// ============================================
// Render function types
// ============================================

export type RenderChildFn = (child: ComponentDTO) => ReactElement | null;

export interface BaseRendererProps {
  config?: ComponentConfigDTO;
  data?: unknown;
  children?: ComponentDTO[];
  theme?: ComponentTheme;
  renderChild: RenderChildFn;
}

export type ComponentRendererFn = (props: BaseRendererProps) => ReactElement | null;

// ============================================
// Renderer props for each component
// ============================================

export interface BrandRendererProps {
  config?: BrandConfig & ComponentConfigDTO;
}

export interface CardRendererProps {
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
  theme?: ComponentTheme;
  config?: ComponentConfigDTO;
}

export interface LabelValueRendererProps {
  data?: LabelValueData;
  config?: ComponentConfigDTO & { variant?: LabelValueVariant; textAlign?: 'left' | 'right' | 'center' | 'justify' };
  theme?: ComponentTheme;
}

export interface BigIntRendererProps {
  data?: BigIntData;
  config?: ComponentConfigDTO & { labelPosition?: 'before' | 'after'; fontSize?: number };
  theme?: ComponentTheme;
}

export interface ActionButtonRendererProps {
  data?: ActionButtonData;
  theme?: ComponentTheme;
  config?: ComponentConfigDTO;
}

export interface SidebarRendererProps {
  config?: { width?: number | string } & ComponentConfigDTO;
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
}

export interface TextRendererProps {
  data?: TextData;
  config?: TextConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface SectionRendererProps {
  data?: SectionData;
  config?: SectionConfig & ComponentConfigDTO;
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
  theme?: ComponentTheme;
}

export interface FooterRendererProps {
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
  config?: ComponentConfigDTO;
}

export interface LinkRendererProps {
  data?: LinkData;
  config?: LinkConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface TitleDescriptionRendererProps {
  data?: TitleDescriptionData;
  config?: TitleDescriptionConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface OrderedDescriptionRendererProps {
  data?: OrderedDescriptionData;
  config?: OrderedDescriptionConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface BulletListRendererProps {
  data?: BulletListData;
  config?: BulletListConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface ArrowListRendererProps {
  data?: ArrowListData;
  config?: ArrowListConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface OrderedListRendererProps {
  data?: OrderedListData;
  config?: OrderedListConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface MarkerListRendererProps {
  data?: MarkerListData;
  config?: MarkerListConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface TableRendererProps {
  data?: TableData;
  config?: TableConfig & ComponentConfigDTO;
  theme?: ComponentTheme;
}

export interface BoxGroupRendererProps {
  config?: BoxGroupConfig & ComponentConfigDTO;
  children?: ComponentDTO[];
  renderChild: RenderChildFn;
}
