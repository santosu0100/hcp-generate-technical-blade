import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';
import Link from './Link';
import type {
  TitleDescriptionData,
  TitleDescriptionConfig,
  ComponentTheme,
} from '../../types/components.dto';

// ============================================
// Types
// ============================================

interface TitleDescriptionProps {
  data?: TitleDescriptionData;
  config?: TitleDescriptionConfig;
  theme?: ComponentTheme;
  children?: ReactNode;
}

// ============================================
// Constants
// ============================================

const BULLET_SIZE = 2;

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    fontSize: 8,
    lineHeight: 1.3,
  },
  listContainer: {
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: 2,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletContainer: {
    paddingTop: 2,
    marginRight: 2,
  },
  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    borderRadius: BULLET_SIZE / 2,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 8,
    lineHeight: 1.4,
  },
  colon: {
    fontSize: 8,
    lineHeight: 1.4,
  },
  value: {
    fontSize: 7,
    lineHeight: 1.4,
  },
  childrenContainer: {
    marginTop: 4,
  },
});

// ============================================
// Component
// ============================================

export default function TitleDescription({ data, config, theme, children }: TitleDescriptionProps) {
  if (!data) return null;

  const { title, description, links, items } = data;

  // Title defaults
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const titleFontSize = config?.titleFontSize ?? 8;

  // Description defaults
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const descriptionFontSize = config?.descriptionFontSize ?? 8;

  // Link defaults
  const linkColor = config?.linkColor ?? theme?.primaryColor ?? '#4338CA';

  // Bullet defaults
  const bulletColor = config?.bulletColor ?? theme?.primaryColor ?? '#71717A';
  const labelColor = config?.labelColor ?? theme?.textPrimary ?? '#4D4D4D';
  const valueColor = config?.valueColor ?? theme?.textSecondary ?? '#71717A';
  const bulletFontSize = config?.bulletFontSize ?? 8;

  // Layout defaults
  const textAlign = config?.textAlign ?? 'left';
  const gap = config?.gap ?? 4;
  const markerGap = config?.markerGap ?? 3;

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
    config?.width !== undefined ? { width: config.width } : {},
    config?.height !== undefined ? { height: config.height } : {},
  ];

  const hasItems = items && items.length > 0;
  const hasChildren = children !== undefined && children !== null;

  return (
    <View style={containerStyle}>
      {/* Title */}
      <Text style={[styles.title, { color: titleColor, textAlign, fontSize: titleFontSize }]}>{title}</Text>

      {/* Description (optional) */}
      {description && (
        <Text
          style={[
            styles.description,
            { color: descriptionColor, textAlign, fontSize: descriptionFontSize, marginBottom: hasItems ? gap : 0 },
          ]}>
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
      )}

      {/* Bullet List (optional) */}
      {hasItems && (
        <View style={styles.listContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={[styles.bulletContainer, { width: BULLET_SIZE + 4 + markerGap }]}>
                <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
              </View>
              <View style={styles.content}>
                <Text style={[styles.label, { color: labelColor, fontSize: bulletFontSize }]}>{item.label}</Text>
                <Text style={[styles.colon, { color: labelColor, fontSize: bulletFontSize }]}>: </Text>
                <Text style={[styles.value, { color: valueColor, fontSize: bulletFontSize }]}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Children (optional) */}
      {hasChildren && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
}

