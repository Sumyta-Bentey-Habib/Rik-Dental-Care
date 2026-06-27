export const colors = {
  primary: {
    default: '#1d4ed8', // blue-700
    hover: '#1e40af', // blue-800
    light: '#eff6ff', // blue-50
    accent: '#3b82f6', // blue-500
    dark: '#1e3a8a', // blue-900
    blue600: '#2563eb', // blue-600
  },
  neutral: {
    white: '#ffffff',
    slate50: '#f8fafc',
    slate100: '#f1f5f9',
    slate200: '#e2e8f0',
    slate300: '#cbd5e1',
    slate400: '#94a3b8',
    slate500: '#64748b',
    slate600: '#475569',
    slate700: '#334155',
    slate900: '#0f172a',
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
    error: '#ef4444', // red-500
    warning: '#f59e0b', // amber-500
  },
  rgb: {
    white: '255, 255, 255',
    black: '0, 0, 0',
    slate50: '248, 250, 252',
    slate100: '241, 245, 249',
    slate200: '226, 232, 240',
    primary: '29, 78, 216',
    red500: '239, 68, 68',
    red100: '254, 226, 226',
  }
} as const;

export default colors;
