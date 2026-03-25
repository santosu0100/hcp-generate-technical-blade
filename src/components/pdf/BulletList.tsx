import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';

export type BulletListVariant = 'label-bolder' | 'value-bolder';

interface BulletItem {
  label: string;
  value: string;
}

interface BulletListTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
}

interface BulletListConfig {
  bulletColor?: string;
  labelColor?: string;
  valueColor?: string;
  variant?: BulletListVariant;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
}

interface BulletListProps {
  items: BulletItem[];
  config?: BulletListConfig;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  theme?: BulletListTheme;
}

const BULLET_SIZE = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bulletContainer: {
    width: 20,
    paddingTop: 4,
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
  labelBold: {
    fontSize: 8,
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  labelNormal: {
    fontSize: 8,
    fontWeight: 'normal',
    lineHeight: 1.4,
  },
  colonBold: {
    fontSize: 8,
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  colonNormal: {
    fontSize: 8,
    fontWeight: 'normal',
    lineHeight: 1.4,
  },
  valueBold: {
    fontSize: 8,
    fontWeight: 'bold',
    lineHeight: 1.4,
  },
  valueNormal: {
    fontSize: 8,
    fontWeight: 'normal',
    lineHeight: 1.4,
  },
});

export default function BulletList({ items, config, textAlign, theme }: BulletListProps) {
  const variant = config?.variant ?? 'value-bolder';
  const isLabelBolder = variant === 'label-bolder';
  const align = textAlign ?? config?.textAlign ?? 'left';
  const fontSize = config?.fontSize ?? 8;

  const bulletColor =
    config?.bulletColor ?? (isLabelBolder ? theme?.primaryColor ?? '#1E3A5F' : theme?.textSecondary ?? '#71717A');
  const labelColor = config?.labelColor ?? theme?.textPrimary ?? '#4D4D4D';
  const valueColor = config?.valueColor ?? theme?.textSecondary ?? '#71717A';

  return (
    <View style={[styles.container, { textAlign: align }]}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={styles.bulletContainer}>
            <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
          </View>
          <View style={styles.content}>
            <Text style={[isLabelBolder ? styles.labelBold : styles.labelNormal, { color: labelColor }]}>
              {item.label}
            </Text>
            <Text style={[isLabelBolder ? styles.colonBold : styles.colonNormal, { color: labelColor }]}>: </Text>
            <Text style={[isLabelBolder ? styles.valueNormal : styles.valueBold, { color: valueColor }]}>
              {item.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
