import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

interface OrderedListItem {
  title: string;
  description: string;
}

interface OrderedListTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
}

interface OrderedListConfig {
  numberColor?: string;
  numberBackgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  titleFontSize?: number;
  descriptionFontSize?: number;
  numberFontSize?: number;
  markerGap?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  width?: number | string;
  height?: number | string;
}

interface OrderedListProps {
  items: OrderedListItem[];
  config?: OrderedListConfig;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  theme?: OrderedListTheme;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  numberColumn: {
    flexDirection: 'row',
  },
  number: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  colon: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 8,
    fontWeight: 'normal',
  },
});

export default function OrderedList({ items, config, textAlign = 'left', theme }: OrderedListProps) {
  const numberColor = config?.numberColor ?? theme?.primaryColor ?? '#FFCC00';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const titleFontSize = config?.titleFontSize ?? 8;
  const descriptionFontSize = config?.descriptionFontSize ?? 8;
  const numberFontSize = config?.numberFontSize ?? 10;
  const markerGap = config?.markerGap ?? 6;

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
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={[styles.numberColumn, { marginRight: markerGap }]}>
            <Text style={[styles.number, { color: numberColor, textAlign, fontSize: numberFontSize }]}>
              {index + 1}.
            </Text>
          </View>
          <Text style={styles.content}>
            <Text style={[styles.title, { color: titleColor, textAlign, fontSize: titleFontSize }]}>{item.title}</Text>
            <Text style={[styles.colon, { color: titleColor, textAlign, fontSize: titleFontSize }]}>: </Text>
            <Text style={[styles.description, { color: descriptionColor, textAlign, fontSize: descriptionFontSize }]}>
              {item.description}
            </Text>
          </Text>
        </View>
      ))}
    </View>
  );
}
