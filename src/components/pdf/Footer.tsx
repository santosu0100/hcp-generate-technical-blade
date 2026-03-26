import { StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';

// Vite-friendly public path for logo
const HURST_GRAY_LOGO = '/assets/originator-logo/hurst-gray-logo.png';

interface FooterProps {
  children?: ReactNode;
}

const styles = StyleSheet.create({
  footer: {
    marginBottom: -30,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 60,
    height: 16,
    objectFit: 'contain',
  },
  separator: {
    color: '#212121',
    fontSize: 16,
  },
  childrenContainer: {
    justifyContent: 'center',
    margin: 0,
  },
  pageNumber: {
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export default function Footer({ children }: FooterProps) {
  return (
    <View style={styles.footer} fixed>
      <View style={styles.leftContent}>
        <Image src={HURST_GRAY_LOGO} style={styles.logo} />
        {children && <Text style={styles.separator}>|</Text>}
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </View>
      <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} />
    </View>
  );
}
