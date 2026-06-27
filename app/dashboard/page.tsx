'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User } from '../../data/dummy-data';
import { useAppointments } from '../../hooks/useAppointments';
import { Dashboard } from '../../page/dashboard';
import { ROUTES } from '../../utils/routes';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const {
    filteredAppointments,
    filter,
    setFilter,
    cancelAppointment,
    addAppointment,
  } = useAppointments();

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (!stored) {
      router.replace(ROUTES.LOGIN);
    } else {
      setUser(JSON.parse(stored));
    }
  }, [router]);

  if (!user) return null;

  return (
    <Dashboard
      user={user}
      appointments={filteredAppointments}
      filter={filter}
      setFilter={setFilter}
      onCancelAppointment={cancelAppointment}
      onAddAppointment={addAppointment}
      onNavigateToChat={() => router.push(ROUTES.CHAT)}
    />
  );
}
