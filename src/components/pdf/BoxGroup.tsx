import { StyleSheet, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';

interface BoxGroupProps {
  children?: ReactNode;
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
  },
});

export default function BoxGroup({
  children,
  layout = 'column',
  itemsPerRow,
  gapX = 0,
  gapY = 0,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}: BoxGroupProps) {
  const isRow = layout === 'row';
  const effectiveGapX = gapX ?? 0;
  const effectiveGapY = gapY ?? 0;

  // Calculate width considering gaps when in row layout
  let calculatedWidth: string | number = '100%';
  if (isRow && itemsPerRow) {
    const gapCount = itemsPerRow - 1;
    const gapSpace = gapCount * effectiveGapX;
    const availableWidth = 100 - (gapSpace > 0 ? (gapSpace / 400) * 100 : 0);
    calculatedWidth = `${Math.max(0, availableWidth / itemsPerRow)}%`;
  }

  const containerStyle = {
    ...(isRow ? styles.row : styles.column),
    ...(marginTop !== undefined && { marginTop }),
    ...(marginBottom !== undefined && { marginBottom }),
    ...(marginLeft !== undefined && { marginLeft }),
    ...(marginRight !== undefined && { marginRight }),
  };

  const getChildStyle = (index: number) => {
    const isLastInRow = isRow && itemsPerRow && (index + 1) % itemsPerRow === 0;

    return {
      width: calculatedWidth,
      marginBottom: isRow ? effectiveGapY : 0,
      marginRight: isRow && !isLastInRow ? effectiveGapX : 0,
    };
  };

  return (
    <View style={containerStyle}>
      {React.Children.map(children, (child, index) => (
        <View style={getChildStyle(index)}>{child}</View>
      ))}
    </View>
  );
}
