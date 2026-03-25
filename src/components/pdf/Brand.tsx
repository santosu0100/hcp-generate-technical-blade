import { StyleSheet, View, Image } from '@react-pdf/renderer';
import React from 'react';
import { Originator, DEFAULT_ORIGINATOR, getLogoPath } from '../../utils/originators';

type Alignment = 'left' | 'right' | 'center';

interface BrandProps {
  originator?: Originator | string;
  alignment?: Alignment;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 0,
    marginBottom: 10,
  },
  containerLeft: {
    alignItems: 'flex-start',
  },
  containerRight: {
    alignItems: 'flex-end',
  },
  containerCenter: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 22,
    objectFit: 'contain',
  },
});

export default function Brand({ originator = DEFAULT_ORIGINATOR, alignment = 'left' }: BrandProps) {
  const logoSrc = getLogoPath(originator);

  const getAlignmentStyle = () => {
    switch (alignment) {
      case 'right':
        return styles.containerRight;
      case 'center':
        return styles.containerCenter;
      default:
        return styles.containerLeft;
    }
  };

  return (
    <View style={[styles.container, getAlignmentStyle()]}>
      <Image src={logoSrc} style={styles.logo} />
    </View>
  );
}
