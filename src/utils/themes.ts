import { ComponentType } from '../types/pdf-components.types';
import { Originator } from './originators';

// Theme configuration for each component
export interface ComponentThemeConfig {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  borderColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  lineColor?: string;
}

// Theme mapping by originator > component
export const originatorThemes: Record<Originator, Partial<Record<ComponentType, ComponentThemeConfig>>> = {
  hurst: {
    card: { borderColor: '#E2E8F0' },
    'action-button': { primaryColor: '#FFCC00', textPrimary: '#212121' },
    'big-int': { primaryColor: '#FFCC00' },
    section: { titleColor: '#212121' },
    'label-value': { textPrimary: '#4A4A4A', textSecondary: '#212121' },
    link: { primaryColor: '#4338CA' },
    'title-description': { textPrimary: '#4D4D4D', textSecondary: '#71717A' },
    'ordered-description': {
      primaryColor: '#FFCC00',
      textPrimary: '#4D4D4D',
      textSecondary: '#71717A',
      lineColor: '#E2E8F0',
    },
    'arrow-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
    'ordered-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
    'marker-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  },
  borum: {
    card: { borderColor: '#E0E0E0' },
    'action-button': { primaryColor: '#1E3A5F', textPrimary: '#FFFFFF' },
    'big-int': { primaryColor: '#1E3A5F' },
    section: { titleColor: '#1E3A5F' },
    'label-value': { textPrimary: '#212121', textSecondary: '#666666' },
    link: { primaryColor: '#1E3A5F' },
    'title-description': { primaryColor: '#1E3A5F', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-description': {
      primaryColor: '#1E3A5F',
      textPrimary: '#212121',
      textSecondary: '#666666',
      lineColor: '#E2E8F0',
    },
    'arrow-list': { primaryColor: '#1E3A5F', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-list': { primaryColor: '#1E3A5F', textPrimary: '#212121', textSecondary: '#666666' },
    'marker-list': { primaryColor: '#1E3A5F', textPrimary: '#212121', textSecondary: '#666666' },
  },
  ahlex: {
    card: { borderColor: '#C8E6C9' },
    'action-button': { primaryColor: '#2E7D32', textPrimary: '#FFFFFF' },
    'big-int': { primaryColor: '#2E7D32' },
    section: { titleColor: '#2E7D32' },
    'label-value': { textPrimary: '#212121', textSecondary: '#666666' },
    link: { primaryColor: '#2E7D32' },
    'title-description': { primaryColor: '#2E7D32', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-description': {
      primaryColor: '#2E7D32',
      textPrimary: '#212121',
      textSecondary: '#666666',
      lineColor: '#E2E8F0',
    },
    'arrow-list': { primaryColor: '#2E7D32', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-list': { primaryColor: '#2E7D32', textPrimary: '#212121', textSecondary: '#666666' },
    'marker-list': { primaryColor: '#2E7D32', textPrimary: '#212121', textSecondary: '#666666' },
  },
  artk: {
    card: { borderColor: '#E1BEE7' },
    'action-button': { primaryColor: '#6A1B9A', textPrimary: '#FFFFFF' },
    'big-int': { primaryColor: '#6A1B9A' },
    section: { titleColor: '#6A1B9A' },
    'label-value': { textPrimary: '#212121', textSecondary: '#666666' },
    link: { primaryColor: '#6A1B9A' },
    'title-description': { primaryColor: '#6A1B9A', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-description': {
      primaryColor: '#6A1B9A',
      textPrimary: '#212121',
      textSecondary: '#666666',
      lineColor: '#E2E8F0',
    },
    'arrow-list': { primaryColor: '#6A1B9A', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-list': { primaryColor: '#6A1B9A', textPrimary: '#212121', textSecondary: '#666666' },
    'marker-list': { primaryColor: '#6A1B9A', textPrimary: '#212121', textSecondary: '#666666' },
  },
  kateto: {
    card: { borderColor: '#FFCCBC' },
    'action-button': { primaryColor: '#D84315', textPrimary: '#FFFFFF' },
    'big-int': { primaryColor: '#D84315' },
    section: { titleColor: '#D84315' },
    'label-value': { textPrimary: '#212121', textSecondary: '#666666' },
    link: { primaryColor: '#D84315' },
    'title-description': { primaryColor: '#D84315', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-description': {
      primaryColor: '#D84315',
      textPrimary: '#212121',
      textSecondary: '#666666',
      lineColor: '#E2E8F0',
    },
    'arrow-list': { primaryColor: '#D84315', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-list': { primaryColor: '#D84315', textPrimary: '#212121', textSecondary: '#666666' },
    'marker-list': { primaryColor: '#D84315', textPrimary: '#212121', textSecondary: '#666666' },
  },
  muv: {
    card: { borderColor: '#B2EBF2' },
    'action-button': { primaryColor: '#00838F', textPrimary: '#FFFFFF' },
    'big-int': { primaryColor: '#00838F' },
    section: { titleColor: '#00838F' },
    'label-value': { textPrimary: '#212121', textSecondary: '#666666' },
    link: { primaryColor: '#00838F' },
    'title-description': { primaryColor: '#00838F', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-description': {
      primaryColor: '#00838F',
      textPrimary: '#212121',
      textSecondary: '#666666',
      lineColor: '#E2E8F0',
    },
    'arrow-list': { primaryColor: '#00838F', textPrimary: '#212121', textSecondary: '#666666' },
    'ordered-list': { primaryColor: '#00838F', textPrimary: '#212121', textSecondary: '#666666' },
    'marker-list': { primaryColor: '#00838F', textPrimary: '#212121', textSecondary: '#666666' },
  },
};

// Check if a string is a valid hex color
function isHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
}

// Merge two theme configs (first takes precedence)
function mergeThemes(primary: ComponentThemeConfig, fallback: ComponentThemeConfig | undefined): ComponentThemeConfig {
  if (!fallback) return primary;

  return {
    primaryColor: primary.primaryColor ?? fallback.primaryColor,
    textPrimary: primary.textPrimary ?? fallback.textPrimary,
    textSecondary: primary.textSecondary ?? fallback.textSecondary,
    borderColor: primary.borderColor ?? fallback.borderColor,
    backgroundColor: primary.backgroundColor ?? fallback.backgroundColor,
    titleColor: primary.titleColor ?? fallback.titleColor,
    lineColor: primary.lineColor ?? fallback.lineColor,
  };
}

// Get component theme by originator name
export function getComponentTheme(originator: string, componentType: ComponentType): ComponentThemeConfig | undefined {
  const normalizedOriginator = originator.toLowerCase() as Originator;
  const theme = originatorThemes[normalizedOriginator] ?? originatorThemes.hurst;
  return theme[componentType];
}

// Get theme from hex color
export function getThemeFromHex(colorTheme?: string): ComponentThemeConfig | undefined {
  if (!colorTheme || !isHexColor(colorTheme)) return undefined;
  return { primaryColor: colorTheme };
}

// Resolve component theme with fallback chain:
// 1. Component-specific colors (highest priority)
// 2. Originator theme for this component
// 3. Hex color passed as colorTheme
export function resolveComponentTheme(
  componentType: ComponentType,
  options: {
    componentColors?: ComponentThemeConfig;
    originator?: string;
    colorTheme?: string;
  },
): ComponentThemeConfig | undefined {
  const { componentColors, originator, colorTheme } = options;

  const originatorTheme = originator ? getComponentTheme(originator, componentType) : undefined;
  const hexTheme = getThemeFromHex(colorTheme);

  // Early return if no themes available
  if (!componentColors && !originatorTheme && !hexTheme) return undefined;

  // Merge in priority order: componentColors > originatorTheme > hexTheme
  return mergeThemes(componentColors ?? {}, mergeThemes(originatorTheme ?? {}, hexTheme));
}
