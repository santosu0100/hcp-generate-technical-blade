import React, { ReactElement } from 'react';
import { ComponentDTO, ComponentTheme } from './types';
import { componentRenderers } from './ComponentRegistry';
import { resolveComponentTheme, ComponentThemeConfig } from '@/utils/themes';

export interface ComponentRendererContext {
  originator?: string;
}

interface ComponentRendererProps {
  component: ComponentDTO;
  context: ComponentRendererContext;
}

export function ComponentRenderer({ component, context }: ComponentRendererProps): ReactElement | null {
  const { type, config, data, children } = component as any;

  const renderer = (componentRenderers as any)[type];

  if (!renderer) {
    console.warn(`Unknown component type: ${type}`);
    return null;
  }

  // Resolve theme for this specific component using originator
  const resolvedTheme = resolveComponentTheme(type, {
    componentColors: config as ComponentThemeConfig,
    originator: context.originator,
  });

  const renderChild = (child: ComponentDTO) => (
    <ComponentRenderer key={Math.random()} component={child} context={context} />
  );

  return renderer({
    config: config as any,
    data,
    children,
    theme: resolvedTheme as ComponentTheme,
    renderChild,
  }) as ReactElement | null;
}

export function renderComponents(components: ComponentDTO[], context: ComponentRendererContext): ReactElement[] {
  return components
    .map((component, index) => <ComponentRenderer key={index} component={component} context={context} />)
    .filter(Boolean);
}
