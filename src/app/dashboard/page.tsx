'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { User } from '@/types';
import { useAppointments } from '@/hooks/useAppointments';
import { Dashboard } from '@/features/dashboard';
import { ROUTES } from '@/constants/routes';

export default function DashboardPage() {
  const router = useRouter();

  const userJson = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => (typeof window !== 'undefined' ? sessionStorage.getItem('user') : null),
    () => null
  );

  const user = useMemo<User | null>(() => {
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }, [userJson]);

  const {
    appointments,
    filteredAppointments,
    filter,
    setFilter,
    cancelAppointment,
    addAppointment,
    updateAppointmentStatus,
  } = useAppointments();

  useEffect(() => {
    if (typeof window !== 'undefined' && !sessionStorage.getItem('user')) {
      router.replace(ROUTES.LOGIN);
    }
  }, [router]);

  if (!user) return null;

  return (
    <Dashboard
      user={user}
      appointments={filteredAppointments}
      allAppointments={appointments}
      filter={filter}
      setFilter={setFilter}
      onCancelAppointment={cancelAppointment}
      onAddAppointment={addAppointment}
      onUpdateAppointmentStatus={updateAppointmentStatus}
      onNavigateToChat={() => router.push(ROUTES.CHAT)}
    />
  );
}
