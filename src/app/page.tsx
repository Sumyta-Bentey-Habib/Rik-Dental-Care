'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Home } from '@/features/home';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated: isLoggedIn } = useAuth();

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
