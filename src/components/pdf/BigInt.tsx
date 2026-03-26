import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface BigIntTheme {
  primaryColor?: string;
  textSecondary?: string;
}

interface BigIntConfig {
  labelPosition?: 'before' | 'after';
  primaryColor?: string;
  fontSize?: number;
  labelFontSize?: number;
  labelColor?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

interface BigIntProps {
  value: string;
  label?: string;
  config?: BigIntConfig;
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

export default function BigInt({ value, label, config, theme }: BigIntProps) {
  const labelPosition = config?.labelPosition ?? 'after';
  const valueColor = config?.primaryColor ?? theme?.primaryColor ?? '#fccd42';
  const labelColor = config?.labelColor ?? theme?.textSecondary ?? '#4A4A4A';
  const resolvedFontSize = config?.fontSize ?? 30;
  const labelFontSize = config?.labelFontSize ?? 10;

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
  ];

  if (!label) {
    return (
      <View style={containerStyle}>
        <Text style={[styles.value, { color: valueColor, fontSize: resolvedFontSize }]}>{value}</Text>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {labelPosition === 'before' && (
        <Text style={[styles.label, styles.labelBefore, { color: labelColor, fontSize: labelFontSize }]}>{label}</Text>
      )}
      <Text style={[styles.value, { color: valueColor, fontSize: resolvedFontSize }]}>{value}</Text>
      {labelPosition === 'after' && (
        <Text style={[styles.label, styles.labelAfter, { color: labelColor, fontSize: labelFontSize }]}>{label}</Text>
      )}
    </View>
  );
}
