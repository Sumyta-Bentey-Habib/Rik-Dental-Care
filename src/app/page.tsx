'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from '@/features/home';
import { ROUTES } from '@/constants/routes';
import { USER_SESSION_KEY } from '@/constants/constants';

export default function HomePage() {
  const router = useRouter();

  const userJson = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => (typeof window !== 'undefined' ? sessionStorage.getItem(USER_SESSION_KEY) : null),
    () => null
  );
  const isLoggedIn = !!userJson;

  return (
    <Home
      isLoggedIn={isLoggedIn}
      onNavigateToAuth={(mode = 'login') => router.push(mode === 'register' ? ROUTES.REGISTER : ROUTES.LOGIN)}
      onNavigateToChat={() => router.push(ROUTES.CHAT)}
      onNavigateToSpecialists={() => router.push(ROUTES.SPECIALISTS)}
      onNavigateToEmergency={() => router.push(ROUTES.EMERGENCY)}
      onNavigateToDashboard={() => router.push(ROUTES.DASHBOARD)}
    />
  );
}
