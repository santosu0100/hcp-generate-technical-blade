import { StyleSheet, Text, View, Svg, Polygon } from '@react-pdf/renderer';
import React from 'react';

interface ArrowListItem {
  title: string;
  description: string;
}

interface ArrowListTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
}

interface ArrowListConfig {
  arrowColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

interface ArrowListProps {
  items: ArrowListItem[];
  config?: ArrowListConfig;
  theme?: ArrowListTheme;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  arrowWrapper: {
    width: 12,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
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

export default function ArrowList({ items, config, theme }: ArrowListProps) {
  const arrowColor = config?.arrowColor ?? theme?.primaryColor ?? '#FFD700';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.arrowWrapper}>
            <Svg width="8" height="10" viewBox="0 0 8 10">
              <Polygon points="0,0 8,5 0,10" fill={arrowColor} />
            </Svg>
          </View>
          <Text style={styles.content}>
            <Text style={[styles.title, { color: titleColor }]}>{item.title}</Text>
            <Text style={[styles.colon, { color: titleColor }]}>: </Text>
            <Text style={[styles.description, { color: descriptionColor }]}>{item.description}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}
