export const colors = {
  primary: {
    default: '#137C78', // Deep teal
    hover: '#0E5F5C', // Darker teal
    light: '#DDECE5', // Soft mint (secondary surface)
    accent: '#199B96', // Mid teal
    dark: '#203A3B', // Headings / dark teal
    blue600: '#158B86', // Primary shade alias for backward compatibility
    tealDeep: '#137C78',
    tealDark: '#203A3B',
    mintSoft: '#DDECE5',
  },
  secondary: {
    surface: '#DDECE5', // Soft mint
    surfaceLight: '#F0F7F4',
    surfaceBorder: '#C8DDD4',
    text: '#203A3B',
  },
  headings: '#203A3B', // Dark teal headings
  neutral: {
    white: '#ffffff',
    slate50: '#F8FAF9', // Clean surface off-white
    slate100: '#F0F4F2', // Soft neutral surface
    slate200: '#E1E8E5', // Restrained neutral border
    slate300: '#CAD4D0',
    slate400: '#8E9E98',
    slate500: '#5F706B', // Muted accessible body text
    slate600: '#43534E',
    slate700: '#2E3D38',
    slate800: '#1D2A26',
    slate900: '#203A3B', // Primary text & headings
  },
  emergency: {
    red50: 'rgba(239, 68, 68, 0.05)',
    red100: '#fee2e2',
    red150: 'rgba(239, 68, 68, 0.15)',
    red300: '#fca5a5',
    red500: '#ef4444',
    red700: '#b91c1c',
    red800: '#991b1b',
    red900: '#7f1d1d',
  },
  status: {
    success: '#10b981', // green-500
    successSurface: '#D1FAE5',
    successBorder: '#A7F3D0',
    successText: '#065F46',
    error: '#ef4444', // red-500
    errorSurface: '#FEE2E2',
    errorBorder: '#FCA5A5',
    errorText: '#991B1B',
    warning: '#f59e0b', // amber-500
    warningSurface: '#FEF3C7',
    warningBorder: '#FDE68A',
    warningText: '#92400E',
    info: '#137C78', // deep teal
    infoSurface: '#DDECE5',
    infoBorder: '#C8DDD4',
    infoText: '#203A3B',
  },
  rgb: {
    white: '255, 255, 255',
    black: '0, 0, 0',
    slate50: '248, 250, 249',
    slate100: '240, 244, 242',
    slate200: '225, 232, 229',
    slate900: '32, 58, 59',
    primary: '19, 124, 120', // #137C78
    primaryDark: '32, 58, 59', // #203A3B
    secondarySurface: '221, 236, 229', // #DDECE5
    red500: '239, 68, 68',
    red100: '254, 226, 226',
  }
} as const;

export default colors;
