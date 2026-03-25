import type { ComponentThemeConfig } from '../utils/themes';

// ============================================
// Component Types
// ============================================

export type LabelValueVariant = 'default' | 'bolder-label' | 'bolder-value' | 'bolder-both';
export type BulletListVariant = 'label-bolder' | 'value-bolder';

export type ComponentType =
  | 'brand'
  | 'card'
  | 'label-value'
  | 'big-int'
  | 'action-button'
  | 'sidebar'
  | 'text'
  | 'section'
  | 'page-break'
  | 'footer'
  | 'link'
  | 'title-description'
  | 'ordered-description'
  | 'bullet-list'
  | 'arrow-list'
  | 'ordered-list'
  | 'marker-list'
  | 'table'
  | 'box-group';

// ============================================
// Component Config Types
// ============================================

export interface BrandConfig {
  originator?: string;
  alignment?: 'left' | 'right' | 'center';
}

export interface SidebarConfig {
  width?: number | string;
  position?: 'left' | 'right';
}

export interface TextConfig {
  align?: 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;
}

export interface SectionConfig {
  titleColor?: string;
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
}

export interface LinkConfig {
  color?: string;
}

export interface TitleDescriptionConfig {
  titleColor?: string;
  descriptionColor?: string;
  linkColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
}

export interface OrderedDescriptionConfig {
  circleColor?: string;
  circleBackgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  lineColor?: string;
  linkColor?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberFontSize?: number;
  numberColor?: string;
}

export interface BulletListConfig {
  bulletColor?: string;
  labelColor?: string;
  valueColor?: string;
  variant?: BulletListVariant;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
}

export interface ArrowListConfig {
  arrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
}

export interface OrderedListConfig {
  numberColor?: string;
  numberBackgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberFontSize?: number;
}

export interface MarkerListConfig {
  markerColor?: string;
  markerSize?: number;
  titleColor?: string;
  descriptionColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberColor?: string;
  numberFontSize?: number;
}

export interface BoxGroupConfig {
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
}

export interface TableColumnConfig {
  key: string;
  label: string;
  width?: number | string;
  style?: {
    backgroundColor?: string;
    textColor?: string;
    bold?: boolean;
    italic?: boolean;
    align?: 'left' | 'right' | 'center';
  };
  bold?: boolean;
  italic?: boolean;
  color?: string;
  align?: 'left' | 'right' | 'center';
}

export interface TableGroupConfig {
  label: string;
  columns: string[];
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface TableRowData {
  cells: Record<string, string | number>;
  style?: { backgroundColor?: string; textColor?: string; bold?: boolean; italic?: boolean };
}

export interface TableConfig {
  variant?: string;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  headerBold?: boolean;
  headerItalic?: boolean;
  groupHeaderBackgroundColor?: string;
  groupHeaderTextColor?: string;
  groupHeaderBold?: boolean;
  groupHeaderItalic?: boolean;
  rowBackgroundColor?: string;
  rowTextColor?: string;
  rowBold?: boolean;
  rowItalic?: boolean;
  alternateRowBackgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  cellPadding?: number;
  cellPaddingY?: number;
  rowFontSize?: number;
  fontSize?: number;
  tableWidth?: string;
  groupHeaderMarginBottom?: number;
  headerMarginBottom?: number;
  cellSpacingX?: number;
  cellSpacingY?: number;
  enableAlternateRows?: boolean;
}

// ============================================
// Component Data Types
// ============================================

export interface LinkData {
  label: string;
  href: string;
}

export interface TitleDescriptionData {
  title: string;
  description: string;
  links?: { label: string; href: string }[];
}

export interface OrderedDescriptionData {
  items: {
    title: string;
    description: string;
    links?: { label: string; href: string }[];
  }[];
}

export interface BulletListData {
  items: {
    label: string;
    value: string;
  }[];
}

export interface ArrowListData {
  items: {
    title: string;
    description: string;
  }[];
}

export interface OrderedListData {
  items: {
    title: string;
    description: string;
  }[];
}

export interface MarkerListData {
  items: {
    title: string;
    description: string;
  }[];
}

export interface TableData {
  columns: TableColumnConfig[];
  items: TableRowData[];
  groups?: TableGroupConfig[];
}

export interface SectionData {
  title: string;
}

export interface LabelValueData {
  label: string;
  value: string;
}

export interface BigIntData {
  value: string;
  label?: string;
}

export interface ActionButtonData {
  label: string;
  href: string;
}

export interface TextData {
  content: string;
}

// ============================================
// Base Component DTO
// ============================================

export interface BaseComponentDTO {
  type: ComponentType;
  config?: unknown;
  data?: unknown;
  children?: BaseComponentDTO[];
}

// ============================================
// Discriminated Union Component DTOs
// ============================================

export interface BrandComponentDTO {
  type: 'brand';
  config?: BrandConfig;
  children?: never;
}

export interface CardComponentDTO {
  type: 'card';
  children?: ComponentDTO[];
  config?: ComponentConfigDTO;
}

export interface LabelValueComponentDTO {
  type: 'label-value';
  data?: LabelValueData;
  config?: ComponentConfigDTO & { variant?: LabelValueVariant; textAlign?: 'left' | 'right' | 'center' | 'justify' };
}

export interface BigIntComponentDTO {
  type: 'big-int';
  data?: BigIntData;
  config?: ComponentConfigDTO & { labelPosition?: 'before' | 'after'; fontSize?: number };
}

export interface ActionButtonComponentDTO {
  type: 'action-button';
  data?: ActionButtonData;
  config?: ComponentConfigDTO;
}

export interface SidebarComponentDTO {
  type: 'sidebar';
  config?: SidebarConfig;
  children?: ComponentDTO[];
}

export interface TextComponentDTO {
  type: 'text';
  data?: TextData;
  config?: TextConfig & ComponentConfigDTO;
}

export interface SectionComponentDTO {
  type: 'section';
  data?: SectionData;
  config?: SectionConfig & ComponentConfigDTO;
  children?: ComponentDTO[];
}

export interface PageBreakComponentDTO {
  type: 'page-break';
  config?: ComponentConfigDTO;
}

export interface FooterComponentDTO {
  type: 'footer';
  children?: ComponentDTO[];
  config?: ComponentConfigDTO;
}

export interface LinkComponentDTO {
  type: 'link';
  data?: LinkData;
  config?: LinkConfig & ComponentConfigDTO;
}

export interface TitleDescriptionComponentDTO {
  type: 'title-description';
  data?: TitleDescriptionData;
  config?: TitleDescriptionConfig & ComponentConfigDTO;
}

export interface OrderedDescriptionComponentDTO {
  type: 'ordered-description';
  data?: OrderedDescriptionData;
  config?: OrderedDescriptionConfig & ComponentConfigDTO;
}

export interface BulletListComponentDTO {
  type: 'bullet-list';
  data?: BulletListData;
  config?: BulletListConfig & ComponentConfigDTO;
}

export interface ArrowListComponentDTO {
  type: 'arrow-list';
  data?: ArrowListData;
  config?: ArrowListConfig & ComponentConfigDTO;
}

export interface OrderedListComponentDTO {
  type: 'ordered-list';
  data?: OrderedListData;
  config?: OrderedListConfig & ComponentConfigDTO;
}

export interface MarkerListComponentDTO {
  type: 'marker-list';
  data?: MarkerListData;
  config?: MarkerListConfig & ComponentConfigDTO;
}

export interface TableComponentDTO {
  type: 'table';
  data?: TableData;
  config?: TableConfig & ComponentConfigDTO;
}

export interface BoxGroupComponentDTO {
  type: 'box-group';
  config?: BoxGroupConfig & ComponentConfigDTO;
  children?: ComponentDTO[];
}

export type ComponentDTO =
  | BrandComponentDTO
  | CardComponentDTO
  | LabelValueComponentDTO
  | BigIntComponentDTO
  | ActionButtonComponentDTO
  | SidebarComponentDTO
  | TextComponentDTO
  | SectionComponentDTO
  | PageBreakComponentDTO
  | FooterComponentDTO
  | LinkComponentDTO
  | TitleDescriptionComponentDTO
  | OrderedDescriptionComponentDTO
  | BulletListComponentDTO
  | ArrowListComponentDTO
  | OrderedListComponentDTO
  | MarkerListComponentDTO
  | TableComponentDTO
  | BoxGroupComponentDTO;

// ============================================
// Component Config DTO
// ============================================

export interface ComponentConfigDTO {
  // Layout & Spacing
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: string;
  position?: 'left' | 'right' | 'center';

  // Text alignment
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  align?: 'left' | 'right' | 'center' | 'justify';

  // Typography
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;

  // Component-specific
  variant?: string;
  alignment?: 'left' | 'right' | 'center';
  titleColor?: string;
  labelPosition?: 'before' | 'after';
  originator?: string;

  // Group/Section layout config
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;

  // Table config
  headerBackgroundColor?: string;
  headerTextColor?: string;
  headerBold?: boolean;
  headerItalic?: boolean;
  groupHeaderBackgroundColor?: string;
  groupHeaderTextColor?: string;
  groupHeaderBold?: boolean;
  groupHeaderItalic?: boolean;
  rowBackgroundColor?: string;
  rowTextColor?: string;
  rowBold?: boolean;
  rowItalic?: boolean;
  alternateRowBackgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  cellPadding?: number;
  tableWidth?: string;
  enableAlternateRows?: boolean;
  headerMarginBottom?: number;
  groupHeaderMarginBottom?: number;
  cellSpacingX?: number;
  cellSpacingY?: number;
  cellPaddingY?: number;
  rowFontSize?: number;
}

export type ComponentTheme = ComponentThemeConfig;
