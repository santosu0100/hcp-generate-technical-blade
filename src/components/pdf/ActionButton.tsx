import { Link, StyleSheet, Text } from '@react-pdf/renderer';
import React from 'react';

interface ActionButtonTheme {
  primaryColor?: string;
  textPrimary?: string;
}

interface ActionButtonProps {
  label: string;
  href: string;
  primaryColor?: string;
  theme?: ActionButtonTheme;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
    textDecoration: 'none',
  },
  text: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function ActionButton({ label, href, primaryColor, theme }: ActionButtonProps) {
  const backgroundColor = primaryColor ?? theme?.primaryColor ?? '#FFCC00';
  const textColor = theme?.textPrimary ?? '#212121';

  return (
    <Link src={href} style={[styles.button, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </Link>
  );
}
