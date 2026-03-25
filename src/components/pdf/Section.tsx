import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';
import { ComponentTheme } from './render/types';

interface SectionProps {
  title: string;
  titleColor?: string;
  theme?: ComponentTheme;
  layout?: 'row' | 'column';
  itemsPerRow?: number;
  gapX?: number;
  gapY?: number;
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
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
  },
});

export default function Section({ title, titleColor, theme, layout = 'column', itemsPerRow, gapX, gapY, children }: SectionProps) {
  const resolvedTitleColor = titleColor ?? theme?.titleColor ?? '#212121';
  const isRow = layout === 'row';
  const calculatedWidth = isRow && itemsPerRow ? `${100 / itemsPerRow}%` : '100%';

  const contentStyle = [
    styles.content,
    isRow ? styles.row : styles.column,
    { 
      rowGap: gapY ?? 8, 
      columnGap: gapX ?? 8,
      gap: isRow ? (gapX ?? 8) : (gapY ?? 8)
    },
  ] as any;

  const childStyle = {
    width: calculatedWidth,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: resolvedTitleColor }]}>{title}</Text>
      <View style={contentStyle}>
        {React.Children.map(children, child => (
          <View style={childStyle}>{child}</View>
        ))}
      </View>
    </View>
  );
}
