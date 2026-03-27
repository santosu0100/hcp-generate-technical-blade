import { StyleSheet, Text } from '@react-pdf/renderer';
import React from 'react';

interface TextTheme {
  primaryColor?: string;
  textSecondary?: string;
  textPrimary?: string;
}

interface TextConfig {
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'semibold';
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number | string;
}

interface TextProps {
  content: string;
  config?: TextConfig;
  theme?: TextTheme;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 8,
    lineHeight: 1.4,
  },
});

export default function TextComponent({ content, config, theme }: TextProps) {
  const color = config?.color ?? theme?.textSecondary ?? '#71717A';
  const fontSize = config?.fontSize ?? 8;
  const fontWeight = config?.fontWeight ?? 'normal';
  const textAlign = config?.textAlign ?? 'left';

  const textStyle = [
    styles.text,
    { color, fontSize, fontWeight, textAlign },
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
    config?.width !== undefined ? { width: config.width } : {},
    config?.height !== undefined ? { height: config.height } : {},
  ];

  return <Text style={textStyle}>{content}</Text>;
}
