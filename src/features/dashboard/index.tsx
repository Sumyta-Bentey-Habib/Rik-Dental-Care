'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Calendar,
  CalendarPlus,
  CalendarX,
  MessageSquare,
  Activity,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  MapPin,
  Stethoscope,
  Star,
  Menu,
  X,
  HeartPulse,
  User as UserIcon,
  Sparkles,
  CheckCircle2,
  Clock,
  Check,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Home
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';
import { User as UserType, Appointment } from '@/types';
import { mockUser, patientTreatments, recentMessages, activeDiagnoses } from '@/data/dummy-data';
import { FilterStatus } from '@/hooks/useAppointments';
import { useChat } from '@/hooks/useChat';
import { ChatWindow } from '@/components/chatWindow';
import {
  DOCTOR_OPTIONS,
  TREATMENT_OPTIONS,
  BRAND_NAME,
  DASHBOARD_ROLE,
  DASHBOARD_TAB,
  DASHBOARD_SUBTAB,
  DASHBOARD_INITIAL_VALUES,
  APPOINTMENT_FILTER,
  APPOINTMENT_STATUS,
  DASHBOARD_TEXT,
  DASHBOARD_SIDEBAR_NAV,
  DASHBOARD_ADMIN_PROFILE,
  DASHBOARD_SEARCH_PLACEHOLDER,
  PATIENT_METRICS_TEXT,
  TREATMENTS_SECTION_TEXT,
  SUBTAB_LABELS,
  INSURANCE_BANNER_TEXT,
  ADMIN_METRICS_TEXT,
  ADMIN_QUEUE_TEXT,
  ADMIN_OPS_BANNER_TEXT,
  APPOINTMENTS_TAB_TEXT,
  RECORDS_TAB_TEXT,
  ANALYTICS_TAB_TEXT,
  SETTINGS_TAB_TEXT,
  RIGHT_PANEL_TEXT,
  CLINIC_MAP_LABELS,
  DASHBOARD_DIALOG_TEXT,
  DASHBOARD_REDESIGN_TEXT
} from '@/constants/constants';
import { colors } from '@/constants/colors';
import {
  ToothIcon,
  CalendarIcon,
  MessageIcon,
  ShieldIcon,
  DentalChairIcon,
  DollarIcon,
  UsersIcon
} from '@/components/icons';
import {
  DashboardContainer,
  SidebarBackdrop,
  SidebarContainer,
  SidebarBrand,
  SidebarProfile,
  SidebarAvatar,
  SidebarName,
  SidebarRole,
  SidebarNav,
  SidebarNavItem,
  SidebarBadge,
  SidebarFooter,
  MainLayout,
  WorkspaceHeader,
  HeaderTitleGroup,
  HeaderTitle,
  HeaderSubtitle,
  HeaderControls,
  SearchInputWrapper,
  SearchInput,
  QuickBookBtn,
  ReturnHomeBtn,
  MobileToggle,
  SplitWorkspace,
  MiddleContentScroll,
  RightSidebarScroll,
  HeroUpcomingCard,
  HeroUpcomingContent,
  HeroUpcomingBadge,
  HeroUpcomingTitle,
  HeroUpcomingDetails,
  HeroUpcomingItem,
  HeroUpcomingActions,
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricTitle,
  MetricIcon,
  MetricValue,
  MetricSub,
  TableWrapper,
  TableHeaderBar,
  TableTitle,
  FilterTabGroup,
  FilterTabItem,
  FilterCountBadge,
  ResponsiveTable,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableCell,
  MobileCardsList,
  MobileAppointmentCard,
  StatusBadge,
  ActionBtn,
  EmptyStateContainer,
  EmptyStateIconCircle,
  EmptyStateTitle,
  EmptyStateDesc,
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  ModalBody,
  ModalFooter,
  DashboardCardsGrid,
  DashboardCard,
  CardImageWrapper,
  CardBody,
  CardHeaderRow,
  CardTag,
  CardRating,
  CardTitle,
  CardDoctor,
  CardLocation,
  CardPriceRow,
  CardPriceVal,
  CardActionBtn,
  HorizontalBanner,
  BannerContent,
  BannerTitle,
  BannerSubtitle,
  BannerAction,
  BannerMetric,
  BannerMetricLabel,
  PanelTitle,
  MessageList,
  MessageItem,
  MessageAvatar,
  MessageContent,
  MessageSender,
  MessageText,
  MessageBadge,
  MapViewContainer,
  MapOverlayCard,
  StyledDashboardCard,
  StyledCardTitle,
  FormRow,
  FormField,
  StyledSelect,
  StyledInput,
  SubmitBookingButton,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  AdminApptItem,
  PatientInfoRow,
  PatientMetaText,
  PatientNameText,
  PatientSubText,
  AdminActionGroup,
  AdminActionBtn,
  ClinicMapSvgWrapper,
  ProgressTrack,
  ProgressBarFill,
  ProgressRow,
  NotificationCheckGroup,
  DiagnosesList
} from './style';

interface DashboardProps {
  user: UserType;
  appointments: Appointment[];
  allAppointments: Appointment[];
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  onCancelAppointment: (id: string) => void;
  onAddAppointment: (appt: Omit<Appointment, 'id' | 'status'>) => void;
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  onNavigateToChat?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  appointments,
  allAppointments,
  filter,
  setFilter,
  onCancelAppointment,
  onAddAppointment,
  onUpdateAppointmentStatus,
  onNavigateToChat
}) => {
  const router = useRouter();

  // Navigation & Role State
  const [currentRole] = useState<'patient' | 'admin'>(user.role || DASHBOARD_ROLE.PATIENT);
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'chat' | 'records' | 'analytics' | 'settings'>(DASHBOARD_TAB.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [subTab, setSubTab] = useState<'all' | 'recommended' | 'popular' | 'nearest'>(DASHBOARD_SUBTAB.ALL);

  // Dialog & Modal States
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Booking Form State
  const [doctor, setDoctor] = useState<string>(DOCTOR_OPTIONS[0].value);
  const [treatment, setTreatment] = useState<string>(TREATMENT_OPTIONS[0].value);
  const [date, setDate] = useState<string>(DASHBOARD_INITIAL_VALUES.DATE);
  const [time, setTime] = useState<string>(DASHBOARD_INITIAL_VALUES.TIME);

  // Chat local state manager
  const { messages, isLoading: isChatLoading, sendMessage, clearChat } = useChat();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

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
      notes: APPOINTMENTS_TAB_TEXT.bookingNotes
    });

    setDate(DASHBOARD_INITIAL_VALUES.DATE);
    setIsBookingModalOpen(false);
    setActiveTab(DASHBOARD_TAB.APPOINTMENTS);
  };

  const appointmentToCancel = useMemo(() => {
    if (!cancelTargetId) return null;
    return allAppointments.find((a) => a.id === cancelTargetId) || null;
  }, [cancelTargetId, allAppointments]);

  const confirmCancel = () => {
    if (cancelTargetId) {
      onCancelAppointment(cancelTargetId);
      setCancelTargetId(null);
    }
  };

  // Next upcoming visit
  const nextUpcoming = useMemo(() => {
    return appointments.find(
      (a) => a.status === APPOINTMENT_STATUS.CONFIRMED || a.status === APPOINTMENT_STATUS.PENDING
    );
  }, [appointments]);

  // Appointment counts by filter
  const appointmentCounts = useMemo(() => {
    return {
      all: appointments.length,
      upcoming: appointments.filter(
        (a) => a.status === APPOINTMENT_STATUS.CONFIRMED || a.status === APPOINTMENT_STATUS.PENDING
      ).length,
      past: appointments.filter((a) => a.status === APPOINTMENT_STATUS.COMPLETED).length,
      cancelled: appointments.filter((a) => a.status === APPOINTMENT_STATUS.CANCELLED).length
    };
  }, [appointments]);

  // Filtered treatment lists for patient
  const filteredTreatments = useMemo(() => {
    return patientTreatments.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubTab = subTab === 'all' || t.tag.toLowerCase() === subTab;
      return matchesSearch && matchesSubTab;
    });
  }, [searchQuery, subTab]);

  // Filtered appointments lists for admin queue
  const filteredAdminAppointments = useMemo(() => {
    return allAppointments.filter((appt) => {
      return (
        appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (appt.notes && appt.notes.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [allAppointments, searchQuery]);

  // Today's formatted date
  const formattedToday = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  return (
    <DashboardContainer>
      {/* Mobile Drawer Backdrop */}
      <SidebarBackdrop $isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />

      {/* 1. LEFT SIDEBAR */}
      <SidebarContainer $isOpen={isSidebarOpen}>
        <div>
          {/* Logo Brand */}
          <SidebarBrand
            onClick={() => router.push(ROUTES.HOME)}
            title={DASHBOARD_TEXT.returnHomeBtn}
            role="button"
            tabIndex={0}
          >
            <Stethoscope size={24} />
            <h2>
              {BRAND_NAME.first}
              <span>{BRAND_NAME.second}</span>
            </h2>
            <button
              type="button"
              className="mobile-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(false);
              }}
              aria-label={DASHBOARD_DIALOG_TEXT.closeModal}
            >
              <X size={20} />
            </button>
          </SidebarBrand>

          {/* User Profile */}
          <SidebarProfile>
            <SidebarAvatar>
              {currentRole === DASHBOARD_ROLE.ADMIN ? (
                <Image
                  src={DASHBOARD_ADMIN_PROFILE.avatar}
                  alt={DASHBOARD_ADMIN_PROFILE.name}
                  width={68}
                  height={68}
                />
              ) : (
                <span>{user.name.split(' ').map((n) => n[0]).join('')}</span>
              )}
            </SidebarAvatar>
            <SidebarName>
              {currentRole === DASHBOARD_ROLE.ADMIN ? DASHBOARD_ADMIN_PROFILE.name : user.name}
            </SidebarName>
            <SidebarRole>
              {currentRole === DASHBOARD_ROLE.ADMIN
                ? DASHBOARD_ADMIN_PROFILE.role
                : `${DASHBOARD_TEXT.patientId}: ${user.id}`}
            </SidebarRole>
          </SidebarProfile>

          {/* Sidebar Menu Navigation */}
          <SidebarNav>
            <SidebarNavItem
              type="button"
              $active={false}
              onClick={() => router.push(ROUTES.HOME)}
            >
              <Home size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.returnHome}</span>
            </SidebarNavItem>

            <SidebarNavItem
              type="button"
              $active={activeTab === DASHBOARD_TAB.OVERVIEW}
              onClick={() => {
                setActiveTab(DASHBOARD_TAB.OVERVIEW);
                setIsSidebarOpen(false);
              }}
            >
              <LayoutDashboard size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.dashboard}</span>
            </SidebarNavItem>

            <SidebarNavItem
              type="button"
              $active={activeTab === DASHBOARD_TAB.APPOINTMENTS}
              onClick={() => {
                setActiveTab(DASHBOARD_TAB.APPOINTMENTS);
                setIsSidebarOpen(false);
              }}
            >
              <Calendar size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.appointments}</span>
              <SidebarBadge>
                {currentRole === DASHBOARD_ROLE.ADMIN
                  ? allAppointments.filter((a) => a.status === APPOINTMENT_STATUS.PENDING).length
                  : appointments.filter(
                      (a) =>
                        a.status === APPOINTMENT_STATUS.CONFIRMED ||
                        a.status === APPOINTMENT_STATUS.PENDING
                    ).length}
              </SidebarBadge>
            </SidebarNavItem>

            <SidebarNavItem
              type="button"
              $active={activeTab === DASHBOARD_TAB.CHAT}
              onClick={() => {
                setActiveTab(DASHBOARD_TAB.CHAT);
                setIsSidebarOpen(false);
              }}
            >
              <MessageSquare size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.aiChatAssistant}</span>
              <SidebarBadge>{DASHBOARD_SIDEBAR_NAV.chatBadgeCount}</SidebarBadge>
            </SidebarNavItem>

            <SidebarNavItem
              type="button"
              $active={activeTab === DASHBOARD_TAB.RECORDS}
              onClick={() => {
                setActiveTab(DASHBOARD_TAB.RECORDS);
                setIsSidebarOpen(false);
              }}
            >
              <Activity size={18} />
              <span>
                {currentRole === DASHBOARD_ROLE.ADMIN
                  ? DASHBOARD_SIDEBAR_NAV.clinicRecords
                  : DASHBOARD_SIDEBAR_NAV.dentalHealthRecord}
              </span>
            </SidebarNavItem>

            <SidebarNavItem
              type="button"
              $active={activeTab === DASHBOARD_TAB.ANALYTICS}
              onClick={() => {
                setActiveTab(DASHBOARD_TAB.ANALYTICS);
                setIsSidebarOpen(false);
              }}
            >
              <Sparkles size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.analytics}</span>
            </SidebarNavItem>

            <SidebarNavItem
              type="button"
              $active={activeTab === DASHBOARD_TAB.SETTINGS}
              onClick={() => {
                setActiveTab(DASHBOARD_TAB.SETTINGS);
                setIsSidebarOpen(false);
              }}
            >
              <Settings size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.settings}</span>
            </SidebarNavItem>
          </SidebarNav>
        </div>

        {/* Sidebar Footer */}
        <SidebarFooter>
          <SidebarNavItem
            type="button"
            $active={false}
            onClick={() => {}}
            style={{ color: colors.neutral.slate400 }}
          >
            <HelpCircle size={18} />
            <span>{DASHBOARD_SIDEBAR_NAV.helpSupport}</span>
          </SidebarNavItem>

          <SidebarNavItem
            type="button"
            $active={false}
            onClick={handleLogout}
            style={{ color: colors.status.error }}
          >
            <LogOut size={18} />
            <span>{DASHBOARD_SIDEBAR_NAV.logOut}</span>
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContainer>

      {/* 2. MAIN WORKSPACE */}
      <MainLayout>
        {/* Workspace Top Header */}
        <WorkspaceHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MobileToggle onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </MobileToggle>
            <HeaderTitleGroup>
              <HeaderTitle>
                {DASHBOARD_TEXT.welcomePrefix}
                {currentRole === DASHBOARD_ROLE.ADMIN
                  ? DASHBOARD_ADMIN_PROFILE.greeting
                  : user.name.split(' ')[0]}
              </HeaderTitle>
              <HeaderSubtitle>{formattedToday}</HeaderSubtitle>
            </HeaderTitleGroup>
          </div>

          <HeaderControls>
            <ReturnHomeBtn
              type="button"
              onClick={() => router.push(ROUTES.HOME)}
              aria-label={DASHBOARD_TEXT.returnHomeBtn}
            >
              <Home size={15} />
              <span>{DASHBOARD_TEXT.returnHomeBtn}</span>
            </ReturnHomeBtn>

            <SearchInputWrapper>
              <Search size={16} />
              <SearchInput
                type="text"
                placeholder={
                  currentRole === DASHBOARD_ROLE.ADMIN
                    ? DASHBOARD_SEARCH_PLACEHOLDER.ADMIN
                    : DASHBOARD_SEARCH_PLACEHOLDER.PATIENT
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchInputWrapper>

            {currentRole === DASHBOARD_ROLE.PATIENT && (
              <QuickBookBtn type="button" onClick={() => setIsBookingModalOpen(true)}>
                <CalendarPlus size={16} />
                <span>{DASHBOARD_REDESIGN_TEXT.quickBookCta}</span>
              </QuickBookBtn>
            )}
          </HeaderControls>
        </WorkspaceHeader>

        {/* Split Panels Workspace */}
        <SplitWorkspace>
          {/* Middle Content Scroll */}
          <MiddleContentScroll>
            {/* OVERVIEW TAB */}
            {activeTab === DASHBOARD_TAB.OVERVIEW && (
              <>
                {/* PATIENT VIEW */}
                {currentRole === DASHBOARD_ROLE.PATIENT && (
                  <>
                    {/* Hero Next Visit Card */}
                    <HeroUpcomingCard>
                      <HeroUpcomingContent>
                        <HeroUpcomingBadge>
                          {nextUpcoming ? DASHBOARD_REDESIGN_TEXT.nextVisitBadge : DASHBOARD_REDESIGN_TEXT.overviewHeroTag}
                        </HeroUpcomingBadge>
                        <HeroUpcomingTitle>
                          {nextUpcoming
                            ? `${nextUpcoming.type} with ${nextUpcoming.doctorName}`
                            : PATIENT_METRICS_TEXT.nextVisitBookPrompt}
                        </HeroUpcomingTitle>

                        {nextUpcoming ? (
                          <HeroUpcomingDetails>
                            <HeroUpcomingItem>
                              <Calendar size={16} />
                              <span>{nextUpcoming.date} at {nextUpcoming.time}</span>
                            </HeroUpcomingItem>
                            <HeroUpcomingItem>
                              <MapPin size={16} />
                              <span>{DASHBOARD_REDESIGN_TEXT.nextVisitNoLocation}</span>
                            </HeroUpcomingItem>
                            <StatusBadge $status={nextUpcoming.status}>
                              {nextUpcoming.status === 'confirmed' && <CheckCircle2 size={13} />}
                              {nextUpcoming.status === 'pending' && <Clock size={13} />}
                              <span>{nextUpcoming.status}</span>
                            </StatusBadge>
                          </HeroUpcomingDetails>
                        ) : (
                          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)' }}>
                            {PATIENT_METRICS_TEXT.nextVisitNone}
                          </p>
                        )}
                      </HeroUpcomingContent>

                      <HeroUpcomingActions>
                        {nextUpcoming ? (
                          <ActionBtn
                            $variant="danger"
                            type="button"
                            onClick={() => setCancelTargetId(nextUpcoming.id)}
                          >
                            <X size={14} />
                            <span>{APPOINTMENTS_TAB_TEXT.cancelVisit}</span>
                          </ActionBtn>
                        ) : (
                          <ActionBtn
                            $variant="secondary"
                            type="button"
                            onClick={() => setIsBookingModalOpen(true)}
                          >
                            <CalendarPlus size={14} />
                            <span>{TREATMENTS_SECTION_TEXT.bookVisitBtn}</span>
                          </ActionBtn>
                        )}
                      </HeroUpcomingActions>
                    </HeroUpcomingCard>

                    {/* Metrics Grid */}
                    <MetricsGrid>
                      <MetricCard onClick={() => setActiveTab(DASHBOARD_TAB.APPOINTMENTS)}>
                        <MetricHeader>
                          <MetricTitle>{PATIENT_METRICS_TEXT.nextVisitTitle}</MetricTitle>
                          <MetricIcon $colorType="primary">
                            <CalendarIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue style={{ fontSize: '16px' }}>
                            {nextUpcoming ? nextUpcoming.date : PATIENT_METRICS_TEXT.nextVisitNone}
                          </MetricValue>
                          <MetricSub>
                            {nextUpcoming
                              ? `${PATIENT_METRICS_TEXT.nextVisitWithPrefix}${nextUpcoming.doctorName}`
                              : PATIENT_METRICS_TEXT.nextVisitBookPrompt}
                          </MetricSub>
                        </div>
                      </MetricCard>

                      <MetricCard onClick={() => setActiveTab(DASHBOARD_TAB.ANALYTICS)}>
                        <MetricHeader>
                          <MetricTitle>{PATIENT_METRICS_TEXT.oralHygieneTitle}</MetricTitle>
                          <MetricIcon $colorType="success">
                            <ToothIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>{PATIENT_METRICS_TEXT.oralHygieneValue}</MetricValue>
                          <MetricSub>{PATIENT_METRICS_TEXT.oralHygieneSub}</MetricSub>
                        </div>
                      </MetricCard>

                      <MetricCard onClick={() => setActiveTab(DASHBOARD_TAB.CHAT)}>
                        <MetricHeader>
                          <MetricTitle>{PATIENT_METRICS_TEXT.aiConsultsTitle}</MetricTitle>
                          <MetricIcon $colorType="info">
                            <MessageIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>{PATIENT_METRICS_TEXT.aiConsultsValue}</MetricValue>
                          <MetricSub>{PATIENT_METRICS_TEXT.aiConsultsSub}</MetricSub>
                        </div>
                      </MetricCard>

                      <MetricCard>
                        <MetricHeader>
                          <MetricTitle>{PATIENT_METRICS_TEXT.allowanceTitle}</MetricTitle>
                          <MetricIcon $colorType="warning">
                            <ShieldIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>{PATIENT_METRICS_TEXT.allowanceValue}</MetricValue>
                          <MetricSub>{PATIENT_METRICS_TEXT.allowanceSub}</MetricSub>
                        </div>
                      </MetricCard>
                    </MetricsGrid>

                    {/* Quick Appointments Overview Table */}
                    <TableWrapper>
                      <TableHeaderBar>
                        <TableTitle>
                          <Calendar size={18} />
                          <span>{APPOINTMENTS_TAB_TEXT.scheduleTitle}</span>
                        </TableTitle>

                        <ActionBtn
                          $variant="secondary"
                          type="button"
                          onClick={() => setActiveTab(DASHBOARD_TAB.APPOINTMENTS)}
                        >
                          <span>{DASHBOARD_REDESIGN_TEXT.viewAllVisits}</span>
                          <ArrowRight size={14} />
                        </ActionBtn>
                      </TableHeaderBar>

                      {appointments.length > 0 ? (
                        <>
                          <ResponsiveTable>
                            <TableHead>
                              <TableRow>
                                <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderDate}</TableHeaderCell>
                                <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderDoctor}</TableHeaderCell>
                                <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderTreatment}</TableHeaderCell>
                                <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderStatus}</TableHeaderCell>
                                <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderActions}</TableHeaderCell>
                              </TableRow>
                            </TableHead>
                            <tbody>
                              {appointments.slice(0, 3).map((appt) => (
                                <TableRow key={appt.id}>
                                  <TableCell>
                                    <strong>{appt.date}</strong> at {appt.time}
                                  </TableCell>
                                  <TableCell>
                                    {appt.doctorName}
                                    <div style={{ fontSize: '11px', color: colors.neutral.slate500 }}>
                                      {appt.specialty}
                                    </div>
                                  </TableCell>
                                  <TableCell>{appt.type}</TableCell>
                                  <TableCell>
                                    <StatusBadge $status={appt.status}>
                                      {appt.status === 'confirmed' && <CheckCircle2 size={12} />}
                                      {appt.status === 'pending' && <Clock size={12} />}
                                      {appt.status === 'completed' && <Check size={12} />}
                                      {appt.status === 'cancelled' && <XCircle size={12} />}
                                      <span>{appt.status}</span>
                                    </StatusBadge>
                                  </TableCell>
                                  <TableCell>
                                    {appt.status !== APPOINTMENT_STATUS.COMPLETED &&
                                      appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                                        <ActionBtn
                                          $variant="danger"
                                          type="button"
                                          onClick={() => setCancelTargetId(appt.id)}
                                        >
                                          <X size={13} />
                                          <span>{APPOINTMENTS_TAB_TEXT.cancelVisit}</span>
                                        </ActionBtn>
                                      )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </tbody>
                          </ResponsiveTable>

                          <MobileCardsList>
                            {appointments.slice(0, 3).map((appt) => (
                              <MobileAppointmentCard key={appt.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <strong>{appt.date} at {appt.time}</strong>
                                  <StatusBadge $status={appt.status}>
                                    <span>{appt.status}</span>
                                  </StatusBadge>
                                </div>
                                <div style={{ fontSize: '13px', color: colors.neutral.slate700 }}>
                                  {appt.doctorName} • {appt.type}
                                </div>
                                {appt.status !== APPOINTMENT_STATUS.COMPLETED &&
                                  appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                                    <ActionBtn
                                      $variant="danger"
                                      type="button"
                                      onClick={() => setCancelTargetId(appt.id)}
                                      style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                                    >
                                      <span>{APPOINTMENTS_TAB_TEXT.cancelVisit}</span>
                                    </ActionBtn>
                                  )}
                              </MobileAppointmentCard>
                            ))}
                          </MobileCardsList>
                        </>
                      ) : (
                        <EmptyStateContainer>
                          <EmptyStateIconCircle>
                            <CalendarX size={26} />
                          </EmptyStateIconCircle>
                          <EmptyStateTitle>{DASHBOARD_REDESIGN_TEXT.emptyFilterTitle}</EmptyStateTitle>
                          <EmptyStateDesc>{DASHBOARD_REDESIGN_TEXT.emptyFilterDesc}</EmptyStateDesc>
                          <QuickBookBtn type="button" onClick={() => setIsBookingModalOpen(true)}>
                            <CalendarPlus size={15} />
                            <span>{DASHBOARD_REDESIGN_TEXT.quickBookCta}</span>
                          </QuickBookBtn>
                        </EmptyStateContainer>
                      )}
                    </TableWrapper>

                    {/* Available Dental Treatments Grid */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div>
                          <h3 style={{ fontSize: '18px', fontWeight: 800, color: colors.headings, margin: 0 }}>
                            {TREATMENTS_SECTION_TEXT.title}
                          </h3>
                          <span style={{ fontSize: '12px', color: colors.neutral.slate500 }}>
                            {filteredTreatments.length} {TREATMENTS_SECTION_TEXT.matchedSuffix}
                          </span>
                        </div>
                        <FilterTabGroup>
                          <FilterTabItem
                            type="button"
                            $active={subTab === 'all'}
                            onClick={() => setSubTab('all')}
                          >
                            {SUBTAB_LABELS.all}
                          </FilterTabItem>
                          <FilterTabItem
                            type="button"
                            $active={subTab === 'recommended'}
                            onClick={() => setSubTab('recommended')}
                          >
                            {SUBTAB_LABELS.recommended}
                          </FilterTabItem>
                          <FilterTabItem
                            type="button"
                            $active={subTab === 'popular'}
                            onClick={() => setSubTab('popular')}
                          >
                            {SUBTAB_LABELS.popular}
                          </FilterTabItem>
                        </FilterTabGroup>
                      </div>

                      <DashboardCardsGrid>
                        {filteredTreatments.map((t) => (
                          <DashboardCard key={t.id}>
                            <CardImageWrapper>
                              <Image
                                src={t.image}
                                alt={t.name}
                                width={360}
                                height={180}
                              />
                            </CardImageWrapper>
                            <CardBody>
                              <CardHeaderRow>
                                <CardTag>{t.tag}</CardTag>
                                <CardRating>
                                  <Star size={13} fill={colors.status.warning} stroke={colors.status.warning} />
                                  <span>{t.rating}</span>
                                </CardRating>
                              </CardHeaderRow>
                              <CardTitle>{t.name}</CardTitle>
                              <CardDoctor>{t.doctor}</CardDoctor>
                              <CardLocation>
                                <MapPin size={12} />
                                <span>{TREATMENTS_SECTION_TEXT.locationLabel}</span>
                              </CardLocation>
                              <CardPriceRow>
                                <CardPriceVal>{t.price}</CardPriceVal>
                                <CardActionBtn
                                  type="button"
                                  onClick={() => {
                                    setDoctor(t.doctor);
                                    setTreatment(t.name);
                                    setIsBookingModalOpen(true);
                                  }}
                                >
                                  {TREATMENTS_SECTION_TEXT.bookVisitBtn}
                                </CardActionBtn>
                              </CardPriceRow>
                            </CardBody>
                          </DashboardCard>
                        ))}
                      </DashboardCardsGrid>
                    </div>

                    {/* Insurance Active Plan Banner */}
                    <HorizontalBanner>
                      <BannerContent>
                        <BannerTitle>{INSURANCE_BANNER_TEXT.title}</BannerTitle>
                        <BannerSubtitle>{INSURANCE_BANNER_TEXT.subtitle}</BannerSubtitle>
                        <div style={{ marginTop: '10px', maxWidth: '240px' }}>
                          <ProgressTrack>
                            <ProgressBarFill $width="75%" $color={colors.secondary.surface} />
                          </ProgressTrack>
                        </div>
                      </BannerContent>
                      <BannerAction>
                        <BannerMetric>{PATIENT_METRICS_TEXT.allowanceValue}</BannerMetric>
                        <BannerMetricLabel>{INSURANCE_BANNER_TEXT.metricLabel}</BannerMetricLabel>
                      </BannerAction>
                    </HorizontalBanner>
                  </>
                )}

                {/* CLINIC STAFF (ADMIN) OVERVIEW VIEW */}
                {currentRole === DASHBOARD_ROLE.ADMIN && (
                  <>
                    <MetricsGrid>
                      <MetricCard>
                        <MetricHeader>
                          <MetricTitle>{ADMIN_METRICS_TEXT.queueTitle}</MetricTitle>
                          <MetricIcon $colorType="primary">
                            <UsersIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>
                            {allAppointments.filter((a) => a.date === DASHBOARD_INITIAL_VALUES.DATE || a.status === APPOINTMENT_STATUS.CONFIRMED).length}{' '}
                            {ADMIN_METRICS_TEXT.queueSuffix}
                          </MetricValue>
                          <MetricSub>{ADMIN_METRICS_TEXT.queueSub}</MetricSub>
                        </div>
                      </MetricCard>

                      <MetricCard onClick={() => setActiveTab(DASHBOARD_TAB.APPOINTMENTS)}>
                        <MetricHeader>
                          <MetricTitle>{ADMIN_METRICS_TEXT.pendingTitle}</MetricTitle>
                          <MetricIcon $colorType="warning">
                            <CalendarIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>
                            {allAppointments.filter((a) => a.status === APPOINTMENT_STATUS.PENDING).length}{' '}
                            {ADMIN_METRICS_TEXT.pendingSuffix}
                          </MetricValue>
                          <MetricSub>{ADMIN_METRICS_TEXT.pendingSub}</MetricSub>
                        </div>
                      </MetricCard>

                      <MetricCard>
                        <MetricHeader>
                          <MetricTitle>{ADMIN_METRICS_TEXT.chairStatusTitle}</MetricTitle>
                          <MetricIcon $colorType="info">
                            <DentalChairIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>{ADMIN_METRICS_TEXT.chairStatusValue}</MetricValue>
                          <MetricSub>{ADMIN_METRICS_TEXT.chairStatusSub}</MetricSub>
                        </div>
                      </MetricCard>

                      <MetricCard>
                        <MetricHeader>
                          <MetricTitle>{ADMIN_METRICS_TEXT.dailyEarningsTitle}</MetricTitle>
                          <MetricIcon $colorType="success">
                            <DollarIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>{ADMIN_METRICS_TEXT.dailyEarningsValue}</MetricValue>
                          <MetricSub>{ADMIN_METRICS_TEXT.dailyEarningsSub}</MetricSub>
                        </div>
                      </MetricCard>
                    </MetricsGrid>

                    <TableWrapper>
                      <TableHeaderBar>
                        <TableTitle>
                          <UsersIcon size={18} />
                          <span>{ADMIN_QUEUE_TEXT.title}</span>
                        </TableTitle>
                        <span style={{ fontSize: '13px', color: colors.neutral.slate500 }}>
                          {filteredAdminAppointments.length} {ADMIN_QUEUE_TEXT.scheduledSuffix}
                        </span>
                      </TableHeaderBar>

                      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {filteredAdminAppointments.length > 0 ? (
                          filteredAdminAppointments.map((appt) => (
                            <AdminApptItem key={appt.id}>
                              <PatientInfoRow>
                                <MessageAvatar>
                                  {appt.doctorName.split(' ').map((n) => n[0]).join('')}
                                </MessageAvatar>
                                <PatientMetaText>
                                  <PatientNameText>
                                    {appt.id === mockUser.nextAppointmentId
                                      ? mockUser.name
                                      : `${ADMIN_QUEUE_TEXT.patientNamePrefix} (${appt.id})`}
                                  </PatientNameText>
                                  <PatientSubText>
                                    {ADMIN_QUEUE_TEXT.treatmentLabel}
                                    <strong>{appt.type}</strong> ({appt.specialty})
                                  </PatientSubText>
                                  <PatientSubText style={{ fontSize: '11px', color: colors.neutral.slate500 }}>
                                    {ADMIN_QUEUE_TEXT.scheduledLabel}
                                    {appt.date} at {appt.time}
                                  </PatientSubText>
                                </PatientMetaText>
                              </PatientInfoRow>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <StatusBadge $status={appt.status}>
                                  <span>{appt.status}</span>
                                </StatusBadge>
                                <AdminActionGroup>
                                  {appt.status === APPOINTMENT_STATUS.PENDING && (
                                    <AdminActionBtn
                                      $variant="success"
                                      type="button"
                                      onClick={() => onUpdateAppointmentStatus(appt.id, APPOINTMENT_STATUS.CONFIRMED)}
                                    >
                                      {ADMIN_QUEUE_TEXT.confirmBtn}
                                    </AdminActionBtn>
                                  )}
                                  {appt.status === APPOINTMENT_STATUS.CONFIRMED && (
                                    <AdminActionBtn
                                      $variant="primary"
                                      type="button"
                                      onClick={() => onUpdateAppointmentStatus(appt.id, APPOINTMENT_STATUS.COMPLETED)}
                                    >
                                      {ADMIN_QUEUE_TEXT.checkInBtn}
                                    </AdminActionBtn>
                                  )}
                                  {appt.status !== APPOINTMENT_STATUS.COMPLETED &&
                                    appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                                      <AdminActionBtn
                                        $variant="danger"
                                        type="button"
                                        onClick={() => onUpdateAppointmentStatus(appt.id, APPOINTMENT_STATUS.CANCELLED)}
                                      >
                                        {ADMIN_QUEUE_TEXT.cancelBtn}
                                      </AdminActionBtn>
                                    )}
                                </AdminActionGroup>
                              </div>
                            </AdminApptItem>
                          ))
                        ) : (
                          <EmptyStateContainer>
                            <EmptyStateTitle>{ADMIN_QUEUE_TEXT.emptyState}</EmptyStateTitle>
                          </EmptyStateContainer>
                        )}
                      </div>
                    </TableWrapper>

                    <HorizontalBanner>
                      <BannerContent>
                        <BannerTitle>{ADMIN_OPS_BANNER_TEXT.title}</BannerTitle>
                        <BannerSubtitle>{ADMIN_OPS_BANNER_TEXT.subtitle}</BannerSubtitle>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }}>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                            {ADMIN_OPS_BANNER_TEXT.chairsOccupiedLabel}
                            <strong>{ADMIN_OPS_BANNER_TEXT.chairsOccupiedValue}</strong>
                          </span>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                            {ADMIN_OPS_BANNER_TEXT.staffOnDutyLabel}
                            <strong>{ADMIN_OPS_BANNER_TEXT.staffOnDutyValue}</strong>
                          </span>
                        </div>
                      </BannerContent>
                      <BannerAction>
                        <BannerMetric>{ADMIN_OPS_BANNER_TEXT.revenueValue}</BannerMetric>
                        <BannerMetricLabel>{ADMIN_OPS_BANNER_TEXT.revenueLabel}</BannerMetricLabel>
                      </BannerAction>
                    </HorizontalBanner>
                  </>
                )}
              </>
            )}

            {/* APPOINTMENTS TAB */}
            {activeTab === DASHBOARD_TAB.APPOINTMENTS && (
              <>
                <TableWrapper>
                  <TableHeaderBar>
                    <div>
                      <TableTitle>
                        <Calendar size={18} />
                        <span>{APPOINTMENTS_TAB_TEXT.scheduleTitle}</span>
                      </TableTitle>
                      <span style={{ fontSize: '12px', color: colors.neutral.slate500 }}>
                        {appointments.length} total visits recorded
                      </span>
                    </div>

                    <FilterTabGroup>
                      <FilterTabItem
                        type="button"
                        $active={filter === APPOINTMENT_FILTER.ALL}
                        onClick={() => setFilter(APPOINTMENT_FILTER.ALL)}
                      >
                        <span>{APPOINTMENTS_TAB_TEXT.filterAll}</span>
                        <FilterCountBadge>{appointmentCounts.all}</FilterCountBadge>
                      </FilterTabItem>
                      <FilterTabItem
                        type="button"
                        $active={filter === APPOINTMENT_FILTER.UPCOMING}
                        onClick={() => setFilter(APPOINTMENT_FILTER.UPCOMING)}
                      >
                        <span>{APPOINTMENTS_TAB_TEXT.filterUpcoming}</span>
                        <FilterCountBadge>{appointmentCounts.upcoming}</FilterCountBadge>
                      </FilterTabItem>
                      <FilterTabItem
                        type="button"
                        $active={filter === APPOINTMENT_FILTER.PAST}
                        onClick={() => setFilter(APPOINTMENT_FILTER.PAST)}
                      >
                        <span>{APPOINTMENTS_TAB_TEXT.filterPast}</span>
                        <FilterCountBadge>{appointmentCounts.past}</FilterCountBadge>
                      </FilterTabItem>
                    </FilterTabGroup>
                  </TableHeaderBar>

                  {appointments.length > 0 ? (
                    <>
                      <ResponsiveTable>
                        <TableHead>
                          <TableRow>
                            <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderDate}</TableHeaderCell>
                            <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderDoctor}</TableHeaderCell>
                            <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderTreatment}</TableHeaderCell>
                            <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderStatus}</TableHeaderCell>
                            <TableHeaderCell>{DASHBOARD_REDESIGN_TEXT.tableHeaderActions}</TableHeaderCell>
                          </TableRow>
                        </TableHead>
                        <tbody>
                          {appointments.map((appt) => (
                            <TableRow key={appt.id}>
                              <TableCell>
                                <strong>{appt.date}</strong> at {appt.time}
                              </TableCell>
                              <TableCell>
                                {appt.doctorName}
                                <div style={{ fontSize: '11px', color: colors.neutral.slate500 }}>
                                  {appt.specialty}
                                </div>
                              </TableCell>
                              <TableCell>{appt.type}</TableCell>
                              <TableCell>
                                <StatusBadge $status={appt.status}>
                                  {appt.status === 'confirmed' && <CheckCircle2 size={12} />}
                                  {appt.status === 'pending' && <Clock size={12} />}
                                  {appt.status === 'completed' && <Check size={12} />}
                                  {appt.status === 'cancelled' && <XCircle size={12} />}
                                  <span>{appt.status}</span>
                                </StatusBadge>
                              </TableCell>
                              <TableCell>
                                {appt.status !== APPOINTMENT_STATUS.COMPLETED &&
                                  appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                                    <ActionBtn
                                      $variant="danger"
                                      type="button"
                                      onClick={() => setCancelTargetId(appt.id)}
                                    >
                                      <X size={13} />
                                      <span>{APPOINTMENTS_TAB_TEXT.cancelVisit}</span>
                                    </ActionBtn>
                                  )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </tbody>
                      </ResponsiveTable>

                      <MobileCardsList>
                        {appointments.map((appt) => (
                          <MobileAppointmentCard key={appt.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <strong>{appt.date} at {appt.time}</strong>
                              <StatusBadge $status={appt.status}>
                                <span>{appt.status}</span>
                              </StatusBadge>
                            </div>
                            <div style={{ fontSize: '13px', color: colors.neutral.slate800, fontWeight: 600 }}>
                              {appt.doctorName} ({appt.specialty})
                            </div>
                            <div style={{ fontSize: '12px', color: colors.neutral.slate600 }}>
                              {appt.type}
                            </div>
                            {appt.status !== APPOINTMENT_STATUS.COMPLETED &&
                              appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                                <ActionBtn
                                  $variant="danger"
                                  type="button"
                                  onClick={() => setCancelTargetId(appt.id)}
                                  style={{ alignSelf: 'flex-start', marginTop: '4px' }}
                                >
                                  <span>{APPOINTMENTS_TAB_TEXT.cancelVisit}</span>
                                </ActionBtn>
                              )}
                          </MobileAppointmentCard>
                        ))}
                      </MobileCardsList>
                    </>
                  ) : (
                    <EmptyStateContainer>
                      <EmptyStateIconCircle>
                        <CalendarX size={26} />
                      </EmptyStateIconCircle>
                      <EmptyStateTitle>{DASHBOARD_REDESIGN_TEXT.emptyFilterTitle}</EmptyStateTitle>
                      <EmptyStateDesc>{DASHBOARD_REDESIGN_TEXT.emptyFilterDesc}</EmptyStateDesc>
                      <QuickBookBtn type="button" onClick={() => setIsBookingModalOpen(true)}>
                        <CalendarPlus size={15} />
                        <span>{DASHBOARD_REDESIGN_TEXT.quickBookCta}</span>
                      </QuickBookBtn>
                    </EmptyStateContainer>
                  )}
                </TableWrapper>

                {/* Patient Booking Form Card */}
                {currentRole === DASHBOARD_ROLE.PATIENT && (
                  <StyledDashboardCard>
                    <StyledCardTitle>
                      <HeartPulse size={18} />
                      <span>{APPOINTMENTS_TAB_TEXT.newApptTitle}</span>
                    </StyledCardTitle>
                    <form onSubmit={handleBook}>
                      <FormRow>
                        <FormField>
                          <label>{APPOINTMENTS_TAB_TEXT.chooseDoctor}</label>
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
                          <label>{APPOINTMENTS_TAB_TEXT.treatmentPlan}</label>
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
                          <label>{DASHBOARD_TEXT.dateLabel}</label>
                          <StyledInput
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </FormField>
                        <FormField>
                          <label>{APPOINTMENTS_TAB_TEXT.preferredTimeSlot}</label>
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
                        <CalendarPlus size={16} />
                        <span>{APPOINTMENTS_TAB_TEXT.submitBtn}</span>
                      </SubmitBookingButton>
                    </form>
                  </StyledDashboardCard>
                )}
              </>
            )}

            {/* CHAT TAB */}
            {activeTab === DASHBOARD_TAB.CHAT && (
              <div style={{ height: 'calc(100vh - 120px)', minHeight: '400px' }}>
                <ChatWindow
                  messages={messages}
                  isLoading={isChatLoading}
                  onSendMessage={sendMessage}
                  onClearChat={clearChat}
                />
              </div>
            )}

            {/* RECORDS TAB */}
            {activeTab === DASHBOARD_TAB.RECORDS && (
              <>
                <StyledDashboardCard>
                  <StyledCardTitle>
                    <UserIcon size={18} />
                    <span>
                      {currentRole === DASHBOARD_ROLE.ADMIN
                        ? RECORDS_TAB_TEXT.adminTitle
                        : RECORDS_TAB_TEXT.patientTitle}
                    </span>
                  </StyledCardTitle>
                  <InfoList>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.fullName}</InfoLabel>
                      <InfoValue>{user.name}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.registryId}</InfoLabel>
                      <InfoValue>{user.id}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.dob}</InfoLabel>
                      <InfoValue>{user.dob}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.phone}</InfoLabel>
                      <InfoValue>{user.phone}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.memberSince}</InfoLabel>
                      <InfoValue>{user.memberSince}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.insuranceProvider}</InfoLabel>
                      <InfoValue>{user.insuranceProvider}</InfoValue>
                    </InfoRow>
                    <InfoRow>
                      <InfoLabel>{RECORDS_TAB_TEXT.policyNumber}</InfoLabel>
                      <InfoValue>{user.policyNumber}</InfoValue>
                    </InfoRow>
                  </InfoList>
                </StyledDashboardCard>

                <StyledDashboardCard>
                  <StyledCardTitle>
                    <Activity size={18} />
                    <span>{RECORDS_TAB_TEXT.diagnosesTitle}</span>
                  </StyledCardTitle>
                  <DiagnosesList>
                    {activeDiagnoses.map((dx) => (
                      <li key={dx.id}>
                        <strong>{dx.title}</strong>: {dx.desc}
                      </li>
                    ))}
                  </DiagnosesList>
                </StyledDashboardCard>
              </>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === DASHBOARD_TAB.ANALYTICS && (
              <StyledDashboardCard>
                <StyledCardTitle>
                  <Sparkles size={18} />
                  <span>{ANALYTICS_TAB_TEXT.title}</span>
                </StyledCardTitle>
                <p style={{ fontSize: '14px', color: colors.neutral.slate600, margin: 0 }}>
                  {ANALYTICS_TAB_TEXT.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                  <div>
                    <ProgressRow>
                      <span>{ANALYTICS_TAB_TEXT.brushingLabel}</span>
                      <span>{ANALYTICS_TAB_TEXT.brushingValue}</span>
                    </ProgressRow>
                    <ProgressTrack>
                      <ProgressBarFill $width="92%" $color={colors.primary.default} />
                    </ProgressTrack>
                  </div>

                  <div>
                    <ProgressRow>
                      <span>{ANALYTICS_TAB_TEXT.flossingLabel}</span>
                      <span>{ANALYTICS_TAB_TEXT.flossingValue}</span>
                    </ProgressRow>
                    <ProgressTrack>
                      <ProgressBarFill $width="65%" $color={colors.primary.accent} />
                    </ProgressTrack>
                  </div>

                  <div>
                    <ProgressRow>
                      <span>{ANALYTICS_TAB_TEXT.plaqueLabel}</span>
                      <span>{ANALYTICS_TAB_TEXT.plaqueValue}</span>
                    </ProgressRow>
                    <ProgressTrack>
                      <ProgressBarFill $width="40%" $color={colors.status.success} />
                    </ProgressTrack>
                  </div>
                </div>
              </StyledDashboardCard>
            )}

            {/* SETTINGS TAB */}
            {activeTab === DASHBOARD_TAB.SETTINGS && (
              <StyledDashboardCard>
                <StyledCardTitle>
                  <Settings size={18} />
                  <span>{SETTINGS_TAB_TEXT.title}</span>
                </StyledCardTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <FormField>
                    <label>{SETTINGS_TAB_TEXT.emailLabel}</label>
                    <StyledInput type="email" value={user.email} disabled />
                  </FormField>
                  <FormField>
                    <label>{SETTINGS_TAB_TEXT.phoneLabel}</label>
                    <StyledInput type="tel" value={user.phone} disabled />
                  </FormField>
                  <FormField>
                    <label>{SETTINGS_TAB_TEXT.notificationLabel}</label>
                    <NotificationCheckGroup>
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span>{SETTINGS_TAB_TEXT.emailAlerts}</span>
                      </label>
                      <label>
                        <input type="checkbox" defaultChecked />
                        <span>{SETTINGS_TAB_TEXT.smsAlerts}</span>
                      </label>
                    </NotificationCheckGroup>
                  </FormField>
                </div>
              </StyledDashboardCard>
            )}
          </MiddleContentScroll>

          {/* Right Sidebar Widgets */}
          <RightSidebarScroll>
            {/* Panel 1: Recent Care Messages */}
            <div>
              <PanelTitle>
                <span>{RIGHT_PANEL_TEXT.recentMessagesTitle}</span>
                <span
                  style={{
                    fontSize: '11px',
                    background: colors.primary.default,
                    color: colors.neutral.white,
                    padding: '2px 7px',
                    borderRadius: '10px'
                  }}
                >
                  {recentMessages.length}
                </span>
              </PanelTitle>

              <MessageList>
                {recentMessages.map((msg) => (
                  <MessageItem
                    key={msg.id}
                    onClick={() => {
                      if (onNavigateToChat) onNavigateToChat();
                      else setActiveTab(DASHBOARD_TAB.CHAT);
                    }}
                  >
                    <MessageAvatar
                      style={{
                        background: msg.avatarBg || colors.primary.default,
                        color: msg.avatarBg ? undefined : colors.neutral.white
                      }}
                    >
                      {msg.avatarInitials}
                    </MessageAvatar>
                    <MessageContent>
                      <MessageSender>{msg.sender}</MessageSender>
                      <MessageText>{msg.text}</MessageText>
                    </MessageContent>
                    {msg.hasBadge && <MessageBadge />}
                  </MessageItem>
                ))}
              </MessageList>
            </div>

            {/* Panel 2: Interactive Styled Clinic Map */}
            <div>
              <PanelTitle>
                <span>{RIGHT_PANEL_TEXT.mapViewTitle}</span>
              </PanelTitle>
              <MapViewContainer>
                <StylizedClinicMap />
                <MapOverlayCard>
                  <span>{RIGHT_PANEL_TEXT.clinicName}</span>
                  <span>{RIGHT_PANEL_TEXT.clinicAddress}</span>
                </MapOverlayCard>
              </MapViewContainer>
            </div>
          </RightSidebarScroll>
        </SplitWorkspace>
      </MainLayout>

      {/* 3. CONFIRMATION DIALOG MODAL (Cancel Appointment) */}
      {cancelTargetId && appointmentToCancel && (
        <ModalBackdrop onClick={() => setCancelTargetId(null)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: colors.status.errorSurface,
                    color: colors.status.error,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AlertTriangle size={18} />
                </div>
                <ModalTitle>{DASHBOARD_DIALOG_TEXT.confirmCancelTitle}</ModalTitle>
              </div>
              <ModalCloseBtn
                type="button"
                onClick={() => setCancelTargetId(null)}
                aria-label={DASHBOARD_DIALOG_TEXT.closeModal}
              >
                <X size={18} />
              </ModalCloseBtn>
            </ModalHeader>

            <ModalBody>
              <p style={{ margin: 0 }}>{DASHBOARD_DIALOG_TEXT.confirmCancelDesc}</p>
              <div
                style={{
                  background: colors.neutral.slate50,
                  border: `1px solid ${colors.neutral.slate200}`,
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <strong>{appointmentToCancel.type}</strong>
                <span style={{ fontSize: '13px', color: colors.neutral.slate600 }}>
                  {appointmentToCancel.doctorName} ({appointmentToCancel.specialty})
                </span>
                <span style={{ fontSize: '12px', color: colors.neutral.slate500 }}>
                  {appointmentToCancel.date} at {appointmentToCancel.time}
                </span>
              </div>
            </ModalBody>

            <ModalFooter>
              <ActionBtn
                $variant="secondary"
                type="button"
                onClick={() => setCancelTargetId(null)}
              >
                {DASHBOARD_DIALOG_TEXT.confirmCancelKeep}
              </ActionBtn>
              <ActionBtn
                $variant="danger"
                type="button"
                onClick={confirmCancel}
              >
                {DASHBOARD_DIALOG_TEXT.confirmCancelProceed}
              </ActionBtn>
            </ModalFooter>
          </ModalContainer>
        </ModalBackdrop>
      )}

      {/* 4. BOOK APPOINTMENT MODAL */}
      {isBookingModalOpen && (
        <ModalBackdrop onClick={() => setIsBookingModalOpen(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CalendarPlus size={20} color={colors.primary.default} />
                <ModalTitle>{DASHBOARD_DIALOG_TEXT.bookModalTitle}</ModalTitle>
              </div>
              <ModalCloseBtn
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                aria-label={DASHBOARD_DIALOG_TEXT.closeModal}
              >
                <X size={18} />
              </ModalCloseBtn>
            </ModalHeader>

            <form onSubmit={handleBook}>
              <ModalBody>
                <p style={{ margin: 0, fontSize: '13px', color: colors.neutral.slate500 }}>
                  {DASHBOARD_DIALOG_TEXT.bookModalSubtitle}
                </p>

                <FormField>
                  <label>{APPOINTMENTS_TAB_TEXT.chooseDoctor}</label>
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
                  <label>{APPOINTMENTS_TAB_TEXT.treatmentPlan}</label>
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

                <FormRow style={{ marginBottom: 0 }}>
                  <FormField>
                    <label>{DASHBOARD_TEXT.dateLabel}</label>
                    <StyledInput
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </FormField>
                  <FormField>
                    <label>{APPOINTMENTS_TAB_TEXT.preferredTimeSlot}</label>
                    <StyledInput
                      type="text"
                      placeholder={DASHBOARD_TEXT.timePlaceholder}
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </FormField>
                </FormRow>
              </ModalBody>

              <ModalFooter>
                <ActionBtn
                  $variant="secondary"
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  {DASHBOARD_TEXT.patientProfile}
                </ActionBtn>
                <ActionBtn $variant="primary" type="submit">
                  <CalendarPlus size={14} />
                  <span>{APPOINTMENTS_TAB_TEXT.submitBtn}</span>
                </ActionBtn>
              </ModalFooter>
            </form>
          </ModalContainer>
        </ModalBackdrop>
      )}
    </DashboardContainer>
  );
};

const StylizedClinicMap: React.FC = () => {
  return (
    <ClinicMapSvgWrapper>
      <svg
        viewBox="0 0 320 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" className="map-grid-stroke" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />

        {/* River */}
        <path d="M 230 -10 Q 270 100 210 230 L 330 230 L 330 -10 Z" className="map-river" />
        <text
          x="250"
          y="140"
          className="map-river-text"
          fontSize="8"
          fontWeight="700"
          fontFamily="sans-serif"
          opacity="0.4"
          transform="rotate(75 250 140)"
        >
          {CLINIC_MAP_LABELS.river}
        </text>

        {/* Parks */}
        <rect x="20" y="20" width="80" height="60" rx="8" className="map-park" />
        <text
          x="32"
          y="52"
          className="map-park-text"
          fontSize="8"
          fontWeight="700"
          fontFamily="sans-serif"
          opacity="0.6"
        >
          {CLINIC_MAP_LABELS.park}
        </text>

        {/* Streets grid */}
        <line x1="120" y1="0" x2="120" y2="220" className="map-street-base" strokeWidth="12" />
        <line x1="120" y1="0" x2="120" y2="220" className="map-street-dash" strokeWidth="1" strokeDasharray="3 3" />

        <line x1="200" y1="0" x2="200" y2="220" className="map-street-base" strokeWidth="12" />
        <line x1="200" y1="0" x2="200" y2="220" className="map-street-dash" strokeWidth="1" strokeDasharray="3 3" />

        <line x1="0" y1="100" x2="320" y2="100" className="map-street-base" strokeWidth="16" />
        <line x1="0" y1="100" x2="320" y2="100" className="map-street-dash" strokeWidth="1" strokeDasharray="3 3" />

        {/* Street labels */}
        <text
          x="124"
          y="190"
          className="map-street-label"
          fontSize="7"
          fontWeight="700"
          transform="rotate(-90 124 190)"
          fontFamily="sans-serif"
          letterSpacing="0.5"
        >
          {CLINIC_MAP_LABELS.avenue}
        </text>
        <text
          x="10"
          y="104"
          className="map-street-label"
          fontSize="7"
          fontWeight="700"
          fontFamily="sans-serif"
          letterSpacing="0.5"
        >
          {CLINIC_MAP_LABELS.medicalAve}
        </text>

        {/* Buildings */}
        <rect x="145" y="65" width="20" height="20" rx="4" className="map-building" />
        <rect x="145" y="25" width="20" height="20" rx="4" className="map-building" />

        {/* Clinic Marker Anchor */}
        <g transform="translate(160, 100)">
          <circle cx="0" cy="0" r="14" className="map-pin-pulse">
            <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="0" cy="0" r="5" className="map-pin-center" strokeWidth="1.5" />
        </g>
      </svg>
    </ClinicMapSvgWrapper>
  );
};

export default Dashboard;
