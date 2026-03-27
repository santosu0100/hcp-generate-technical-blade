import type { ComponentType } from '@/types/components.dto';
import type { Originator } from './originators';

// Theme configuration for each component
export interface ComponentThemeConfig {
  primaryColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  borderColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  lineColor?: string;
  numberColor?: string;
}

// ============================================
// Originator Themes
// ============================================

// Hurst theme
const hurstTheme: Partial<Record<ComponentType, ComponentThemeConfig>> = {
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
    numberColor: '#000000',
  },
  'arrow-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'ordered-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'marker-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A', numberColor: '#000000' },
};

// Ahlex theme
const ahlexTheme: Partial<Record<ComponentType, ComponentThemeConfig>> = {
  card: { borderColor: '#E2E8F0' },
  'action-button': { primaryColor: '#0066FF', textPrimary: '#FFFFFF' },
  'big-int': { primaryColor: '#0066FF' },
  section: { titleColor: '#0066FF' },
  'label-value': { textPrimary: '#4A4A4A', textSecondary: '#0066FF' },
  link: { primaryColor: '#4338CA' },
  'title-description': { textPrimary: '#0066FF', textSecondary: '#71717A' },
  'ordered-description': {
    primaryColor: '#0066FF',
    textPrimary: '#4D4D4D',
    textSecondary: '#71717A',
    lineColor: '#E2E8F0',
    numberColor: '#FFFFFF',
  },
  'arrow-list': { primaryColor: '#0066FF', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'ordered-list': { primaryColor: '#0066FF', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'marker-list': { primaryColor: '#0066FF', textPrimary: '#4D4D4D', textSecondary: '#71717A', numberColor: '#FFFFFF' },
};

// Kateto theme
const katetoTheme: Partial<Record<ComponentType, ComponentThemeConfig>> = {
  card: { borderColor: '#E2E8F0' },
  'action-button': { primaryColor: '#004D7A', textPrimary: '#FFFFFF' },
  'big-int': { primaryColor: '#004D7A' },
  section: { titleColor: '#004D7A' },
  'label-value': { textPrimary: '#4A4A4A', textSecondary: '#004D7A' },
  link: { primaryColor: '#4338CA' },
  'title-description': { textPrimary: '#004D7A', textSecondary: '#71717A' },
  'ordered-description': {
    primaryColor: '#004D7A',
    textPrimary: '#4D4D4D',
    textSecondary: '#71717A',
    lineColor: '#E2E8F0',
    numberColor: '#FFFFFF',
  },
  'arrow-list': { primaryColor: '#004D7A', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'ordered-list': { primaryColor: '#004D7A', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'marker-list': { primaryColor: '#004D7A', textPrimary: '#4D4D4D', textSecondary: '#71717A', numberColor: '#FFFFFF' },
};

// Borum theme
const borumTheme: Partial<Record<ComponentType, ComponentThemeConfig>> = {
  card: { borderColor: '#E0E0E0' },
  'action-button': { primaryColor: '#6F61D1', textPrimary: '#FFFFFF' },
  'big-int': { primaryColor: '#212121' },
  section: { titleColor: '#212121' },
  'label-value': { textPrimary: '#4A4A4A', textSecondary: '#212121' },
  link: { primaryColor: '#3E3B92' },
  'title-description': { primaryColor: '#3E3B92', textPrimary: '#3E3B92', textSecondary: '#666666' },
  'ordered-description': {
    primaryColor: '#6F61D1',
    textPrimary: '#4D4D4D',
    textSecondary: '#71717A',
    lineColor: '#E2E8F0',
    numberColor: '#FFFFFF',
  },
  'arrow-list': { primaryColor: '#3E3B92', textPrimary: '#3E3B92', textSecondary: '#666666' },
  'ordered-list': { primaryColor: '#3E3B92', textPrimary: '#3E3B92', textSecondary: '#666666' },
  'marker-list': { primaryColor: '#3E3B92', textPrimary: '#3E3B92', textSecondary: '#666666', numberColor: '#FFFFFF' },
};

// Default theme (based on Hurst)
const defaultTheme: Partial<Record<ComponentType, ComponentThemeConfig>> = {
  card: { borderColor: '#E2E8F0' },
  'action-button': { primaryColor: '#212121', textPrimary: '#FFFFFF' },
  'big-int': { primaryColor: '#212121' },
  section: { titleColor: '#212121' },
  'label-value': { textPrimary: '#4A4A4A', textSecondary: '#212121' },
  link: { primaryColor: '#4338CA' },
  'title-description': { textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'ordered-description': {
    primaryColor: '#212121',
    textPrimary: '#4D4D4D',
    textSecondary: '#71717A',
    lineColor: '#E2E8F0',
    numberColor: '#FFFFFF',
  },
  'arrow-list': { primaryColor: '#212121', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'ordered-list': { primaryColor: '#212121', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'marker-list': { primaryColor: '#212121', textPrimary: '#4D4D4D', textSecondary: '#71717A', numberColor: '#FFFFFF' },
};

// Originator themes - only explicit themes, others fallback to defaultTheme
const originatorThemes: Partial<Record<Originator, Partial<Record<ComponentType, ComponentThemeConfig>>>> = {
  hurst: hurstTheme,
  borum: borumTheme,
  ahlex: ahlexTheme,
  kateto: katetoTheme,
};

// ============================================
// Theme Helpers
// ============================================

function isHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
}

function mergeThemes(primary: ComponentThemeConfig, fallback?: ComponentThemeConfig): ComponentThemeConfig {
  if (!fallback) return primary;

  return {
    primaryColor: primary.primaryColor ?? fallback.primaryColor,
    textPrimary: primary.textPrimary ?? fallback.textPrimary,
    textSecondary: primary.textSecondary ?? fallback.textSecondary,
    borderColor: primary.borderColor ?? fallback.borderColor,
    backgroundColor: primary.backgroundColor ?? fallback.backgroundColor,
    titleColor: primary.titleColor ?? fallback.titleColor,
    lineColor: primary.lineColor ?? fallback.lineColor,
    numberColor: primary.numberColor ?? fallback.numberColor,
  };
}

// ============================================
// Public API
// ============================================

export function getComponentTheme(originator: string, componentType: ComponentType): ComponentThemeConfig | undefined {
  const normalizedOriginator = originator.toLowerCase() as Originator;
  const theme = originatorThemes[normalizedOriginator] ?? defaultTheme;
  return theme[componentType];
}

export function getThemeFromHex(colorTheme?: string): ComponentThemeConfig | undefined {
  if (!colorTheme || !isHexColor(colorTheme)) return undefined;
  return { primaryColor: colorTheme };
}

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
