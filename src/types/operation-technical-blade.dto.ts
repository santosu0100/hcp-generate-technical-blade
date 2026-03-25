import type { ComponentType } from './pdf-components.types';
import { ORIGINATORS } from '../utils/originators';

export type OriginatorType = (typeof ORIGINATORS)[number];
export type LabelValueVariant = 'default' | 'bolder-label' | 'bolder-value' | 'bolder-both';
export type BigIntLabelPosition = 'before' | 'after';
export type Originator = 'hurst' | string;
export type Alignment = 'left' | 'right' | 'center' | 'justify';
export type ComponentPosition = 'left' | 'right' | 'center' | 'full';

export interface ComponentConfigDTO {
  position?: ComponentPosition;
  variant?: string;
  width?: number;
  pages?: number[];
  originator?: Originator;
  alignment?: Alignment;
  titleColor?: string;
  align?: 'left' | 'right' | 'center' | 'justify';
  labelPosition?: BigIntLabelPosition;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;
  spacing?: number;
  descriptionColor?: string;
  linkColor?: string;
  bulletColor?: string;
  labelColor?: string;
  valueColor?: string;
  numberColor?: string;
  numberBackgroundColor?: string;
  markerColor?: string;
  markerSize?: number;
  arrowColor?: string;
  circleColor?: string;
  lineColor?: string;
  headerBackgroundColor?: string;
  headerTextColor?: string;
  headerBold?: boolean;
  rowBackgroundColor?: string;
  alternateRowBackgroundColor?: string;
  enableAlternateRows?: boolean;
}

export interface BrandDataDTO {}
export interface LabelValueDataDTO { label: string; value: string; }
export interface BigIntDataDTO { value: string; label?: string; }
export interface CardDataDTO {}
export interface ActionButtonDataDTO { label: string; href: string; }
export interface SidebarDataDTO {}
export interface TextDataDTO { content: string; }
export interface SeparatorDataDTO {}

export interface TableColumnDTO {
  key: string;
  label: string;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  bold?: boolean;
  italic?: boolean;
  color?: string;
}

export interface TableRowDataDTO {
  cells: Record<string, string | number>;
}

export interface TableDataDTO {
  columns: TableColumnDTO[];
  items: TableRowDataDTO[];
  groups?: any[];
}

export interface ComponentDTO {
  type: ComponentType;
  config?: ComponentConfigDTO;
  data?:
    | BrandDataDTO
    | CardDataDTO
    | ActionButtonDataDTO
    | SidebarDataDTO
    | TextDataDTO
    | SeparatorDataDTO
    | LabelValueDataDTO
    | BigIntDataDTO
    | TableDataDTO
    | any;
  children?: ComponentDTO[];
}

export interface OperationTechnicalBladeDTO {
  originator?: OriginatorType;
  components: ComponentDTO[];
}
