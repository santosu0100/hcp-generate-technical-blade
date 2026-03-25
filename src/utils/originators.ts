// Valid originators - single source of truth
export const ORIGINATORS = ['hurst', 'borum', 'ahlex', 'artk', 'kateto', 'muv'] as const;
export type Originator = (typeof ORIGINATORS)[number];

// Default originator when not specified
export const DEFAULT_ORIGINATOR: Originator = 'hurst';

// Logo paths by originator (Mapped to Vite absolute public path)
const logoPaths: Record<Originator, string> = {
  hurst: '/assets/originator-logo/hurst-logo.png',
  borum: '/assets/originator-logo/borum-logo.png',
  ahlex: '/assets/originator-logo/ahlex-logo.png',
  artk: '/assets/originator-logo/artk-logo.png',
  kateto: '/assets/originator-logo/kateto-logo.png',
  muv: '/assets/originator-logo/muv-logo.png',
};

// Get logo path by originator, returns default if not found
export function getLogoPath(originator: string): string {
  const validOriginator = isValidOriginator(originator) ? originator : DEFAULT_ORIGINATOR;
  return logoPaths[validOriginator];
}

// Check if a string is a valid originator
export function isValidOriginator(value: string): value is Originator {
  return ORIGINATORS.includes(value as Originator);
}
