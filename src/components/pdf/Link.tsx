import { Link as PdfLink } from '@react-pdf/renderer';
import React from 'react';

interface LinkTheme {
  primaryColor?: string;
}

interface LinkProps {
  label: string;
  href: string;
  color?: string;
  theme?: LinkTheme;
}

export default function Link({ label, href, color, theme }: LinkProps) {
  const linkColor = color ?? theme?.primaryColor ?? '#4338CA';

  return (
    <PdfLink src={href} style={{ textDecoration: 'none', color: linkColor, fontSize: 8 }}>
      [{label}]
    </PdfLink>
  );
}
