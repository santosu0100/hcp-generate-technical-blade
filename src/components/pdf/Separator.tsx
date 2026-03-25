import { StyleSheet, View } from '@react-pdf/renderer';
import React from 'react';

interface SeparatorProps {
  spacing?: number;
}

const styles = StyleSheet.create({
  separator: {
    width: '100%',
  },
});

export default function Separator({ spacing = 12 }: SeparatorProps) {
  return <View style={[styles.separator, { height: spacing }]} />;
}
