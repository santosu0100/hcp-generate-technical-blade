import { StyleSheet, View } from '@react-pdf/renderer';
import React, { ReactNode } from 'react';

interface SidebarProps {
  width?: number | string;
  children: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    marginLeft: 1,
    marginRight: 2,
    marginTop: 1,
    marginBottom: 1,
  },
});

export default function Sidebar({ children, width = 126 }: SidebarProps) {
  return <View style={[styles.container, { width }]}>{children}</View>;
}
