import React from 'react';
import { Document, Page, StyleSheet, View, Font } from '@react-pdf/renderer';
import { OperationTechnicalBladeDTO } from '../../../types/operation-technical-blade.dto';
import { ComponentDTO } from '../../../types/pdf-components.types';
import { ComponentRenderer } from './component-renderer';
import PageLayout from '../PageLayout';
import { DEFAULT_ORIGINATOR } from '../../../utils/originators';
import '../../../utils/fonts'; // Registrar fonte Poppins globalmente

// Disable hyphenation
Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Poppins',
    color: '#4A4A4A',
    paddingTop: 35,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});

function splitByPageBreak(components: ComponentDTO[]): ComponentDTO[][] {
  const pages: ComponentDTO[][] = [];
  let currentPage: ComponentDTO[] = [];

  for (const component of components) {
    if (component.type === 'page-break') {
      if (currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
      }
    } else {
      currentPage.push(component);
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return pages.length > 0 ? pages : [[]];
}

const LAYOUT_COMPONENTS = ['brand', 'sidebar', 'footer'];

function extractComponent(components: ComponentDTO[], type: string): ComponentDTO | null {
  return components.find(c => c.type === type) ?? null;
}

function extractContentComponents(components: ComponentDTO[]): ComponentDTO[] {
  return components.filter(c => !LAYOUT_COMPONENTS.includes(c.type));
}

interface OperationTechnicalBladeDocumentProps {
  fields: OperationTechnicalBladeDTO;
}

export function OperationTechnicalBladeDocument({ fields }: OperationTechnicalBladeDocumentProps) {
  const originator = fields.originator ?? DEFAULT_ORIGINATOR;
  const context = { originator };
  const allComponents = (fields.components as ComponentDTO[]) || [];

  // Extrai componentes de layout
  const brand = extractComponent(allComponents, 'brand');
  const sidebar = extractComponent(allComponents, 'sidebar');
  const footer = extractComponent(allComponents, 'footer');

  // Extrai apenas componentes de conteúdo
  const contentComponents = extractContentComponents(allComponents);

  // Divide em páginas pelo page-break
  const pagesContent = splitByPageBreak(contentComponents);

  return (
    <Document>
      {pagesContent.map((pageComponents, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <PageLayout brand={brand} sidebar={sidebar} footer={footer} components={pageComponents} context={context} />
        </Page>
      ))}
    </Document>
  );
}
