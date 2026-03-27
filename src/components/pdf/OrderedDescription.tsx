import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import Link from './Link';

interface LinkData {
  label: string;
  href: string;
}

interface OrderedDescriptionItem {
  title: string;
  description: string;
  links?: LinkData[];
}

interface OrderedDescriptionTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  lineColor?: string;
  numberColor?: string;
}

interface OrderedDescriptionConfig {
  circleColor?: string;
  circleBackgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  lineColor?: string;
  linkColor?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberFontSize?: number;
  numberColor?: string;
  markerGap?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number | string;
}

interface OrderedDescriptionProps {
  items: OrderedDescriptionItem[];
  config?: OrderedDescriptionConfig;
  theme?: OrderedDescriptionTheme;
}

const CIRCLE_SIZE = 12;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  numberColumn: {
    width: CIRCLE_SIZE,
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleNumber: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#000000',
  },
  line: {
    width: 1,
    flex: 1,
  },
  contentColumn: {
    flex: 1,
    paddingLeft: 6,
    paddingBottom: 6,
  },
  lastContentColumn: {
    flex: 1,
    paddingLeft: 6,
    paddingBottom: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: CIRCLE_SIZE,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  description: {
    fontSize: 8,
    lineHeight: 1.3,
    marginTop: 2,
  },
});

export default function OrderedDescription({ items, config, theme }: OrderedDescriptionProps) {
  const circleBackgroundColor =
    config?.circleBackgroundColor ?? config?.circleColor ?? theme?.primaryColor ?? '#FFCC00';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const lineColor = config?.lineColor ?? theme?.lineColor ?? '#E2E8F0';
  const titleFontSize = config?.titleFontSize ?? 8;
  const descriptionFontSize = config?.descriptionFontSize ?? 8;
  const numberFontSize = config?.numberFontSize ?? 7;
  const numberColor = config?.numberColor ?? theme?.numberColor ?? '#000000';
  const markerGap = config?.markerGap ?? 6;

  // Dynamic circle size based on number font size
  const circleSize = Math.max(12, numberFontSize + 5);

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
    config?.width !== undefined ? { width: config.width } : {},
    config?.height !== undefined ? { height: config.height } : {},
  ];

  return (
    <View style={containerStyle}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.itemContainer}>
            <View style={[styles.numberColumn, { width: circleSize }]}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: circleBackgroundColor,
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                  },
                ]}>
                <Text style={[styles.circleNumber, { fontSize: numberFontSize, color: numberColor }]}>{index + 1}</Text>
              </View>
              {!isLast && <View style={[styles.line, { backgroundColor: lineColor }]} />}
            </View>
            <View style={[isLast ? styles.lastContentColumn : styles.contentColumn, { paddingLeft: markerGap }]}>
              <View style={[styles.titleRow, { height: circleSize }]}>
                <Text style={[styles.title, { color: titleColor, fontSize: titleFontSize }]}>{item.title}</Text>
              </View>
              <Text style={[styles.description, { color: descriptionColor, fontSize: descriptionFontSize }]}>
                {item.description}
                {item.links && item.links.length > 0 && (
                  <>
                    {' '}
                    {item.links.map((link, linkIndex) => (
                      <React.Fragment key={linkIndex}>
                        {linkIndex > 0 && ' '}
                        <Link label={link.label} href={link.href} color={config?.linkColor} />
                      </React.Fragment>
                    ))}
                  </>
                )}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
