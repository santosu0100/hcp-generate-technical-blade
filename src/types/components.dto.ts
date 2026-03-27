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
  | 'box-group'
  | 'chart'
  | 'image-view';

// ============================================
// Component Config Types
// ============================================

export interface MarginConfig {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number | string;
}

export interface BrandConfig extends MarginConfig {
  originator?: string;
  alignment?: 'left' | 'right' | 'center';
}

export interface SidebarConfig extends MarginConfig {
  width?: number;
  position?: 'left' | 'right';
}

export interface TextConfig extends MarginConfig {
  align?: 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;
}

export interface SectionConfig extends MarginConfig {
  titleColor?: string;
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
  /** When true, all children have equal width. When false, children flex based on content. Default: true */
  equalWidth?: boolean;
}

export interface LinkConfig extends MarginConfig {
  color?: string;
}

export interface TitleDescriptionConfig extends MarginConfig {
  titleColor?: string;
  descriptionColor?: string;
  linkColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
  // Bullet list styling (when items are provided)
  bulletColor?: string;
  labelColor?: string;
  valueColor?: string;
  bulletFontSize?: number;
  gap?: number;
  markerGap?: number;
}

export interface OrderedDescriptionConfig extends MarginConfig {
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
  markerGap?: number;
}

export interface BulletListConfig extends MarginConfig {
  bulletColor?: string;
  labelColor?: string;
  valueColor?: string;
  variant?: BulletListVariant;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
  markerGap?: number;
}

export interface ArrowListConfig extends MarginConfig {
  arrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
  markerGap?: number;
}

export interface OrderedListConfig extends MarginConfig {
  numberColor?: string;
  numberBackgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberFontSize?: number;
  markerGap?: number;
}

export interface MarkerListConfig extends MarginConfig {
  markerColor?: string;
  markerSize?: number;
  titleColor?: string;
  descriptionColor?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  /** Enable snake lines connecting items */
  snakeLines?: boolean;
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberColor?: string;
  numberFontSize?: number;
  markerGap?: number;
}

export interface BoxGroupConfig extends MarginConfig {
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
}

// ============================================
// Chart Types
// ============================================

export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea';

export interface ChartDataset {
  label: string;
  data: number[];
  type?: 'bar' | 'line';
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  yAxisID?: string;
  /** Line chart options */
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  borderDash?: number[];
}

export interface ChartAxisConfig {
  display?: boolean;
  title?: string;
  min?: number;
  max?: number;
  position?: 'left' | 'right';
}

export interface ChartOptions {
  title?: string;
  titleColor?: string;
  titleFontSize?: number;
  legendDisplay?: boolean;
  legendFontSize?: number;
  tickFontSize?: number;
  /** Show/hide X axis line and labels */
  xAxisDisplay?: boolean;
  /** Show/hide Y axis line and labels */
  yAxisDisplay?: boolean;
  /** Show/hide all grid lines (backward compatibility) */
  gridDisplay?: boolean;
  /** Show/hide vertical grid lines (X axis) */
  gridXDisplay?: boolean;
  /** Show/hide horizontal grid lines (Y axis) */
  gridYDisplay?: boolean;
  gridColor?: string;
  /** Left Y-axis config */
  yAxis?: ChartAxisConfig;
  /** Right Y-axis config (for dual-axis charts) */
  yAxis1?: ChartAxisConfig;
}

export interface ChartConfig extends MarginConfig {
  type: ChartType;
  width?: number;
  height?: number;
  /** Use percentage-based width for responsive sizing (e.g., '100%') */
  widthPercent?: string;
  /** Fixed height in points for PDF display */
  displayHeight?: number;
  options?: ChartOptions;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// ============================================
// Image View Component
// ============================================

export interface ImageViewConfig extends MarginConfig {
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none';
  alignment?: 'left' | 'center' | 'right';
}

export interface ImageViewData {
  src: string;
}

export interface ImageViewComponentDTO extends BaseComponentDTO {
  type: 'image-view';
  data?: ImageViewData;
  config?: ImageViewConfig;
}

export interface ImageViewTheme {
  primaryColor?: string;
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

export interface TableConfig extends MarginConfig {
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
  description?: string;
  links?: { label: string; href: string }[];
  items?: {
    label: string;
    value: string;
  }[];
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
    icon?: string;
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

// ============================================
// Base Component DTO
// ============================================

export interface BaseComponentDTO {
  type: ComponentType;
  config?: ComponentConfigDTO;
  data?: ComponentDataDTO;
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
}

export interface LabelValueComponentDTO {
  type: 'label-value';
  data?: LabelValueDataDTO;
  config?: { variant?: LabelValueVariant; textAlign?: 'left' | 'right' | 'center' | 'justify' };
}

export interface BigIntComponentDTO {
  type: 'big-int';
  data?: BigIntDataDTO;
  config?: { labelPosition?: 'before' | 'after'; fontSize?: number };
}

export interface ActionButtonComponentDTO {
  type: 'action-button';
  data?: ActionButtonDataDTO;
}

export interface SidebarComponentDTO {
  type: 'sidebar';
  config?: SidebarConfig;
  children?: ComponentDTO[];
}

export interface TextComponentDTO {
  type: 'text';
  data?: TextDataDTO;
  config?: TextConfig;
}

export interface SectionComponentDTO {
  type: 'section';
  data?: SectionData;
  config?: SectionConfig;
  children?: ComponentDTO[];
}

export interface PageBreakComponentDTO {
  type: 'page-break';
}

export interface FooterComponentDTO {
  type: 'footer';
  children?: ComponentDTO[];
}

export interface LinkComponentDTO {
  type: 'link';
  data?: LinkData;
  config?: LinkConfig;
}

export interface TitleDescriptionComponentDTO {
  type: 'title-description';
  data?: TitleDescriptionData;
  config?: TitleDescriptionConfig;
}

export interface OrderedDescriptionComponentDTO {
  type: 'ordered-description';
  data?: OrderedDescriptionData;
  config?: OrderedDescriptionConfig;
}

export interface BulletListComponentDTO {
  type: 'bullet-list';
  data?: BulletListData;
  config?: BulletListConfig;
}

export interface ArrowListComponentDTO {
  type: 'arrow-list';
  data?: ArrowListData;
  config?: ArrowListConfig;
}

export interface OrderedListComponentDTO {
  type: 'ordered-list';
  data?: OrderedListData;
  config?: OrderedListConfig;
}

export interface MarkerListComponentDTO {
  type: 'marker-list';
  data?: MarkerListData;
  config?: MarkerListConfig;
}

export interface TableComponentDTO {
  type: 'table';
  data?: TableData;
  config?: TableConfig;
}

export interface BoxGroupComponentDTO {
  type: 'box-group';
  config?: BoxGroupConfig;
  children?: BaseComponentDTO[];
}

export interface ChartComponentDTO {
  type: 'chart';
  data?: ChartData;
  config?: ChartConfig;
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
  | BoxGroupComponentDTO
  | ChartComponentDTO
  | ImageViewComponentDTO;

// ============================================
// Component Data DTOs (Validation)
// ============================================

export interface LabelValueDataDTO {
  label: string;
  value: string;
}

export interface BigIntDataDTO {
  value: string;
  label?: string;
}

export interface ActionButtonDataDTO {
  label: string;
  href: string;
}

export interface TextDataDTO {
  content: string;
}

export interface SectionDataDTO {
  title: string;
}

export interface TitleDescriptionDataDTO {
  title: string;
  description?: string;
  links?: { label: string; href: string }[];
  items?: {
    label: string;
    value: string;
  }[];
}

export interface OrderedDescriptionDataDTO {
  items: {
    title: string;
    description: string;
    links?: { label: string; href: string }[];
  }[];
}

export interface BulletListDataDTO {
  items: {
    label: string;
    value: string;
  }[];
}

export interface ArrowListDataDTO {
  items: {
    title: string;
    description: string;
  }[];
}

export interface OrderedListDataDTO {
  items: {
    title: string;
    description: string;
  }[];
}

export interface MarkerListDataDTO {
  items: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

// ============================================
// Table DTOs (Validation)
// ============================================

export interface TableColumnStyleDTO {
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'right' | 'center';
}

export interface TableColumnDTO {
  key: string;
  label: string;
  width?: number | string;
  style?: TableColumnStyleDTO;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  align?: 'left' | 'right' | 'center';
}

export interface TableRowStyleDTO {
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface TableRowDTO {
  [key: string]: string | number | TableRowStyleDTO | undefined;
  style?: TableRowStyleDTO;
}

export interface TableColumnGroupDTO {
  label: string;
  columns: string[];
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface TableDataDTO {
  columns: TableColumnDTO[];
  items: TableRowDTO[];
  groups?: TableColumnGroupDTO[];
}

// ============================================
// Union type for all component data
// ============================================

export type ComponentDataDTO =
  | LabelValueDataDTO
  | BigIntDataDTO
  | ActionButtonDataDTO
  | TextDataDTO
  | SectionDataDTO
  | TitleDescriptionDataDTO
  | OrderedDescriptionDataDTO
  | BulletListDataDTO
  | ArrowListDataDTO
  | OrderedListDataDTO
  | MarkerListDataDTO
  | TableDataDTO
  | ImageViewData
  | ChartData;

// ============================================
// Component Config DTO (Validation)
// ============================================

export interface ComponentConfigDTO extends MarginConfig {
  // Layout & Spacing
  width?: number | string;
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

  // Additional props
  bulletColor?: string;
  labelColor?: string;
  valueColor?: string;
  bulletFontSize?: number;
  gap?: number;
  markerGap?: number;
  snakeLines?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none';
  equalWidth?: boolean;
  numberColor?: string;
  numberFontSize?: number;
  circleColor?: string;
  circleBackgroundColor?: string;
  lineColor?: string;
  markerSize?: number;
  markerColor?: string;
  arrowColor?: string;
}

export type ComponentTheme = ComponentThemeConfig;
