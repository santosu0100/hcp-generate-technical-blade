import React from 'react';
import {
  BaseRendererProps,
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
} from './types';
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

// Render functions for each component - this is the source of truth
export const componentRenderers = {
  brand: ({ config }: BrandRendererProps) => (
    <Brand originator={config?.originator} alignment={config?.alignment} />
  ),

  card: ({
    children,
    renderChild,
    theme,
  }: CardRendererProps) => <Card theme={theme}>{children?.map(child => renderChild(child))}</Card>,

  'label-value': ({
    data,
    config,
    theme,
  }: LabelValueRendererProps) => (
    <LabelValue
      label={data?.label ?? ''}
      value={data?.value ?? ''}
      variant={config?.variant as any}
      textAlign={config?.textAlign}
      theme={theme}
    />
  ),

  'big-int': ({
    data,
    config,
    theme,
  }: BigIntRendererProps) => (
    <BigInt
      value={data?.value ?? ''}
      label={data?.label}
      labelPosition={config?.labelPosition as any}
      fontSize={config?.fontSize}
      primaryColor={theme?.primaryColor}
      theme={theme}
    />
  ),

  'action-button': ({ data, theme }: ActionButtonRendererProps) => (
    <ActionButton label={data?.label ?? ''} href={data?.href ?? ''} primaryColor={theme?.primaryColor} theme={theme} />
  ),

  sidebar: ({
    config,
    children,
    renderChild,
  }: SidebarRendererProps) => <Sidebar width={config?.width}>{children?.map(child => renderChild(child))}</Sidebar>,

  text: ({
    data,
    config,
    theme,
  }: TextRendererProps) => (
    <Text
      content={data?.content ?? ''}
      fontSize={config?.fontSize}
      fontWeight={config?.fontWeight}
      color={config?.color}
      align={config?.align}
      theme={theme}
    />
  ),

  section: ({
    data,
    config,
    children,
    renderChild,
    theme,
  }: SectionRendererProps) => (
    <Section
      title={data?.title ?? ''}
      titleColor={config?.titleColor}
      layout={config?.layout as any}
      itemsPerRow={config?.itemsPerRow}
      gapX={config?.gapX}
      gapY={config?.gapY}
      theme={theme}
    >
      {children?.map(child => renderChild(child))}
    </Section>
  ),

  'page-break': () => null,

  header: () => null,

  footer: ({
    children,
    renderChild,
  }: FooterRendererProps) => <FooterComponent>{children?.map(child => renderChild(child))}</FooterComponent>,

  link: ({
    data,
    config,
    theme,
  }: LinkRendererProps) => <Link label={data?.label ?? ''} href={data?.href ?? ''} color={config?.color} theme={theme} />,

  'title-description': ({
    data,
    config,
    theme,
  }: TitleDescriptionRendererProps) => (
    <TitleDescription
      title={data?.title ?? ''}
      description={data?.description ?? ''}
      links={data?.links}
      config={config}
      textAlign={config?.textAlign}
      theme={theme}
    />
  ),

  'ordered-description': ({
    data,
    config,
    theme,
  }: OrderedDescriptionRendererProps) => <OrderedDescription items={data?.items ?? []} config={config} theme={theme} />,

  'bullet-list': ({
    data,
    config,
    theme,
  }: BulletListRendererProps) => <BulletList items={data?.items ?? []} config={config as any} textAlign={config?.textAlign} theme={theme} />,

  'arrow-list': ({
    data,
    config,
    theme,
  }: ArrowListRendererProps) => <ArrowList items={data?.items ?? []} config={config as any} textAlign={config?.textAlign} theme={theme} />,

  'ordered-list': ({
    data,
    config,
    theme,
  }: OrderedListRendererProps) => <OrderedList items={data?.items ?? []} config={config} textAlign={config?.textAlign} theme={theme} />,

  'marker-list': ({
    data,
    config,
    theme,
  }: MarkerListRendererProps) => <MarkerList items={data?.items ?? []} config={config} textAlign={config?.textAlign} theme={theme} />,

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

  'box-group': ({
    config,
    children,
    renderChild,
  }: BoxGroupRendererProps) => (
    <BoxGroup
      layout={config?.layout}
      itemsPerRow={config?.itemsPerRow}
      gapX={config?.gapX}
      gapY={config?.gapY}
    >
      {children?.map(child => renderChild(child))}
    </BoxGroup>
  ),
} as const;
