'use client';

import { useRouter } from 'next/navigation';
import { Auth } from '../../../page/auth';
import { ROUTES } from '../../../utils/routes';
import { User } from '../../../data/dummy-data';

export default function RegistrationPage() {
  const router = useRouter();

  const handleLoginSuccess = (user: User) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <Auth
      onLoginSuccess={handleLoginSuccess}
      onNavigateToHome={() => router.push(ROUTES.HOME)}
      onToggleMode={() => router.push(ROUTES.LOGIN)}
      initialMode="register"
    />
  );
}
