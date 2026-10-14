'use client';

import { useRouter } from 'next/navigation';
import { Specialists } from '@/features/specialists';
import { ROUTES } from '@/constants/routes';

export default function SpecialistsPage() {
  const router = useRouter();
  const isLoggedIn = typeof window !== 'undefined' && !!sessionStorage.getItem('user');

  return (
    <Specialists
      isLoggedIn={isLoggedIn}
      onNavigateToAuth={() => router.push(ROUTES.LOGIN)}
      onNavigateToDashboard={() => router.push(ROUTES.DASHBOARD)}
    />
  );
}
