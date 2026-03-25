import { StyleSheet, Text as PdfText } from '@react-pdf/renderer';
import React from 'react';

interface TextTheme {
  textPrimary?: string;
}

interface TextProps {
  content: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  color?: string;
  align?: 'left' | 'right' | 'center' | 'justify';
  theme?: TextTheme;
}

const styles = StyleSheet.create({
  text: {},
});

export default function Text({
  content,
  fontSize = 8,
  fontWeight = 'normal',
  color,
  align = 'left',
  theme,
}: TextProps) {
  const textColor = color ?? theme?.textPrimary ?? '#4A4A4A';

  return (
    <PdfText style={[styles.text, { fontSize, fontWeight, color: textColor, textAlign: align }]}>{content}</PdfText>
  );
}
