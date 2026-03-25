import { StyleSheet, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';

interface BoxGroupProps {
  children?: ReactNode;
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
  },
});

export default function BoxGroup({ children, layout = 'column', itemsPerRow, gapX = 0, gapY = 0 }: BoxGroupProps) {
  const isRow = layout === 'row';
  const childCount = React.Children.count(children);
  const calculatedWidth = isRow && itemsPerRow ? `${100 / itemsPerRow}%` : '100%';

  const containerStyle = {
    ...(isRow ? styles.row : styles.column),
    rowGap: gapY,
    columnGap: gapX,
    gap: isRow ? gapX : gapY,
  };

  const childStyle = {
    width: calculatedWidth,
  };

  return (
    <View style={containerStyle}>
      {React.Children.map(children, child => (
        <View style={childStyle}>{child}</View>
      ))}
    </View>
  );
}
