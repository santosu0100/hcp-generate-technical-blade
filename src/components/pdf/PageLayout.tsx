import { StyleSheet, View } from '@react-pdf/renderer';
import React from 'react';
import { ComponentDTO } from '../../types/pdf-components.types';
import { ComponentRenderer, ComponentRendererContext } from './render/component-renderer';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface PageLayoutProps {
  brand: ComponentDTO | null;
  sidebar: ComponentDTO | null;
  footer: ComponentDTO | null;
  components: ComponentDTO[];
  context: ComponentRendererContext;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flex: 1,
  },
  brandContainer: {
    paddingHorizontal: 0,
  },
  pageContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebarLeft: {
    paddingBottom: 10,
    paddingRight: 15,
  },
  sidebarRight: {
    paddingBottom: 10,
    paddingLeft: 15,
  },
  mainContent: {
    flex: 1,
    paddingBottom: 20,
  },
});

function renderComponents(components: ComponentDTO[], context: ComponentRendererContext) {
  return components.map((component, index) => (
    <ComponentRenderer key={index} component={component} context={context} />
  ));
}

export default function PageLayout({ brand, sidebar, footer, components, context }: PageLayoutProps) {
  const isLeftAligned = sidebar?.config?.position === 'left';

  const brandElement = brand && (
    <View style={styles.brandContainer} fixed>
      <ComponentRenderer component={brand} context={context} />
    </View>
  );

  const sidebarElement = sidebar && (
    <View style={isLeftAligned ? styles.sidebarLeft : styles.sidebarRight} fixed>
      <Sidebar width={sidebar.config?.width}>{renderComponents(sidebar.children ?? [], context)}</Sidebar>
    </View>
  );

  const mainContentElement = <View style={styles.mainContent}>{renderComponents(components ?? [], context)}</View>;

  const footerElement = <Footer>{renderComponents(footer?.children ?? [], context)}</Footer>;

  return (
    <View style={styles.page}>
      {brandElement}
      <View style={styles.pageContainer}>
        {isLeftAligned && sidebarElement}
        {mainContentElement}
        {!isLeftAligned && sidebarElement}
      </View>
      {footerElement}
    </View>
  );
}
