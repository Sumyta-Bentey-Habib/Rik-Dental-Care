import { useState, useCallback, useMemo } from 'react';
import { Appointment } from '@/types';
import { mockAppointments } from '@/data/dummy-data';
import {
  APPOINTMENT_FILTER,
  APPOINTMENT_STATUS,
  DASHBOARD_INITIAL_VALUES
} from '@/constants/constants';

export type FilterStatus = 'all' | 'upcoming' | 'past';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    return [...mockAppointments];
  });
  const [filter, setFilter] = useState<FilterStatus>(APPOINTMENT_FILTER.ALL);

  // Reference date imported from constants
  const REFERENCE_DATE = DASHBOARD_INITIAL_VALUES.REFERENCE_DATE;

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      if (filter === APPOINTMENT_FILTER.ALL) return true;
      
      const isUpcoming = appt.date >= REFERENCE_DATE && 
                         appt.status !== APPOINTMENT_STATUS.COMPLETED && 
                         appt.status !== APPOINTMENT_STATUS.CANCELLED;
      
      if (filter === APPOINTMENT_FILTER.UPCOMING) {
        return isUpcoming;
      } else {
        // past
        return !isUpcoming || 
               appt.status === APPOINTMENT_STATUS.COMPLETED || 
               appt.status === APPOINTMENT_STATUS.CANCELLED;
      }
    });
  }, [appointments, filter, REFERENCE_DATE]);

  const addAppointment = useCallback((newAppt: Omit<Appointment, 'id' | 'status'>) => {
    const appointment: Appointment = {
      ...newAppt,
      id: `appt_${Date.now()}`,
      status: APPOINTMENT_STATUS.PENDING
    };
    setAppointments((prev) => [appointment, ...prev]);
  }, []);

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: APPOINTMENT_STATUS.CANCELLED } : appt
      )
    );
  }, []);

  const updateAppointmentStatus = useCallback((id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status } : appt
      )
    );
  }, []);

  return {
    appointments,
    filteredAppointments,
    filter,
    setFilter,
    addAppointment,
    cancelAppointment,
    updateAppointmentStatus
  };
};
