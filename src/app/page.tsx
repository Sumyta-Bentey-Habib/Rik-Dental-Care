'use client';

import { useRouter } from 'next/navigation';
import { Home } from '@/features/home';
import { ROUTES } from '@/constants/routes';

export default function HomePage() {
  const router = useRouter();
  const isLoggedIn = typeof window !== 'undefined' && !!sessionStorage.getItem('user');

  return (
    <Home
      isLoggedIn={isLoggedIn}
      onNavigateToAuth={(mode = 'login') => router.push(mode === 'register' ? ROUTES.REGISTER : ROUTES.LOGIN)}
      onNavigateToChat={() => router.push(ROUTES.CHAT)}
    />
  );
}
