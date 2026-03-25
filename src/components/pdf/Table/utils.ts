import {
  TableConfig,
  TableTheme,
  ResolvedTheme,
  ColumnDefinition,
  RowData,
  ColumnStyleResolved,
  RowStyleResolved,
  CellStyleResolved,
} from './types';
import { DEFAULT_THEME } from './defaults';

// ============================================
// Helper Functions
// ============================================

export function resolveColor(value: string | undefined, fallback: string): string {
  return value ?? fallback;
}

export function resolveBoolean(value: boolean | undefined, fallback: boolean): boolean {
  return value ?? fallback;
}

export function resolveNumber(value: number | undefined, fallback: number): number {
  return value ?? fallback;
}

// ============================================
// Theme Resolution
// ============================================

export function resolveTheme(config?: TableConfig, theme?: TableTheme): ResolvedTheme {
  return {
    headerBg: resolveColor(
      config?.headerBackgroundColor,
      resolveColor(theme?.headerBackgroundColor, DEFAULT_THEME.headerBg),
    ),
    headerText: resolveColor(config?.headerTextColor, resolveColor(theme?.headerTextColor, DEFAULT_THEME.headerText)),
    headerBold: resolveBoolean(config?.headerBold, resolveBoolean(theme?.headerBold, DEFAULT_THEME.headerBold)),
    headerItalic: resolveBoolean(config?.headerItalic, resolveBoolean(theme?.headerItalic, DEFAULT_THEME.headerItalic)),

    groupHeaderBg: resolveColor(
      config?.groupHeaderBackgroundColor,
      resolveColor(theme?.groupHeaderBackgroundColor, DEFAULT_THEME.groupHeaderBg),
    ),
    groupHeaderText: resolveColor(
      config?.groupHeaderTextColor,
      resolveColor(theme?.groupHeaderTextColor, DEFAULT_THEME.groupHeaderText),
    ),
    groupHeaderBold: resolveBoolean(
      config?.groupHeaderBold,
      resolveBoolean(theme?.groupHeaderBold, DEFAULT_THEME.groupHeaderBold),
    ),
    groupHeaderItalic: resolveBoolean(
      config?.groupHeaderItalic,
      resolveBoolean(theme?.groupHeaderItalic, DEFAULT_THEME.groupHeaderItalic),
    ),

    rowBg: resolveColor(config?.rowBackgroundColor, resolveColor(theme?.rowBackgroundColor, DEFAULT_THEME.rowBg)),
    rowText: resolveColor(config?.rowTextColor, resolveColor(theme?.rowTextColor, DEFAULT_THEME.rowText)),
    rowBold: resolveBoolean(config?.rowBold, resolveBoolean(theme?.rowBold, DEFAULT_THEME.rowBold)),
    rowItalic: resolveBoolean(config?.rowItalic, resolveBoolean(theme?.rowItalic, DEFAULT_THEME.rowItalic)),

    alternateRowBg:
      config?.alternateRowBackgroundColor ?? theme?.alternateRowBackgroundColor ?? DEFAULT_THEME.alternateRowBg,

    borderColor: resolveColor(config?.borderColor, resolveColor(theme?.borderColor, DEFAULT_THEME.borderColor)),
    borderWidth: resolveNumber(config?.borderWidth, resolveNumber(theme?.borderWidth, DEFAULT_THEME.borderWidth)),
    borderRadius: resolveNumber(config?.borderRadius, resolveNumber(theme?.borderRadius, DEFAULT_THEME.borderRadius)),
    cellPadding: resolveNumber(config?.cellPadding, resolveNumber(theme?.cellPadding, DEFAULT_THEME.cellPadding)),
    cellPaddingY: config?.cellPaddingY ?? theme?.cellPaddingY,
    fontSize: resolveNumber(config?.fontSize, resolveNumber(theme?.fontSize, DEFAULT_THEME.fontSize)),
    rowFontSize: config?.rowFontSize ?? theme?.rowFontSize,
    tableWidth: config?.tableWidth ?? theme?.tableWidth ?? DEFAULT_THEME.tableWidth,

    // Espaçamentos
    groupHeaderMarginBottom:
      config?.groupHeaderMarginBottom ?? theme?.groupHeaderMarginBottom ?? DEFAULT_THEME.groupHeaderMarginBottom,
    groupHeaderPaddingY: config?.groupHeaderPaddingY ?? theme?.groupHeaderPaddingY ?? DEFAULT_THEME.groupHeaderPaddingY,
    headerMarginBottom: config?.headerMarginBottom ?? theme?.headerMarginBottom ?? DEFAULT_THEME.headerMarginBottom,
    headerPaddingY: config?.headerPaddingY ?? theme?.headerPaddingY ?? DEFAULT_THEME.headerPaddingY,
    cellSpacingX: config?.cellSpacingX ?? theme?.cellSpacingX ?? DEFAULT_THEME.cellSpacingX,
    cellSpacingY: config?.cellSpacingY ?? theme?.cellSpacingY ?? DEFAULT_THEME.cellSpacingY,

    enableAlternateRows:
      config?.enableAlternateRows ??
      (theme?.alternateRowBackgroundColor !== undefined || DEFAULT_THEME.enableAlternateRows),
  };
}

// ============================================
// Style Resolution
// ============================================

export function getColumnStyle(column: ColumnDefinition, resolvedTheme: ResolvedTheme): ColumnStyleResolved {
  return {
    backgroundColor: column.style?.backgroundColor ?? resolvedTheme.headerBg,
    textColor: column.style?.textColor ?? column.color ?? resolvedTheme.headerText,
    bold: column.style?.bold ?? column.bold ?? resolvedTheme.headerBold,
    italic: column.style?.italic ?? column.italic ?? resolvedTheme.headerItalic,
    align: column.align ?? column.style?.align ?? 'center',
  };
}

export function getRowStyle(row: RowData, rowIndex: number, resolvedTheme: ResolvedTheme): RowStyleResolved {
  const isAlternate = resolvedTheme.enableAlternateRows && rowIndex % 2 === 1;
  const alternateBg = resolvedTheme.alternateRowBg ?? resolvedTheme.rowBg;

  return {
    backgroundColor: row.style?.backgroundColor ?? (isAlternate ? alternateBg : resolvedTheme.rowBg),
    textColor: row.style?.textColor ?? resolvedTheme.rowText,
    bold: row.style?.bold ?? resolvedTheme.rowBold,
    italic: row.style?.italic ?? resolvedTheme.rowItalic,
  };
}

export function getCellStyle(
  column: ColumnDefinition,
  row: RowData,
  rowIndex: number,
  resolvedTheme: ResolvedTheme,
): CellStyleResolved {
  const rowStyle = getRowStyle(row, rowIndex, resolvedTheme);

  return {
    backgroundColor: rowStyle.backgroundColor,
    textColor: rowStyle.textColor,
    bold: rowStyle.bold,
    italic: rowStyle.italic,
    align: column.align ?? column.style?.align ?? 'center',
  };
}

// ============================================
// Width Calculation
// ============================================

export function getEffectiveColumnWidth(column: ColumnDefinition, totalColumns: number): string | number {
  if (column.width) {
    return column.width;
  }
  return `${100 / totalColumns}%`;
}

export function getColumnKeyToIndex(columns: ColumnDefinition[]): Record<string, number> {
  const map: Record<string, number> = {};
  columns.forEach((col, index) => {
    map[col.key] = index;
  });
  return map;
}
