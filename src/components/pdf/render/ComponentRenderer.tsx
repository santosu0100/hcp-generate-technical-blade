import React, { ReactElement } from 'react';
import { componentRenderers } from './ComponentRegistry';
import type { BaseComponentDTO } from '@/types/components.dto';
import type { RenderChildFn } from './types';
import { resolveComponentTheme } from '@/utils/themes';
import type { ComponentThemeConfig } from '@/utils/themes';

export interface ComponentRendererContext {
  originator?: string;
}

interface ComponentRendererProps {
  component: BaseComponentDTO;
  context: ComponentRendererContext;
}

// Helper type for renderer function
type RendererFunction = (props: {
  config?: unknown;
  data?: unknown;
  children?: BaseComponentDTO[];
  theme?: ComponentThemeConfig;
  renderChild: RenderChildFn;
}) => ReactElement | null;

export function ComponentRenderer({ component, context }: ComponentRendererProps): ReactElement | null {
  const { type, config, data, children } = component;

  const renderer = (componentRenderers as Record<string, RendererFunction>)[type];

  if (!renderer) {
    console.warn(`Unknown component type: ${type}`);
    return null;
  }

  // Resolve theme for this specific component using originator
  const resolvedTheme = resolveComponentTheme(type, {
    componentColors: config as ComponentThemeConfig,
    originator: context.originator,
  });

  const renderChild: RenderChildFn = child => (
    <ComponentRenderer key={Math.random()} component={child} context={context} />
  );

  return renderer({
    config,
    data,
    children,
    theme: resolvedTheme,
    renderChild,
  });
}

export function renderComponents(components: BaseComponentDTO[], context: ComponentRendererContext): ReactElement[] {
  return components
    .map((component, index) => <ComponentRenderer key={index} component={component} context={context} />)
    .filter(Boolean);
}
