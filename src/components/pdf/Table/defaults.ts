import { ResolvedTheme, TableTheme, TableConfig } from './types';

// ============================================
// Variant Types
// ============================================

export type TableVariant = 'default';

// ============================================
// Variant Definitions
// ============================================

export const TABLE_VARIANTS: Record<TableVariant, TableTheme> = {
  default: {
    headerBackgroundColor: '#5f666c',
    headerTextColor: '#f8f9fa',
    headerBold: true,
    rowBackgroundColor: '#EEEEEE',
    rowTextColor: '#212121',
    borderRadius: 4,
    cellPadding: 4,
    cellPaddingY: 2,
    rowFontSize: 7,
    alternateRowBackgroundColor: undefined, // Disable alternate rows by default
    // Espaçamentos
    groupHeaderMarginBottom: 2,
    groupHeaderPaddingY: 6,
    headerMarginBottom: 4,
    headerPaddingY: 6,
    cellSpacingX: 4,
    cellSpacingY: 4,
  },
};

// ============================================
// Default Theme Values (fallback)
// ============================================

export const DEFAULT_THEME: ResolvedTheme = {
  headerBg: '#6C6C6C',
  headerText: '#FFFFFF',
  headerBold: true,
  headerItalic: false,
  groupHeaderBg: '#4A4A4A',
  groupHeaderText: '#FFFFFF',
  groupHeaderBold: true,
  groupHeaderItalic: false,
  rowBg: '#FFFFFF',
  rowText: '#212121',
  rowBold: false,
  rowItalic: false,
  alternateRowBg: undefined,
  borderColor: '#E2E8F0',
  borderWidth: 1,
  borderRadius: 4,
  cellPadding: 8,
  fontSize: 8,
  tableWidth: '100%',
  // Espaçamentos
  groupHeaderMarginBottom: 2,
  groupHeaderPaddingY: 6,
  headerMarginBottom: 4,
  headerPaddingY: 6,
  cellSpacingX: 4,
  cellSpacingY: 4,
  enableAlternateRows: false,
};

// ============================================
// Variant Resolution
// ============================================

export function resolveVariantTheme(variant?: TableVariant, config?: TableConfig, theme?: TableTheme): ResolvedTheme {
  // Get variant theme or empty object
  const variantTheme = variant ? TABLE_VARIANTS[variant] : {};

  // Merge: config > theme > variant > defaults
  const mergedTheme: TableTheme = {
    ...variantTheme,
    ...theme,
  };

  return {
    headerBg: config?.headerBackgroundColor ?? mergedTheme.headerBackgroundColor ?? DEFAULT_THEME.headerBg,
    headerText: config?.headerTextColor ?? mergedTheme.headerTextColor ?? DEFAULT_THEME.headerText,
    headerBold: config?.headerBold ?? mergedTheme.headerBold ?? DEFAULT_THEME.headerBold,
    headerItalic: config?.headerItalic ?? mergedTheme.headerItalic ?? DEFAULT_THEME.headerItalic,

    groupHeaderBg:
      config?.groupHeaderBackgroundColor ?? mergedTheme.groupHeaderBackgroundColor ?? DEFAULT_THEME.groupHeaderBg,
    groupHeaderText: config?.groupHeaderTextColor ?? mergedTheme.groupHeaderTextColor ?? DEFAULT_THEME.groupHeaderText,
    groupHeaderBold: config?.groupHeaderBold ?? mergedTheme.groupHeaderBold ?? DEFAULT_THEME.groupHeaderBold,
    groupHeaderItalic: config?.groupHeaderItalic ?? mergedTheme.groupHeaderItalic ?? DEFAULT_THEME.groupHeaderItalic,

    rowBg: config?.rowBackgroundColor ?? mergedTheme.rowBackgroundColor ?? DEFAULT_THEME.rowBg,
    rowText: config?.rowTextColor ?? mergedTheme.rowTextColor ?? DEFAULT_THEME.rowText,
    rowBold: config?.rowBold ?? mergedTheme.rowBold ?? DEFAULT_THEME.rowBold,
    rowItalic: config?.rowItalic ?? mergedTheme.rowItalic ?? DEFAULT_THEME.rowItalic,

    alternateRowBg:
      config?.alternateRowBackgroundColor ?? mergedTheme.alternateRowBackgroundColor ?? DEFAULT_THEME.alternateRowBg,

    borderColor: config?.borderColor ?? mergedTheme.borderColor ?? DEFAULT_THEME.borderColor,
    borderWidth: config?.borderWidth ?? mergedTheme.borderWidth ?? DEFAULT_THEME.borderWidth,
    borderRadius: config?.borderRadius ?? mergedTheme.borderRadius ?? DEFAULT_THEME.borderRadius,
    cellPadding: config?.cellPadding ?? mergedTheme.cellPadding ?? DEFAULT_THEME.cellPadding,
    cellPaddingY: config?.cellPaddingY ?? mergedTheme.cellPaddingY,
    fontSize: config?.fontSize ?? mergedTheme.fontSize ?? DEFAULT_THEME.fontSize,
    rowFontSize: config?.rowFontSize ?? mergedTheme.rowFontSize,
    tableWidth: config?.tableWidth ?? mergedTheme.tableWidth ?? DEFAULT_THEME.tableWidth,
    // Espaçamentos
    groupHeaderMarginBottom:
      config?.groupHeaderMarginBottom ?? mergedTheme.groupHeaderMarginBottom ?? DEFAULT_THEME.groupHeaderMarginBottom,
    groupHeaderPaddingY:
      config?.groupHeaderPaddingY ?? mergedTheme.groupHeaderPaddingY ?? DEFAULT_THEME.groupHeaderPaddingY,
    headerMarginBottom:
      config?.headerMarginBottom ?? mergedTheme.headerMarginBottom ?? DEFAULT_THEME.headerMarginBottom,
    headerPaddingY: config?.headerPaddingY ?? mergedTheme.headerPaddingY ?? DEFAULT_THEME.headerPaddingY,
    cellSpacingX: config?.cellSpacingX ?? mergedTheme.cellSpacingX ?? DEFAULT_THEME.cellSpacingX,
    cellSpacingY: config?.cellSpacingY ?? mergedTheme.cellSpacingY ?? DEFAULT_THEME.cellSpacingY,

    enableAlternateRows:
      config?.enableAlternateRows ??
      (mergedTheme.alternateRowBackgroundColor !== undefined || DEFAULT_THEME.enableAlternateRows),
  };
}
