import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';
import { ComponentTheme } from '../../types/pdf-components.types';

interface SectionProps {
  title: string;
  titleColor?: string;
  theme?: ComponentTheme;
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
});

export default function Section({ title, titleColor, theme, children }: SectionProps) {
  const resolvedTitleColor = titleColor ?? theme?.titleColor ?? '#212121';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: resolvedTitleColor }]}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
