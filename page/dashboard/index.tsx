'use client';

import React, { useState } from 'react';
import { Calendar, User, HeartPulse } from 'lucide-react';
import { User as UserType, Appointment } from '../../data/dummy-data';
import { FilterStatus } from '../../hooks/useAppointments';
import {
  DashboardWrapper,
  DashboardHeader,
  HeaderWelcome,
  WelcomeTitle,
  WelcomeSubtitle,
  DashboardGrid,
  MainColumn,
  SidebarColumn,
  Card,
  CardTitle,
  FilterBar,
  FilterButtons,
  FilterButton,
  AppointmentList,
  AppointmentItem,
  AppointmentMeta,
  AppointmentDateText,
  AppointmentDoctorText,
  AppointmentDetailsText,
  StatusBadgeWrapper,
  StatusBadge,
  ActionLink,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  AIChatTeaser,
  TeaserText,
  TeaserButton,
  FormField,
  FormRow,
  StyledSelect,
  StyledInput,
  SubmitBookingButton
} from './style';

interface DashboardProps {
  user: UserType;
  appointments: Appointment[];
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  onCancelAppointment: (id: string) => void;
  onAddAppointment: (appt: Omit<Appointment, 'id' | 'status'>) => void;
  onNavigateToChat: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  appointments,
  filter,
  setFilter,
  onCancelAppointment,
  onAddAppointment,
  onNavigateToChat
}) => {
  // Booking form local state
  const [doctor, setDoctor] = useState('Dr. Marcus Vance');
  const [treatment, setTreatment] = useState('Routine Clean & Scaling');
  const [date, setDate] = useState('2026-06-18');
  const [time, setTime] = useState('09:30 AM');

  const getSpecialty = (doc: string) => {
    if (doc.includes('Sarah Jenkins')) return 'Orthodontics';
    if (doc.includes('Evelyn Ross')) return 'Oral Surgery';
    return 'General Dentistry';
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;

    onAddAppointment({
      doctorName: doctor,
      specialty: getSpecialty(doctor),
      date,
      time,
      type: treatment,
      notes: 'Scheduled via patient portal.'
    });

    // Reset date to a default
    setDate('2026-06-18');
  };

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <HeaderWelcome>
          <WelcomeTitle>Welcome back, {user.name}</WelcomeTitle>
          <WelcomeSubtitle>
            Here is your dental health summary and upcoming visits.
          </WelcomeSubtitle>
        </HeaderWelcome>
      </DashboardHeader>

      <DashboardGrid>
        <MainColumn>
          <Card>
            <FilterBar>
              <CardTitle>
                <Calendar size={18} />
                Dental Appointments
              </CardTitle>
              <FilterButtons>
                <FilterButton
                  $active={filter === 'all'}
                  onClick={() => setFilter('all')}
                >
                  All
                </FilterButton>
                <FilterButton
                  $active={filter === 'upcoming'}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming
                </FilterButton>
                <FilterButton
                  $active={filter === 'past'}
                  onClick={() => setFilter('past')}
                >
                  Past
                </FilterButton>
              </FilterButtons>
            </FilterBar>

            <AppointmentList>
              {appointments.length > 0 ? (
                appointments.map((appt) => (
                  <AppointmentItem key={appt.id}>
                    <AppointmentMeta>
                      <AppointmentDateText>
                        {appt.date} at {appt.time}
                      </AppointmentDateText>
                      <AppointmentDoctorText>
                        {appt.doctorName} ({appt.specialty})
                      </AppointmentDoctorText>
                      <AppointmentDetailsText>{appt.type}</AppointmentDetailsText>
                    </AppointmentMeta>

                    <StatusBadgeWrapper>
                      <StatusBadge $status={appt.status}>{appt.status}</StatusBadge>
                      {appt.status !== 'completed' && appt.status !== 'cancelled' && (
                        <ActionLink onClick={() => onCancelAppointment(appt.id)}>
                          Cancel
                        </ActionLink>
                      )}
                    </StatusBadgeWrapper>
                  </AppointmentItem>
                ))
              ) : (
                <p>No appointments found matching this filter.</p>
              )}
            </AppointmentList>
          </Card>

          <Card>
            <CardTitle>
              <HeartPulse size={18} />
              Book New Appointment
            </CardTitle>
            <form onSubmit={handleBook}>
              <FormRow>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Select Doctor</label>
                  <StyledSelect
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  >
                    <option value="Dr. Marcus Vance">Dr. Marcus Vance (General)</option>
                    <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Orthodontist)</option>
                    <option value="Dr. Evelyn Ross">Dr. Evelyn Ross (Surgeon)</option>
                  </StyledSelect>
                </FormField>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Treatment Type</label>
                  <StyledSelect
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                  >
                    <option value="Routine Clean & Scaling">Routine Clean & Scaling</option>
                    <option value="Cavity Filling">Cavity Filling</option>
                    <option value="Invisalign Consultation">Invisalign Consultation</option>
                    <option value="Tooth Extraction">Tooth Extraction</option>
                  </StyledSelect>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Date</label>
                  <StyledInput
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </FormField>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Preferred Time</label>
                  <StyledInput
                    type="text"
                    placeholder="e.g. 10:30 AM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </FormField>
              </FormRow>

              <SubmitBookingButton type="submit">
                Submit Appointment Request
              </SubmitBookingButton>
            </form>
          </Card>
        </MainColumn>

        <SidebarColumn>
          <Card>
            <CardTitle>
              <User size={18} />
              Patient Profile
            </CardTitle>
            <InfoList>
              <InfoRow>
                <InfoLabel>Patient ID</InfoLabel>
                <InfoValue>{user.id}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Date of Birth</InfoLabel>
                <InfoValue>{user.dob}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Phone</InfoLabel>
                <InfoValue>{user.phone}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Member Since</InfoLabel>
                <InfoValue>{user.memberSince}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Insurance Provider</InfoLabel>
                <InfoValue>{user.insuranceProvider}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Policy Number</InfoLabel>
                <InfoValue>{user.policyNumber}</InfoValue>
              </InfoRow>
            </InfoList>
          </Card>

          <Card>
            <CardTitle>AI Assistant Advisor</CardTitle>
            <AIChatTeaser>
              <TeaserText>
                Have questions about tooth sensitivity, pain relief, or post-treatment dental care? Talk to our instant AI assistant.
              </TeaserText>
              <TeaserButton onClick={onNavigateToChat}>
                Start AI Chat
              </TeaserButton>
            </AIChatTeaser>
          </Card>
        </SidebarColumn>
      </DashboardGrid>
    </DashboardWrapper>
  );
};

export default Dashboard;
