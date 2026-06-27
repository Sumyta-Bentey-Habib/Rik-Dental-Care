'use client';

import React, { useState } from 'react';
import { Calendar, User, HeartPulse } from 'lucide-react';
import { User as UserType, Appointment } from '../../data/dummy-data';
import { FilterStatus } from '../../hooks/useAppointments';
import {
  DASHBOARD_TEXT,
  DOCTOR_OPTIONS,
  TREATMENT_OPTIONS,
} from '../../utils/constants';
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
  const [doctor, setDoctor] = useState<string>(DOCTOR_OPTIONS[0].value);
  const [treatment, setTreatment] = useState<string>(TREATMENT_OPTIONS[0].value);
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
          <WelcomeTitle>{DASHBOARD_TEXT.welcomePrefix}{user.name}</WelcomeTitle>
          <WelcomeSubtitle>
            {DASHBOARD_TEXT.welcomeSubtitle}
          </WelcomeSubtitle>
        </HeaderWelcome>
      </DashboardHeader>

      <DashboardGrid>
        <MainColumn>
          <Card>
            <FilterBar>
              <CardTitle>
                <Calendar size={18} />
                {DASHBOARD_TEXT.appointmentsTitle}
              </CardTitle>
              <FilterButtons>
                <FilterButton
                  $active={filter === 'all'}
                  onClick={() => setFilter('all')}
                >
                  {DASHBOARD_TEXT.filterAll}
                </FilterButton>
                <FilterButton
                  $active={filter === 'upcoming'}
                  onClick={() => setFilter('upcoming')}
                >
                  {DASHBOARD_TEXT.filterUpcoming}
                </FilterButton>
                <FilterButton
                  $active={filter === 'past'}
                  onClick={() => setFilter('past')}
                >
                  {DASHBOARD_TEXT.filterPast}
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
                          {DASHBOARD_TEXT.cancelLabel}
                        </ActionLink>
                      )}
                    </StatusBadgeWrapper>
                  </AppointmentItem>
                ))
              ) : (
                <p>{DASHBOARD_TEXT.noAppointments}</p>
              )}
            </AppointmentList>
          </Card>

          <Card>
            <CardTitle>
              <HeartPulse size={18} />
              {DASHBOARD_TEXT.bookNewTitle}
            </CardTitle>
            <form onSubmit={handleBook}>
              <FormRow>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{DASHBOARD_TEXT.selectDoctor}</label>
                  <StyledSelect
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  >
                    {DOCTOR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </StyledSelect>
                </FormField>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{DASHBOARD_TEXT.treatmentType}</label>
                  <StyledSelect
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                  >
                    {TREATMENT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </StyledSelect>
                </FormField>
              </FormRow>

              <FormRow>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{DASHBOARD_TEXT.dateLabel}</label>
                  <StyledInput
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </FormField>
                <FormField>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>{DASHBOARD_TEXT.preferredTime}</label>
                  <StyledInput
                    type="text"
                    placeholder={DASHBOARD_TEXT.timePlaceholder}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </FormField>
              </FormRow>

              <SubmitBookingButton type="submit">
                {DASHBOARD_TEXT.submitBooking}
              </SubmitBookingButton>
            </form>
          </Card>
        </MainColumn>

        <SidebarColumn>
          <Card>
            <CardTitle>
              <User size={18} />
              {DASHBOARD_TEXT.patientProfile}
            </CardTitle>
            <InfoList>
              <InfoRow>
                <InfoLabel>{DASHBOARD_TEXT.patientId}</InfoLabel>
                <InfoValue>{user.id}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>{DASHBOARD_TEXT.dob}</InfoLabel>
                <InfoValue>{user.dob}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>{DASHBOARD_TEXT.phone}</InfoLabel>
                <InfoValue>{user.phone}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>{DASHBOARD_TEXT.memberSince}</InfoLabel>
                <InfoValue>{user.memberSince}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>{DASHBOARD_TEXT.insuranceProvider}</InfoLabel>
                <InfoValue>{user.insuranceProvider}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>{DASHBOARD_TEXT.policyNumber}</InfoLabel>
                <InfoValue>{user.policyNumber}</InfoValue>
              </InfoRow>
            </InfoList>
          </Card>

          <Card>
            <CardTitle>{DASHBOARD_TEXT.teaserTitle}</CardTitle>
            <AIChatTeaser>
              <TeaserText>
                {DASHBOARD_TEXT.teaserDesc}
              </TeaserText>
              <TeaserButton onClick={onNavigateToChat}>
                {DASHBOARD_TEXT.teaserBtn}
              </TeaserButton>
            </AIChatTeaser>
          </Card>
        </SidebarColumn>
      </DashboardGrid>
    </DashboardWrapper>
  );
};

export default Dashboard;
