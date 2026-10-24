'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { Dashboard } from '@/features/dashboard';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';

export default function DashboardPage() {
  const router = useRouter();
  const { legacyUser: user, isAuthenticated, isLoading } = useAuth();

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
    if (!isLoading && !isAuthenticated && !sessionStorage.getItem('user')) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading && !user) return null;
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
