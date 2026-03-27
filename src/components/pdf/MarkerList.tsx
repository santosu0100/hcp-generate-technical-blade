import { StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import React from 'react';

interface MarkerListItem {
  title: string;
  description: string;
  icon?: string;
}

interface MarkerListTheme {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  numberColor?: string;
  lineColor?: string;
}

interface MarkerListConfig {
  markerColor?: string;
  numberColor?: string;
  lineColor?: string;
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

interface MarkerListProps {
  items: MarkerListItem[];
  config?: MarkerListConfig;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  theme?: MarkerListTheme;
}

const MARKER_SIZE = 10;
const ICON_SIZE = 32;

function isSvgUrl(url: string): boolean {
  const lowerUrl = url.toLowerCase();
  return lowerUrl.endsWith('.svg') || lowerUrl.includes('svg');
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    width: '50%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 15,
    paddingTop: 15,
    width: '100%',
  },
  borderOverlay: {
    position: 'absolute',
    top: 0,
    left: 15,
    right: -20,
    bottom: -1.5,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  borderRightHide: {
    position: 'absolute',
    top: -3,
    right: -30,
    width: '25%',
    height: '25%',
    backgroundColor: '#FFFFFF',
    transform: 'rotate(-26deg)',
  },
  borderLeftHide: {
    position: 'absolute',
    bottom: -1,
    left: -2,
    width: '50%',
    height: '75%',
    backgroundColor: '#FFFFFF',
  },
  leftItem: {
    paddingRight: 16,
  },
  imageSection: {
    width: ICON_SIZE + 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  markerSection: {
    width: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  markerWrapper: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 6,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingLeft: 2,
    paddingRight: 4,
  },
  title: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 1,
    lineHeight: 1.3,
  },
  description: {
    fontSize: 7,
    lineHeight: 1.3,
  },
});

export default function MarkerList({ items, config, textAlign = 'left', theme }: MarkerListProps) {
  const markerColor = config?.markerColor ?? theme?.primaryColor ?? '#FFCC00';
  const numberColor = config?.numberColor ?? theme?.numberColor ?? '#000000';
  const titleColor = config?.titleColor ?? theme?.textPrimary ?? '#4D4D4D';
  const descriptionColor = config?.descriptionColor ?? theme?.textSecondary ?? '#71717A';
  const titleFontSize = config?.titleFontSize ?? 8;
  const descriptionFontSize = config?.descriptionFontSize ?? 7;
  const numberFontSize = config?.numberFontSize ?? 6;
  const markerGap = config?.markerGap ?? 1;

  const containerStyle = [
    styles.container,
    config?.marginTop !== undefined ? { marginTop: config.marginTop } : {},
    config?.marginBottom !== undefined ? { marginBottom: config.marginBottom } : {},
    config?.marginLeft !== undefined ? { marginLeft: config.marginLeft } : {},
    config?.marginRight !== undefined ? { marginRight: config.marginRight } : {},
    config?.width !== undefined ? { width: config.width } : {},
    config?.height !== undefined ? { height: config.height } : {},
  ];

  const rows = items.map((item, index) => ({
    ...item,
    isLeft: index % 2 === 0,
  }));

  const renderItem = (item: MarkerListItem, index: number, isLeft: boolean) => {
    const hasValidIcon = item.icon && item.icon.trim() !== '' && !isSvgUrl(item.icon);

    return (
      <View style={[styles.item, isLeft ? styles.leftItem : {}]}>
        {hasValidIcon && item.icon && (
          <View style={styles.imageSection}>
            <Image
              src={item.icon}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                objectFit: 'contain',
              }}
            />
          </View>
        )}

        <View style={styles.markerSection}>
          <View style={[styles.markerWrapper, { backgroundColor: markerColor }]}>
            <Text style={[styles.number, { color: numberColor, fontSize: numberFontSize }]}>{index + 1}</Text>
          </View>
        </View>

        <View style={[styles.content, { paddingLeft: markerGap }]}>
          <Text style={[styles.title, { color: titleColor, textAlign, fontSize: titleFontSize }]}>{item.title}</Text>
          <Text style={[styles.description, { color: descriptionColor, textAlign, fontSize: descriptionFontSize }]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={containerStyle}>
      {rows.map((row, rowIndex) => {
        const zIndex = items.length - rowIndex;
        const isOdd = (rowIndex + 1) % 2 !== 0;
        const isFirstItem = rowIndex === 0;
        const isPenultimateItem = rowIndex === items.length - 2;

        return (
          <View key={rowIndex} style={[styles.row, { zIndex }]}>
            {isOdd && (
              <>
                <View
                  style={[
                    styles.borderOverlay,
                    isFirstItem ? { borderLeftWidth: 0 } : {},
                    !isFirstItem ? { borderTopWidth: 1.5 } : {},
                    isPenultimateItem ? { borderRightWidth: 0, borderBottomWidth: 0 } : {},
                    { zIndex },
                    !row.icon ? { left: 7, right: -8 } : {},
                  ]}>
                  <View style={styles.borderLeftHide} />
                  <View style={styles.borderRightHide} />
                </View>
              </>
            )}
            {renderItem(row, rowIndex, row.isLeft)}
          </View>
        );
      })}
    </View>
  );
}
