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
  titleColor?: string;
  descriptionColor?: string;
}

interface OrderedListProps {
  items: OrderedListItem[];
  config?: OrderedListConfig;
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
  content: {
    flex: 1,
  },
  number: {
    fontSize: 10,
    fontWeight: 'bold',
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

export default function OrderedList({ items, config, theme }: OrderedListProps) {
  const numberColor = config?.numberColor ?? theme?.primaryColor ?? '#FFCC00';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.content}>
            <Text style={[styles.number, { color: numberColor }]}>{index + 1}. </Text>
            <Text style={[styles.title, { color: titleColor }]}>{item.title}</Text>
            <Text style={[styles.colon, { color: titleColor }]}>: </Text>
            <Text style={[styles.description, { color: descriptionColor }]}>{item.description}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}
