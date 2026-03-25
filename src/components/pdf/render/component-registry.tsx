import React, { ReactElement } from 'react';
import { 
  ComponentType, 
  BrandRenderProps,
  HighlightCardRenderProps,
  LabelValueRenderProps,
  BigIntRenderProps,
  ActionButtonRenderProps,
  SidebarRenderProps,
  TextRenderProps,
  SectionRenderProps,
  FooterRenderProps,
  LinkRenderProps,
  TitleDescriptionRenderProps,
  TimelineOrderedDescriptionRenderProps,
  BulletListRenderProps,
  ArrowListRenderProps,
  OrderedListRenderProps,
  MarkerListRenderProps
} from '../../../types/pdf-components.types';
import Brand from '../Brand';
import HighlightCard from '../HighlightCard';
import ActionButton from '../ActionButton';
import Sidebar from '../Sidebar';
import Text from '../Text';
import Separator from '../Separator';
import LabelValue from '../LabelValue';
import BigInt from '../BigInt';
import Section from '../Section';
import FooterComponent from '../Footer';
import Link from '../Link';
import TitleDescription from '../TitleDescription';
import TimelineOrderedDescription from '../TimelineOrderedDescription';
import BulletList, { BulletListVariant } from '../BulletList';
import ArrowList from '../ArrowList';
import OrderedList from '../OrderedList';
import MarkerList from '../MarkerList';

// Render functions for each component - this is the source of truth
export const componentRenderers: Record<ComponentType, (props: any) => ReactElement | null> = {
  brand: ({ config }: BrandRenderProps) => (
    <Brand originator={config?.originator} alignment={config?.alignment} />
  ),

  'highlight-card': ({
    children,
    renderChild,
    theme,
  }: HighlightCardRenderProps) => <HighlightCard theme={theme}>{children?.map(child => renderChild(child))}</HighlightCard>,

  'label-value': ({
    data,
    config,
    theme,
  }: LabelValueRenderProps) => <LabelValue label={data?.label ?? ''} value={data?.value ?? ''} variant={config?.variant} theme={theme} />,

  'big-int': ({
    data,
    config,
    theme,
  }: BigIntRenderProps) => (
    <BigInt
      value={data?.value ?? ''}
      label={data?.label}
      labelPosition={config?.labelPosition}
      primaryColor={theme?.primaryColor}
      theme={theme}
    />
  ),

  'action-button': ({ data, theme }: ActionButtonRenderProps) => (
    <ActionButton label={data?.label ?? ''} href={data?.href ?? ''} primaryColor={theme?.primaryColor} theme={theme} />
  ),

  sidebar: ({
    config,
    children,
    renderChild,
  }: SidebarRenderProps) => <Sidebar width={config?.width}>{children?.map(child => renderChild(child))}</Sidebar>,

  text: ({
    data,
    config,
    theme,
  }: TextRenderProps) => (
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
  }: SectionRenderProps) => (
    <Section title={data?.title ?? ''} titleColor={config?.titleColor} theme={theme}>
      {children?.map(child => renderChild(child))}
    </Section>
  ),

  'page-break': () => null,

  header: () => null,

  footer: ({
    children,
    renderChild,
  }: FooterRenderProps) => <FooterComponent>{children?.map(child => renderChild(child))}</FooterComponent>,

  link: ({
    data,
    config,
    theme,
  }: LinkRenderProps) => <Link label={data?.label ?? ''} href={data?.href ?? ''} color={config?.color} theme={theme} />,

  'title-description': ({
    data,
    config,
    theme,
  }: TitleDescriptionRenderProps) => (
    <TitleDescription
      title={data?.title ?? ''}
      description={data?.description ?? ''}
      links={data?.links}
      config={config}
      theme={theme}
    />
  ),

  'timeline-ordered-description': ({
    data,
    config,
    theme,
  }: TimelineOrderedDescriptionRenderProps) => <TimelineOrderedDescription items={data?.items ?? []} config={config} theme={theme} />,

  'bullet-list': ({
    data,
    config,
    theme,
  }: BulletListRenderProps) => <BulletList items={data?.items ?? []} config={config} theme={theme} />,

  'arrow-list': ({
    data,
    config,
    theme,
  }: ArrowListRenderProps) => <ArrowList items={data?.items ?? []} config={config} theme={theme} />,

  'ordered-list': ({
    data,
    config,
    theme,
  }: OrderedListRenderProps) => <OrderedList items={data?.items ?? []} config={config} theme={theme} />,

  'marker-list': ({
    data,
    config,
    theme,
  }: MarkerListRenderProps) => <MarkerList items={data?.items ?? []} config={config} theme={theme} />,
};
