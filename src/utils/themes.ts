import type { ComponentType } from '../components/pdf/render/types';
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
}

// ============================================
// Originator Themes
// ============================================

// Hurst theme - primary/default
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
  },
  'arrow-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'ordered-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
  'marker-list': { primaryColor: '#FFCC00', textPrimary: '#4D4D4D', textSecondary: '#71717A' },
};

// Borum theme
const borumTheme: Partial<Record<ComponentType, ComponentThemeConfig>> = {
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
};

// Originator themes - only explicit themes, others fallback to hurst
const originatorThemes: Partial<Record<Originator, Partial<Record<ComponentType, ComponentThemeConfig>>>> = {
  hurst: hurstTheme,
  borum: borumTheme,
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
  };
}

// ============================================
// Public API
// ============================================

export function getComponentTheme(originator: string, componentType: ComponentType): ComponentThemeConfig | undefined {
  const normalizedOriginator = originator.toLowerCase() as Originator;
  const theme = originatorThemes[normalizedOriginator] ?? hurstTheme;
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
