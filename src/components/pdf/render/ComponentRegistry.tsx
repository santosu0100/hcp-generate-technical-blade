import React from 'react';
import Brand from '../Brand';
import Card from '../Card';
import ActionButton from '../ActionButton';
import Sidebar from '../Sidebar';
import Text from '../Text';
import LabelValue from '../LabelValue';
import BigInt from '../BigInt';
import Section from '../Section';
import FooterComponent from '../Footer';
import Link from '../Link';
import TitleDescription from '../TitleDescription';
import OrderedDescription from '../OrderedDescription';
import BulletList from '../BulletList';
import ArrowList from '../ArrowList';
import OrderedList from '../OrderedList';
import MarkerList from '../MarkerList';
import Table from '../Table';
import BoxGroup from '../BoxGroup';
import ImageView from '../ImageView';
import type {
  BrandRendererProps,
  CardRendererProps,
  LabelValueRendererProps,
  BigIntRendererProps,
  ActionButtonRendererProps,
  SidebarRendererProps,
  TextRendererProps,
  SectionRendererProps,
  FooterRendererProps,
  LinkRendererProps,
  TitleDescriptionRendererProps,
  OrderedDescriptionRendererProps,
  BulletListRendererProps,
  ArrowListRendererProps,
  OrderedListRendererProps,
  MarkerListRendererProps,
  TableRendererProps,
  BoxGroupRendererProps,
  ImageViewRendererProps,
} from './types';

// Render functions for each component - this is the source of truth
export const componentRenderers = {
  brand: ({ config, context }: BrandRendererProps) => (
    <Brand originator={config?.originator ?? context?.originator} alignment={config?.alignment} />
  ),

  card: ({ config, children, renderChild, theme }: CardRendererProps) => (
    <Card theme={theme} width={config?.width} height={config?.height}>
      {children?.map(child => renderChild(child))}
    </Card>
  ),

  'label-value': ({ data, config, theme }: LabelValueRendererProps) => (
    <LabelValue label={data?.label ?? ''} value={data?.value ?? ''} config={config} theme={theme} />
  ),

  'big-int': ({ data, config, theme }: BigIntRendererProps) => (
    <BigInt value={data?.value ?? ''} label={data?.label} config={config} theme={theme} />
  ),

  'action-button': ({ data, theme }: ActionButtonRendererProps) => (
    <ActionButton label={data?.label ?? ''} href={data?.href ?? ''} primaryColor={theme?.primaryColor} theme={theme} />
  ),

  sidebar: ({ config, children, renderChild }: SidebarRendererProps) => (
    <Sidebar width={config?.width}>{children?.map(child => renderChild(child))}</Sidebar>
  ),

  text: ({ data, config, theme }: TextRendererProps) => (
    <Text content={data?.content ?? ''} config={config} theme={theme} />
  ),

  section: ({ data, config, children, renderChild, theme }: SectionRendererProps) => (
    <Section
      title={data?.title ?? ''}
      titleColor={config?.titleColor}
      theme={theme}
      layout={config?.layout}
      itemsPerRow={config?.itemsPerRow}
      gapX={config?.gapX}
      gapY={config?.gapY}
      equalWidth={config?.equalWidth}
      marginTop={config?.marginTop}
      marginBottom={config?.marginBottom}
      marginLeft={config?.marginLeft}
      marginRight={config?.marginRight}
      width={config?.width}
      height={config?.height}>
      {children?.map(child => renderChild(child))}
    </Section>
  ),

  'page-break': () => null,

  footer: ({ children, renderChild }: FooterRendererProps) => (
    <FooterComponent>{children?.map(child => renderChild(child))}</FooterComponent>
  ),

  link: ({ data, config, theme }: LinkRendererProps) => (
    <Link label={data?.label ?? ''} href={data?.href ?? ''} color={config?.color} theme={theme} />
  ),

  'title-description': ({ data, config, theme, children, renderChild }: TitleDescriptionRendererProps) => (
    <TitleDescription data={data} config={config} theme={theme}>
      {children?.map(child => renderChild(child))}
    </TitleDescription>
  ),

  'ordered-description': ({ data, config, theme }: OrderedDescriptionRendererProps) => (
    <OrderedDescription items={data?.items ?? []} config={config} theme={theme} />
  ),

  'bullet-list': ({ data, config, theme }: BulletListRendererProps) => (
    <BulletList items={data?.items ?? []} config={config} theme={theme} />
  ),

  'arrow-list': ({ data, config, theme }: ArrowListRendererProps) => (
    <ArrowList items={data?.items ?? []} config={config} theme={theme} />
  ),

  'ordered-list': ({ data, config, theme }: OrderedListRendererProps) => (
    <OrderedList items={data?.items ?? []} config={config} theme={theme} />
  ),

  'marker-list': ({ data, config, theme }: MarkerListRendererProps) => (
    <MarkerList items={data?.items ?? []} config={config} theme={theme} />
  ),

  table: ({ data, config, theme }: TableRendererProps) => (
    <Table
      columns={data?.columns ?? []}
      items={data?.items ?? []}
      groups={data?.groups}
      config={config}
      theme={theme}
      variant={config?.variant}
    />
  ),

  'box-group': ({ config, children, renderChild }: BoxGroupRendererProps) => (
    <BoxGroup
      layout={config?.layout}
      itemsPerRow={config?.itemsPerRow}
      gapX={config?.gapX}
      gapY={config?.gapY}
      marginTop={config?.marginTop}
      marginBottom={config?.marginBottom}
      marginLeft={config?.marginLeft}
      marginRight={config?.marginRight}
      width={config?.width}
      height={config?.height}>
      {children?.map(child => renderChild(child))}
    </BoxGroup>
  ),


  'image-view': ({ data, config, theme }: ImageViewRendererProps) => (
    <ImageView data={data} config={config} theme={theme} />
  ),
} as const;
