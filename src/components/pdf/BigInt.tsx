import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface BigIntTheme {
  primaryColor?: string;
  textSecondary?: string;
}

interface BigIntProps {
  value: string;
  label?: string;
  labelPosition?: 'before' | 'after';
  primaryColor?: string;
  fontSize?: number;
  theme?: BigIntTheme;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 30,
    fontWeight: 'semibold',
    textAlign: 'left',
    lineHeight: 1,
  },
  label: {
    fontSize: 10,
    textAlign: 'left',
    lineHeight: 1,
  },
  labelBefore: {
    marginBottom: 4,
  },
  labelAfter: {
    marginTop: 4,
  },
  labelInline: {
    marginLeft: 2,
  },
});

export default function BigInt({ value, label, labelPosition = 'after', primaryColor, fontSize, theme }: BigIntProps) {
  const valueColor = primaryColor ?? theme?.primaryColor ?? '#fccd42';
  const labelColor = theme?.textSecondary ?? '#4A4A4A';
  const resolvedFontSize = fontSize ?? 30;

  if (!label) {
    return (
      <View style={styles.container}>
        <Text style={[styles.value, { color: valueColor, fontSize: resolvedFontSize }]}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {labelPosition === 'before' && (
        <Text style={[styles.label, styles.labelBefore, { color: labelColor }]}>{label}</Text>
      )}
      <Text style={[styles.value, { color: valueColor, fontSize: resolvedFontSize }]}>{value}</Text>
      {labelPosition === 'after' && (
        <Text style={[styles.label, styles.labelAfter, { color: labelColor }]}>{label}</Text>
      )}
    </View>
  );
}
