import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import Link from './Link';

interface LinkData {
  label: string;
  href: string;
}

interface TimelineItem {
  title: string;
  description: string;
  links?: LinkData[];
}

interface OrderedDescriptionTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  lineColor?: string;
}

interface OrderedDescriptionConfig {
  circleColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  lineColor?: string;
  linkColor?: string;
}

interface OrderedDescriptionProps {
  items: TimelineItem[];
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
  const circleColor = config?.circleColor ?? theme?.primaryColor ?? '#FFCC00';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const lineColor = config?.lineColor ?? theme?.lineColor ?? '#E2E8F0';

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.numberColumn}>
              <View style={[styles.circle, { backgroundColor: circleColor }]}>
                <Text style={styles.circleNumber}>{index + 1}</Text>
              </View>
              {!isLast && <View style={[styles.line, { backgroundColor: lineColor }]} />}
            </View>
            <View style={isLast ? styles.lastContentColumn : styles.contentColumn}>
              <View style={styles.titleRow}>
                <Text style={[styles.title, { color: titleColor }]}>{item.title}</Text>
              </View>
              <Text style={[styles.description, { color: descriptionColor }]}>
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
