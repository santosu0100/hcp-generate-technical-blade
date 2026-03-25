import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import type { TableProps } from './types';
import { resolveVariantTheme } from './defaults';
import type { TableVariant } from './defaults';
import TableGroupHeader from './TableGroupHeader';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function Table({ columns, items, groups, config, theme, variant = 'default' }: TableProps) {
  const resolvedTheme = resolveVariantTheme(variant as TableVariant, config, theme);
  const hasGroups = groups && groups.length > 0;

  const styles = StyleSheet.create({
    table: {
      width: resolvedTheme.tableWidth,
    },
  });

  return (
    <View style={styles.table}>
      {hasGroups && groups && <TableGroupHeader groups={groups} columns={columns} theme={resolvedTheme} />}
      <TableHeader columns={columns} theme={resolvedTheme} />
      {items.map((row, rowIndex) => (
        <TableRow key={rowIndex} row={row} rowIndex={rowIndex} columns={columns} theme={resolvedTheme} />
      ))}
    </View>
  );
}
