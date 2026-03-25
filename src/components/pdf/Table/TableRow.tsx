import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ColumnDefinition, RowData, ResolvedTheme } from './types';
import { getCellStyle, getEffectiveColumnWidth } from './utils';

interface TableRowProps {
  row: RowData;
  rowIndex: number;
  columns: ColumnDefinition[];
  theme: ResolvedTheme;
}

export default function TableRow({ row, rowIndex, columns, theme }: TableRowProps) {
  const styles = StyleSheet.create({
    dataRow: {
      flexDirection: 'row',
    },
    dataCell: {
      marginHorizontal: theme.cellSpacingX,
      marginBottom: theme.cellSpacingY,
    },
  });

  // Usa cellPaddingY se definido, senão usa cellPadding
  const paddingY = theme.cellPaddingY ?? theme.cellPadding;
  // Usa rowFontSize se definido, senão usa fontSize
  const rowFontSize = theme.rowFontSize ?? theme.fontSize;

  return (
    <View style={styles.dataRow}>
      {columns.map((column) => {
        const cellStyle = getCellStyle(column, row, rowIndex, theme);
        const width = getEffectiveColumnWidth(column, columns.length);
        const cellValue = row.cells[column.key] ?? '';

        return (
          <View
            key={column.key}
            style={[
              styles.dataCell,
              {
                width: typeof width === 'number' ? width : `${100 / columns.length}%`,
                paddingTop: paddingY,
                paddingBottom: paddingY,
                paddingLeft: theme.cellPadding,
                paddingRight: theme.cellPadding,
                justifyContent: 'center',
                alignItems: cellStyle.align === 'left' ? 'flex-start' : cellStyle.align === 'right' ? 'flex-end' : 'center',
                backgroundColor: cellStyle.backgroundColor,
                borderRadius: theme.borderRadius,
              },
            ]}
          >
            <Text
              style={{
                fontSize: rowFontSize,
                fontWeight: cellStyle.bold ? 'bold' : 'normal',
                fontStyle: cellStyle.italic ? 'italic' : 'normal',
                color: cellStyle.textColor,
              }}
            >
              {cellValue}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
