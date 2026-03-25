import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ColumnDefinition, ResolvedTheme } from './types';
import { getColumnStyle, getEffectiveColumnWidth } from './utils';

interface TableHeaderProps {
  columns: ColumnDefinition[];
  theme: ResolvedTheme;
}

export default function TableHeader({ columns, theme }: TableHeaderProps) {
  const styles = StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      marginBottom: theme.headerMarginBottom,
    },
    headerCell: {
      marginHorizontal: theme.cellSpacingX,
    },
  });

  return (
    <View style={styles.headerRow}>
      {columns.map((column) => {
        const colStyle = getColumnStyle(column, theme);
        const width = getEffectiveColumnWidth(column, columns.length);

        return (
          <View
            key={column.key}
            style={[
              styles.headerCell,
              {
                width: typeof width === 'number' ? width : `${100 / columns.length}%`,
                paddingTop: theme.headerPaddingY,
                paddingBottom: theme.headerPaddingY,
                paddingLeft: theme.cellPadding,
                paddingRight: theme.cellPadding,
                justifyContent: 'center',
                alignItems: colStyle.align === 'left' ? 'flex-start' : colStyle.align === 'right' ? 'flex-end' : 'center',
                backgroundColor: colStyle.backgroundColor,
                borderRadius: theme.borderRadius,
              },
            ]}
          >
            <Text
              style={{
                fontSize: theme.fontSize,
                fontWeight: colStyle.bold ? 'bold' : 'normal',
                fontStyle: colStyle.italic ? 'italic' : 'normal',
                color: colStyle.textColor,
              }}
            >
              {column.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
