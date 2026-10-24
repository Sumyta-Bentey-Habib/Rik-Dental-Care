'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth, AuthMode } from '@/features/auth';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';

export default function RegistrationPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLoginSuccess = () => {
    router.push(ROUTES.DASHBOARD);
  };

  const handleToggleMode = (mode?: AuthMode) => {
    if (mode === 'register') {
      router.push(ROUTES.REGISTER);
    } else if (mode === 'recovery') {
      router.push(ROUTES.RECOVERY);
    } else {
      router.push(ROUTES.LOGIN);
    }
  };

  return (
    <Auth
      onLoginSuccess={handleLoginSuccess}
      onNavigateToHome={() => router.push(ROUTES.HOME)}
      onToggleMode={handleToggleMode}
      initialMode="register"
    />
  );
}
