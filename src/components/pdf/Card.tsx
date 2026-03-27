import { StyleSheet, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';

interface CardTheme {
  borderColor?: string;
}

interface CardProps {
  children?: ReactNode;
  theme?: CardTheme;
  width?: number | string;
  height?: number | string;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 16,
    paddingLeft: 6,
    paddingRight: 12,
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 1,
    marginTop: 1,
  },
});

export default function Card({ children, theme, width, height }: CardProps) {
  const borderColor = theme?.borderColor ?? '#E2E8F0';

  return (
    <View
      style={[
        styles.container,
        { borderColor },
        width !== undefined ? { width } : {},
        height !== undefined ? { height } : {},
      ]}>
      {children}
    </View>
  );
}
