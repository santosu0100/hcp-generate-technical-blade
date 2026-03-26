import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface LabelValueTheme {
  textPrimary?: string;
  textSecondary?: string;
}

interface LabelValueConfig {
  variant?: 'default' | 'bolder-label' | 'bolder-value' | 'bolder-both';
  labelColor?: string;
  valueColor?: string;
  labelFontSize?: number;
  valueFontSize?: number;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

interface LabelValueProps {
  label: string;
  value: string;
  config?: LabelValueConfig;
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

const DEFAULT_LABEL_COLOR = '#4A4A4A';
const DEFAULT_VALUE_COLOR = '#212121';

export default function LabelValue({ label, value, config, theme }: LabelValueProps) {
  const variant = config?.variant ?? 'default';
  const isDefaultVariant = variant === 'default';
  const labelColor = config?.labelColor ?? theme?.textPrimary ?? DEFAULT_LABEL_COLOR;
  const valueColor = isDefaultVariant ? DEFAULT_LABEL_COLOR : config?.valueColor ?? theme?.textSecondary ?? DEFAULT_VALUE_COLOR;
  const isLabelBold = variant === 'bolder-label' || variant === 'bolder-both';
  const isValueBold = variant === 'bolder-value' || variant === 'bolder-both';
  const labelFontSize = config?.labelFontSize ?? 10;
  const valueFontSize = config?.valueFontSize ?? 10;
  const textAlign = config?.textAlign ?? 'left';

  const containerAlign: 'center' | 'flex-end' | 'flex-start' = textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start';

  const containerStyle = [
    styles.container,
    { alignItems: containerAlign },
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
  ];

  return (
    <View style={containerStyle}>
      <Text style={[styles.label, { color: labelColor, textAlign, fontSize: labelFontSize }, isLabelBold ? styles.labelBold : {}]}>
        {label}
      </Text>
      <Text style={[styles.value, { color: valueColor, textAlign, fontSize: valueFontSize }, isValueBold ? styles.valueBold : {}]}>
        {value}
      </Text>
    </View>
  );
}
