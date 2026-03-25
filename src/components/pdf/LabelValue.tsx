import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface LabelValueTheme {
  textPrimary?: string;
  textSecondary?: string;
}

interface LabelValueProps {
  label: string;
  value: string;
  variant?: 'default' | 'bolder-label' | 'bolder-value' | 'bolder-both';
  theme?: LabelValueTheme;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 10,
    lineHeight: 1,
  },
  labelBold: {
    fontWeight: 'bold',
  },
  value: {
    fontSize: 10,
    marginTop: 1,
    lineHeight: 1,
  },
  valueBold: {
    fontWeight: 'bold',
  },
});

// Default colors
const DEFAULT_LABEL_COLOR = '#4A4A4A';
const DEFAULT_VALUE_COLOR = '#212121';

export default function LabelValue({ label, value, variant = 'default', theme }: LabelValueProps) {
  const isDefaultVariant = variant === 'default';
  const labelColor = theme?.textPrimary ?? DEFAULT_LABEL_COLOR;
  const valueColor = isDefaultVariant ? DEFAULT_LABEL_COLOR : theme?.textSecondary ?? DEFAULT_VALUE_COLOR;
  const isLabelBold = variant === 'bolder-label' || variant === 'bolder-both';
  const isValueBold = variant === 'bolder-value' || variant === 'bolder-both';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }, isLabelBold && styles.labelBold]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }, isValueBold && styles.valueBold]}>{value}</Text>
    </View>
  );
}
