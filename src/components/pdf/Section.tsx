import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';
import type { ComponentThemeConfig } from '@/utils/themes';

interface SectionProps {
  title: string;
  titleColor?: string;
  theme?: ComponentThemeConfig;
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
  equalWidth?: boolean;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number | string;
  children?: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
  },
});

export default function Section({
  title,
  titleColor,
  theme,
  layout = 'column',
  itemsPerRow,
  gapX = 0,
  gapY = 0,
  equalWidth = false,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  width,
  height,
  children,
}: SectionProps) {
  const resolvedTitleColor = titleColor ?? theme?.titleColor ?? '#212121';
  const isRow = layout === 'row';
  const effectiveGapX = gapX ?? 8;
  const effectiveGapY = gapY ?? 8;

  // Calculate width considering gaps when in row layout and equalWidth is true
  let calculatedWidth: string | number = '100%';
  if (isRow && equalWidth && itemsPerRow) {
    const gapCount = itemsPerRow - 1;
    const gapSpace = gapCount * effectiveGapX;
    const availableWidth = 100 - (gapSpace > 0 ? (gapSpace / 400) * 100 : 0);
    calculatedWidth = `${Math.max(0, availableWidth / itemsPerRow)}%`;
  }

  const containerStyle = {
    ...styles.container,
    ...(marginTop !== undefined && { marginTop }),
    ...(marginBottom !== undefined && { marginBottom }),
    ...(marginLeft !== undefined && { marginLeft }),
    ...(marginRight !== undefined && { marginRight }),
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
  };

  const contentStyle = [styles.content, isRow ? styles.row : styles.column];

  const getChildStyle = (index: number) => {
    const isLastInRow = isRow && itemsPerRow && (index + 1) % itemsPerRow === 0;

    // When equalWidth is false, let children use their natural content size
    if (isRow && !equalWidth) {
      return {
        alignSelf: 'flex-start' as const,
        marginBottom: effectiveGapY,
        marginRight: isLastInRow ? 0 : effectiveGapX,
      };
    }

    return {
      width: calculatedWidth,
      marginBottom: isRow ? effectiveGapY : 0,
      marginRight: isRow && !isLastInRow ? effectiveGapX : 0,
    };
  };

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, { color: resolvedTitleColor }]}>{title}</Text>
      <View style={contentStyle}>
        {React.Children.map(children, (child, index) => (
          <View style={getChildStyle(index)}>{child}</View>
        ))}
      </View>
    </View>
  );
}
