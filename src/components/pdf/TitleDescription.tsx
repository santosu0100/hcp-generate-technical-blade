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
}

interface TitleDescriptionProps {
  title: string;
  description: string;
  links?: LinkData[];
  config?: TitleDescriptionConfig;
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

export default function TitleDescription({ title, description, links, config, theme }: TitleDescriptionProps) {
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const linkColor = config?.linkColor ?? theme?.primaryColor ?? '#4338CA';

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </View>
      <Text style={[styles.description, { color: descriptionColor }]}>
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
