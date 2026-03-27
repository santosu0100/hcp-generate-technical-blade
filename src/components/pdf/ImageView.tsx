import { StyleSheet, View, Image } from '@react-pdf/renderer';
import React from 'react';

interface ImageViewConfig {
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none';
  alignment?: 'left' | 'center' | 'right';
}

interface ImageViewData {
  src: string;
}

interface ImageViewTheme {
  primaryColor?: string;
}

interface ImageViewProps {
  data?: ImageViewData;
  config?: ImageViewConfig;
  theme?: ImageViewTheme;
}

const DEFAULT_WIDTH = 400;
const DEFAULT_HEIGHT = 250;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
  },
  containerLeft: {
    alignItems: 'flex-start',
  },
  containerCenter: {
    alignItems: 'center',
  },
  containerRight: {
    alignItems: 'flex-end',
  },
});

export default function ImageView({ data, config }: ImageViewProps) {
  const width = config?.width ?? DEFAULT_WIDTH;
  const height = config?.height ?? DEFAULT_HEIGHT;
  const objectFit = config?.objectFit ?? 'contain';
  const alignment = config?.alignment ?? 'center';

  if (!data?.src || data.src.trim() === '') {
    return null;
  }

  const getAlignmentStyle = () => {
    switch (alignment) {
      case 'left':
        return styles.containerLeft;
      case 'right':
        return styles.containerRight;
      default:
        return styles.containerCenter;
    }
  };

  return (
    <View style={[styles.container, getAlignmentStyle()]}>
      <Image
        src={data.src}
        style={{
          width,
          height,
          objectFit,
        }}
      />
    </View>
  );
}
