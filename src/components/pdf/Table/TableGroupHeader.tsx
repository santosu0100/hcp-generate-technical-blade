import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { ColumnGroup, ColumnDefinition, ResolvedTheme } from './types';
import { getColumnKeyToIndex } from './utils';

interface TableGroupHeaderProps {
  groups: ColumnGroup[];
  columns: ColumnDefinition[];
  theme: ResolvedTheme;
}

export default function TableGroupHeader({ groups, columns, theme }: TableGroupHeaderProps) {
  const columnKeyToIndex = getColumnKeyToIndex(columns);

  const styles = StyleSheet.create({
    groupHeaderRow: {
      flexDirection: 'row',
    },
    groupHeaderCell: {
      marginHorizontal: 2,
      marginBottom: 2,
    },
  });

  // Check if this is a single group spanning all columns (like "IMPOSTO DE RENDA")
  const isSingleFullWidthGroup = groups.length === 1 && groups[0].columns.length === columns.length;

  return (
    <View style={styles.groupHeaderRow}>
      {groups.map((group, groupIndex) => {
        const startIdx = Math.min(...group.columns.map(key => columnKeyToIndex[key] ?? 0));
        const endIdx = Math.max(...group.columns.map(key => columnKeyToIndex[key] ?? 0));

        const bgColor = group.backgroundColor ?? theme.groupHeaderBg;
        const textColor = group.textColor ?? theme.groupHeaderText;
        const bold = group.bold ?? theme.groupHeaderBold;
        const italic = group.italic ?? theme.groupHeaderItalic;

        // Calculate width: 100% if single full-width group, otherwise based on column span
        const width = isSingleFullWidthGroup
          ? '100%'
          : `${((endIdx - startIdx + 1) / columns.length) * 100}%`;

        return (
          <View
            key={groupIndex}
            style={[
              styles.groupHeaderCell,
              {
                width: width,
                paddingTop: theme.groupHeaderPaddingY,
                paddingBottom: theme.groupHeaderPaddingY,
                paddingLeft: theme.cellPadding,
                paddingRight: theme.cellPadding,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor,
                borderRadius: theme.borderRadius,
              },
            ]}
          >
            <Text
              style={{
                fontSize: theme.fontSize,
                fontWeight: bold ? 'bold' : 'normal',
                fontStyle: italic ? 'italic' : 'normal',
                color: textColor,
              }}
            >
              {group.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
