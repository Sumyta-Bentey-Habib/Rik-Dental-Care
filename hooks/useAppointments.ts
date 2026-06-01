import { useState, useCallback, useMemo } from 'react';
import { Appointment, mockAppointments } from '../data/dummy-data';

export type FilterStatus = 'all' | 'upcoming' | 'past';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return [...mockAppointments];
  });
  const [filter, setFilter] = useState<FilterStatus>('all');

  // Hardcoded reference date based on the system date provided (June 1, 2026)
  const REFERENCE_DATE = '2026-06-01';

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      if (filter === 'all') return true;
      
      const isUpcoming = appt.date >= REFERENCE_DATE && appt.status !== 'completed' && appt.status !== 'cancelled';
      
      if (filter === 'upcoming') {
        return isUpcoming;
      } else {
        // past
        return !isUpcoming || appt.status === 'completed' || appt.status === 'cancelled';
      }
    });
  }, [appointments, filter]);

  const addAppointment = useCallback((newAppt: Omit<Appointment, 'id' | 'status'>) => {
    const appointment: Appointment = {
      ...newAppt,
      id: `appt_${Date.now()}`,
      status: 'pending'
    };
    setAppointments((prev) => [appointment, ...prev]);
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: 'cancelled' } : appt
      )
    );
  }, []);

  return {
    appointments,
    filteredAppointments,
    filter,
    setFilter,
    addAppointment,
    cancelAppointment
  };
};
