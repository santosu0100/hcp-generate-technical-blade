import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import Link from './Link';

interface LinkData {
  label: string;
  href: string;
}

interface TitleDescriptionTheme {
  textPrimary?: string;
  textSecondary?: string;
  primaryColor?: string;
}

interface TitleDescriptionConfig {
  titleColor?: string;
  descriptionColor?: string;
  linkColor?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

interface TitleDescriptionProps {
  title: string;
  description: string;
  links?: LinkData[];
  config?: TitleDescriptionConfig;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  theme?: TitleDescriptionTheme;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 8,
    lineHeight: 1,
  },
});

export default function TitleDescription({
  title,
  description,
  links,
  config,
  textAlign = 'left',
  theme,
}: TitleDescriptionProps) {
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const linkColor = config?.linkColor ?? theme?.primaryColor ?? '#4338CA';
  const titleFontSize = config?.titleFontSize ?? 8;
  const descriptionFontSize = config?.descriptionFontSize ?? 8;

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
  ];

  return (
    <View style={containerStyle}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: titleColor, textAlign, fontSize: titleFontSize }]}>{title}</Text>
      </View>
      <Text style={[styles.description, { color: descriptionColor, textAlign, fontSize: descriptionFontSize }]}>
        {description}
        {links && links.length > 0 && (
          <>
            {' '}
            {links.map((link, index) => (
              <React.Fragment key={index}>
                {index > 0 && ' '}
                <Link label={link.label} href={link.href} color={linkColor} />
              </React.Fragment>
            ))}
          </>
        )}
      </Text>
    </View>
  );
}
