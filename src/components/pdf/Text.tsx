import { StyleSheet, Text as PdfText } from '@react-pdf/renderer';
import React from 'react';

interface TextTheme {
  textPrimary?: string;
}

interface TextConfig {
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;
  align?: 'left' | 'right' | 'center' | 'justify';
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

interface TextProps {
  content: string;
  config?: TextConfig;
  theme?: TextTheme;
}

const styles = StyleSheet.create({
  text: {},
});

export default function Text({ content, config, theme }: TextProps) {
  const textColor = config?.color ?? theme?.textPrimary ?? '#4A4A4A';
  const fontSize = config?.fontSize ?? 8;
  const fontWeight = config?.fontWeight ?? 'normal';
  const textAlign = config?.align ?? 'left';

  const textStyle = [
    styles.text,
    { fontSize, fontWeight, color: textColor, textAlign },
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
  ];

  return <PdfText style={textStyle}>{content}</PdfText>;
}
