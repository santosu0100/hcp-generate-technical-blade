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
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  theme?: LabelValueTheme;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
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

export default function LabelValue({ label, value, variant = 'default', textAlign = 'left', theme }: LabelValueProps) {
  const isDefaultVariant = variant === 'default';
  const labelColor = theme?.textPrimary ?? DEFAULT_LABEL_COLOR;
  const valueColor = isDefaultVariant ? DEFAULT_LABEL_COLOR : theme?.textSecondary ?? DEFAULT_VALUE_COLOR;
  const isLabelBold = variant === 'bolder-label' || variant === 'bolder-both';
  const isValueBold = variant === 'bolder-value' || variant === 'bolder-both';

  const containerAlign = textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start';

  return (
    <View style={[styles.container, { alignItems: containerAlign }]}>
      <Text style={[styles.label, { color: labelColor, textAlign, fontSize: 10 }, isLabelBold ? styles.labelBold : {}]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor, textAlign, fontSize: 10 }, isValueBold ? styles.valueBold : {}]}>{value}</Text>
    </View>
  );
}
