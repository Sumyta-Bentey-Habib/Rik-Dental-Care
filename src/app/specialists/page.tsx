'use client';

import { useRouter } from 'next/navigation';
import { Specialists } from '@/features/specialists';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';

export default function SpecialistsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const isLoggedIn = isAuthenticated || (typeof window !== 'undefined' && !!sessionStorage.getItem('user'));

  return (
    <Specialists
      isLoggedIn={isLoggedIn}
      onNavigateToAuth={() => router.push(ROUTES.LOGIN)}
      onNavigateToDashboard={() => router.push(ROUTES.DASHBOARD)}
    />
  );
}
