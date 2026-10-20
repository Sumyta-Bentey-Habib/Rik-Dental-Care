'use client';

import { useRouter } from 'next/navigation';
import { Auth, AuthMode } from '@/features/auth';
import { ROUTES } from '@/constants/routes';
import { User } from '@/types';

export default function PasswordRecoveryPage() {
  const router = useRouter();

  const handleLoginSuccess = (user: User) => {
    sessionStorage.setItem('user', JSON.stringify(user));
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
      initialMode="recovery"
    />
  );
}
