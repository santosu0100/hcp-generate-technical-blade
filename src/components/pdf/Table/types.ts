// ============================================
// Type Definitions for Table Component
// ============================================

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  color?: string;
}

export interface CellStyle {
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
  align?: 'left' | 'right' | 'center';
  // Cores específicas para células de dados (quando diferentes do header)
  dataBackgroundColor?: string;
  dataTextColor?: string;
}

export interface ColumnDefinition {
  key: string;
  label: string;
  width?: number | string;
  style?: CellStyle;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  align?: 'left' | 'right' | 'center';
}

export interface ColumnGroup {
  label: string;
  columns: string[];
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface RowStyle {
  backgroundColor?: string;
  textColor?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface RowData {
  cells: { [key: string]: string | number };
  style?: RowStyle;
}

export interface TableTheme {
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
  fontSize?: number;
  rowFontSize?: number;
  tableWidth?: string;
  // Espaçamentos
  groupHeaderMarginBottom?: number;
  groupHeaderPaddingY?: number;
  headerMarginBottom?: number;
  headerPaddingY?: number;
  cellSpacingX?: number;
  cellSpacingY?: number;
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
  cellPaddingY?: number; // Padding vertical específico para células de dados
  fontSize?: number;
  rowFontSize?: number; // Tamanho da fonte para células de dados
  tableWidth?: string; // Largura da tabela ('auto', '100%', etc)
  // Espaçamentos
  groupHeaderMarginBottom?: number; // Espaçamento abaixo do group header
  groupHeaderPaddingY?: number; // Padding vertical do group header
  headerMarginBottom?: number; // Espaçamento abaixo do header (entre header e corpo)
  headerPaddingY?: number; // Padding vertical do header
  cellSpacingX?: number; // Espaçamento horizontal entre células
  cellSpacingY?: number; // Espaçamento vertical entre linhas
  enableAlternateRows?: boolean;
}

export interface ResolvedTheme {
  headerBg: string;
  headerText: string;
  headerBold: boolean;
  headerItalic: boolean;
  groupHeaderBg: string;
  groupHeaderText: string;
  groupHeaderBold: boolean;
  groupHeaderItalic: boolean;
  rowBg: string;
  rowText: string;
  rowBold: boolean;
  rowItalic: boolean;
  alternateRowBg?: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  cellPadding: number;
  cellPaddingY?: number;
  fontSize: number;
  rowFontSize?: number;
  tableWidth?: string;
  // Espaçamentos
  groupHeaderMarginBottom: number;
  groupHeaderPaddingY: number;
  headerMarginBottom: number;
  headerPaddingY: number;
  cellSpacingX: number;
  cellSpacingY: number;
  enableAlternateRows: boolean;
}

export interface TableProps {
  columns: ColumnDefinition[];
  items: RowData[];
  groups?: ColumnGroup[];
  config?: TableConfig;
  theme?: TableTheme;
  variant?: string;
}

export interface ColumnStyleResolved {
  backgroundColor: string;
  textColor: string;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'right' | 'center';
}

export interface RowStyleResolved {
  backgroundColor: string;
  textColor: string;
  bold: boolean;
  italic: boolean;
}

export interface CellStyleResolved {
  backgroundColor: string;
  textColor: string;
  bold: boolean;
  italic: boolean;
  align: 'left' | 'right' | 'center';
}
