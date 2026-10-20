import { colors } from './colors';
import { breakpoints, media } from './breakpoints';

/**
 * Rik Dental Care Design System Tokens
 * Healthcare-tailored premium theme configuration
 */

export const typography = {
  fonts: {
    sans: 'var(--font-geist-sans), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'var(--font-geist-sans), "Outfit", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: 'var(--font-geist-mono), SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
  },
  sizes: {
    '2xs': '10px',
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '32px',
    '5xl': '40px',
    '6xl': '52px',
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extraBold: 800,
  },
  lineHeights: {
    none: 1,
    tight: 1.15,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
    loose: 1.8,
  },
  letterSpacings: {
    tighter: '-0.03em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const spacing = {
  none: '0px',
  '3xs': '2px',
  '2xs': '4px',
  xs: '6px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
  '6xl': '80px',
  '7xl': '100px',
} as const;

export const layout = {
  containerMaxWidth: '1200px',
  containerPadding: '24px',
  contentNarrowWidth: '800px',
  sidebarWidth: '280px',
  sidebarCollapsedWidth: '80px',
  headerHeight: '72px',
} as const;

export const radii = {
  none: '0px',
  xs: '6px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  pill: '9999px',
} as const;

export const shadows = {
  none: 'none',
  subtle: '0 1px 3px rgba(32, 58, 59, 0.04), 0 1px 2px rgba(32, 58, 59, 0.02)',
  sm: '0 2px 6px rgba(32, 58, 59, 0.05)',
  md: '0 4px 14px rgba(32, 58, 59, 0.06)',
  lg: '0 10px 25px rgba(32, 58, 59, 0.08)',
  xl: '0 20px 40px rgba(32, 58, 59, 0.10)',
  card: '0 4px 20px rgba(32, 58, 59, 0.04)',
  cardHover: '0 10px 30px rgba(32, 58, 59, 0.08)',
  primary: '0 4px 14px rgba(19, 124, 120, 0.25)',
  primaryHover: '0 8px 24px rgba(19, 124, 120, 0.35)',
  focus: '0 0 0 3px rgba(19, 124, 120, 0.20)',
} as const;

export const borders = {
  none: 'none',
  subtle: `1px solid rgba(${colors.rgb.slate200}, 0.8)`,
  default: `1px solid ${colors.neutral.slate200}`,
  strong: `1px solid ${colors.neutral.slate300}`,
  secondarySurface: `1px solid ${colors.secondary.surfaceBorder}`,
  primary: `1px solid ${colors.primary.default}`,
  focus: `2px solid ${colors.primary.default}`,
  error: `1px solid ${colors.status.error}`,
} as const;

export const focusState = {
  outline: `2px solid ${colors.primary.default}`,
  outlineOffset: '2px',
  boxShadow: shadows.focus,
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.16, 1, 0.3, 1)',
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  layout,
  radii,
  shadows,
  borders,
  focusState,
  transitions,
  breakpoints,
  media,
} as const;

export default theme;
