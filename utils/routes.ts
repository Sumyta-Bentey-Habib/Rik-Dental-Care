
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/registration',
  DASHBOARD: '/dashboard',
  CHAT: '/chat',
  ABOUT: '/about',
  SPECIALISTS: '/specialists',
  EMERGENCY: '/emergency',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
