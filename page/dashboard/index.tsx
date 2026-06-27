'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Wallet,
  Activity,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Filter,
  MapPin,
  Stethoscope,
  Star,
  Menu,
  Check,
  X,
  Plus,
  HeartPulse,
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { User as UserType, Appointment, mockUser, patientTreatments, recentMessages, activeDiagnoses } from '../../data/dummy-data';
import { FilterStatus } from '../../hooks/useAppointments';
import { useChat } from '../../hooks/useChat';
import { ChatWindow } from '../../components/chatWindow';
import {
  DOCTOR_OPTIONS,
  TREATMENT_OPTIONS,
  USER_SESSION_KEY,
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
  DASHBOARD_OVERVIEW_TABS,
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
  CLINIC_MAP_LABELS
} from '../../utils/constants';
import { colors } from '../../utils/colors';
import {
  ToothIcon,
  CalendarIcon,
  MessageIcon,
  ShieldIcon,
  DentalChairIcon,
  DollarIcon,
  UsersIcon
} from '../../utils/icons';
import {
  MetricsGrid,
  MetricCard,
  MetricHeader,
  MetricTitle,
  MetricIcon,
  MetricValue,
  MetricSub,
  DashboardContainer,
  SidebarContainer,
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
  RoleQuickSwitch,
  MobileToggle,
  SplitWorkspace,
  MiddleContentScroll,
  RightSidebarScroll,
  MainTabBar,
  MainTabButton,
  TabControlsRow,
  ResultsCountText,
  SubTabsWrapper,
  SubTabButton,
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
  MapImage,
  MapPinMarker,
  MapOverlayCard,
  AppointmentList,
  AppointmentCard,
  AppointmentMeta,
  AppointmentDateText,
  AppointmentDoctorText,
  AppointmentDetailsText,
  StatusBadgeWrapper,
  StatusBadge,
  ActionLink,
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
  StyledDashboardCard,
  StyledCardTitle
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
  onNavigateToChat: () => void;
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

  // Unified UI States
  const [currentRole, setCurrentRole] = useState<'patient' | 'admin'>(user.role || DASHBOARD_ROLE.PATIENT);
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'chat' | 'records' | 'analytics' | 'settings'>(DASHBOARD_TAB.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search & Filter local states
  const [searchQuery, setSearchQuery] = useState('');
  const [subTab, setSubTab] = useState<'all' | 'recommended' | 'popular' | 'nearest'>(DASHBOARD_SUBTAB.ALL);

  // Booking form local state
  const [doctor, setDoctor] = useState<string>(DOCTOR_OPTIONS[0].value);
  const [treatment, setTreatment] = useState<string>(TREATMENT_OPTIONS[0].value);
  const [date, setDate] = useState<string>(DASHBOARD_INITIAL_VALUES.DATE);
  const [time, setTime] = useState<string>(DASHBOARD_INITIAL_VALUES.TIME);

  // Chat local state manager
  const { messages, isLoading: isChatLoading, sendMessage, clearChat } = useChat();

  const handleLogout = () => {
    sessionStorage.removeItem(USER_SESSION_KEY);
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
    // Swaps to appointments tab to let them see their new booking
    setActiveTab('appointments');
  };

  // Filtered treatment lists for patient
  const filteredTreatments = useMemo(() => {
    return patientTreatments.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubTab = subTab === 'all' || t.tag.toLowerCase() === subTab;
      return matchesSearch && matchesSubTab;
    });
  }, [searchQuery, subTab]);

  // Filtered appointments lists for admin queue
  const filteredAdminAppointments = useMemo(() => {
    return allAppointments.filter((appt) => {
      const matchesSearch = appt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            appt.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (appt.notes && appt.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [allAppointments, searchQuery]);

  // Format today's date for display
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
      {/* 1. LEFT SIDEBAR */}
      <SidebarContainer $isOpen={isSidebarOpen}>
        <div>
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '24px 20px', color: colors.primary.default }}>
            <Stethoscope size={26} />
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'white', margin: 0 }}>
              {BRAND_NAME.first}<span style={{ color: colors.primary.default }}>{BRAND_NAME.second}</span>
            </h2>
            <X size={20} style={{ marginLeft: 'auto', cursor: 'pointer', display: 'none' }} onClick={() => setIsSidebarOpen(false)} className="mobile-close" />
          </div>

          {/* User Profile */}
          <SidebarProfile>
            <SidebarAvatar>
              {currentRole === DASHBOARD_ROLE.ADMIN ? (
                <img src={DASHBOARD_ADMIN_PROFILE.avatar} alt={DASHBOARD_ADMIN_PROFILE.name} />
              ) : (
                <div style={{ background: colors.primary.default, color: 'white', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700 }}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </SidebarAvatar>
            <SidebarName>
              {currentRole === DASHBOARD_ROLE.ADMIN ? DASHBOARD_ADMIN_PROFILE.name : user.name}
            </SidebarName>
            <SidebarRole>
              {currentRole === DASHBOARD_ROLE.ADMIN ? DASHBOARD_ADMIN_PROFILE.role : `${DASHBOARD_TEXT.patientId}: ${user.id}`}
            </SidebarRole>
          </SidebarProfile>

          {/* Sidebar Menu Navigation */}
          <SidebarNav>
            <SidebarNavItem $active={activeTab === DASHBOARD_TAB.OVERVIEW} onClick={() => { setActiveTab(DASHBOARD_TAB.OVERVIEW); setIsSidebarOpen(false); }}>
              <LayoutDashboard size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.dashboard}</span>
            </SidebarNavItem>

            <SidebarNavItem $active={activeTab === DASHBOARD_TAB.APPOINTMENTS} onClick={() => { setActiveTab(DASHBOARD_TAB.APPOINTMENTS); setIsSidebarOpen(false); }}>
              <Calendar size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.appointments}</span>
              <SidebarBadge>
                {currentRole === DASHBOARD_ROLE.ADMIN
                  ? allAppointments.filter(a => a.status === APPOINTMENT_STATUS.PENDING).length
                  : appointments.filter(a => a.status === APPOINTMENT_STATUS.CONFIRMED).length
                }
              </SidebarBadge>
            </SidebarNavItem>

            <SidebarNavItem $active={activeTab === DASHBOARD_TAB.CHAT} onClick={() => { setActiveTab(DASHBOARD_TAB.CHAT); setIsSidebarOpen(false); }}>
              <MessageSquare size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.aiChatAssistant}</span>
              <SidebarBadge>{DASHBOARD_SIDEBAR_NAV.chatBadgeCount}</SidebarBadge>
            </SidebarNavItem>

            <SidebarNavItem $active={activeTab === DASHBOARD_TAB.RECORDS} onClick={() => { setActiveTab(DASHBOARD_TAB.RECORDS); setIsSidebarOpen(false); }}>
              <Activity size={18} />
              <span>{currentRole === DASHBOARD_ROLE.ADMIN ? DASHBOARD_SIDEBAR_NAV.clinicRecords : DASHBOARD_SIDEBAR_NAV.dentalHealthRecord}</span>
            </SidebarNavItem>

            <SidebarNavItem $active={activeTab === DASHBOARD_TAB.ANALYTICS} onClick={() => { setActiveTab(DASHBOARD_TAB.ANALYTICS); setIsSidebarOpen(false); }}>
              <Sparkles size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.analytics}</span>
            </SidebarNavItem>

            <SidebarNavItem $active={activeTab === DASHBOARD_TAB.SETTINGS} onClick={() => { setActiveTab(DASHBOARD_TAB.SETTINGS); setIsSidebarOpen(false); }}>
              <Settings size={18} />
              <span>{DASHBOARD_SIDEBAR_NAV.settings}</span>
            </SidebarNavItem>
          </SidebarNav>
        </div>

        {/* Sidebar Footer */}
        <SidebarFooter>
          <SidebarNavItem $active={false} onClick={() => {}} style={{ color: 'rgba(255,255,255,0.4)' }}>
            <HelpCircle size={18} />
            <span>{DASHBOARD_SIDEBAR_NAV.helpSupport}</span>
          </SidebarNavItem>

          <SidebarNavItem $active={false} onClick={handleLogout} style={{ color: '#ef4444' }}>
            <LogOut size={18} />
            <span>{DASHBOARD_SIDEBAR_NAV.logOut}</span>
          </SidebarNavItem>
        </SidebarFooter>
      </SidebarContainer>

      {/* 2. MAIN LAYOUT */}
      <MainLayout>
        {/* Workspace Header */}
        <WorkspaceHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MobileToggle onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </MobileToggle>
            <HeaderTitleGroup>
              <HeaderTitle>
                {DASHBOARD_TEXT.welcomePrefix}{currentRole === DASHBOARD_ROLE.ADMIN ? DASHBOARD_ADMIN_PROFILE.greeting : user.name.split(' ')[0]}
              </HeaderTitle>
              <HeaderSubtitle>{formattedToday}</HeaderSubtitle>
            </HeaderTitleGroup>
          </div>

          <HeaderControls>
            <SearchInputWrapper>
              <Search size={16} />
              <SearchInput
                type="text"
                placeholder={currentRole === DASHBOARD_ROLE.ADMIN ? DASHBOARD_SEARCH_PLACEHOLDER.ADMIN : DASHBOARD_SEARCH_PLACEHOLDER.PATIENT}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchInputWrapper>


          </HeaderControls>
        </WorkspaceHeader>

        {/* Split Panels */}
        <SplitWorkspace>
          {/* Middle Workspace Area */}
          <MiddleContentScroll>
            {/* OVERVIEW TAB */}
            {activeTab === DASHBOARD_TAB.OVERVIEW && (
              <>
                {/* Custom Navigation Tab bar like mockup */}
                <MainTabBar>
                  <MainTabButton $active={true}>{DASHBOARD_OVERVIEW_TABS.overview}</MainTabButton>
                  <MainTabButton $active={false} onClick={() => setActiveTab(DASHBOARD_TAB.APPOINTMENTS)}>{DASHBOARD_OVERVIEW_TABS.schedules}</MainTabButton>
                  <MainTabButton $active={false} onClick={() => setActiveTab(DASHBOARD_TAB.RECORDS)}>{DASHBOARD_OVERVIEW_TABS.medicalHistory}</MainTabButton>
                  <MainTabButton $active={false} onClick={() => setActiveTab(DASHBOARD_TAB.CHAT)}>{DASHBOARD_OVERVIEW_TABS.conversations}</MainTabButton>
                </MainTabBar>

                {/* PATIENT (USER) OVERVIEW VIEW */}
                {currentRole === DASHBOARD_ROLE.PATIENT && (
                  <>
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
                            {appointments.filter(a => a.status === APPOINTMENT_STATUS.CONFIRMED || a.status === APPOINTMENT_STATUS.PENDING)[0]?.date || PATIENT_METRICS_TEXT.nextVisitNone}
                          </MetricValue>
                          <MetricSub>
                            {appointments.filter(a => a.status === APPOINTMENT_STATUS.CONFIRMED || a.status === APPOINTMENT_STATUS.PENDING)[0]
                              ? `${PATIENT_METRICS_TEXT.nextVisitWithPrefix}${appointments.filter(a => a.status === APPOINTMENT_STATUS.CONFIRMED || a.status === APPOINTMENT_STATUS.PENDING)[0].doctorName}`
                              : PATIENT_METRICS_TEXT.nextVisitBookPrompt
                            }
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

                    <TabControlsRow>
                      <ResultsCountText>
                        {TREATMENTS_SECTION_TEXT.title}
                        <span>{filteredTreatments.length} {TREATMENTS_SECTION_TEXT.matchedSuffix}</span>
                      </ResultsCountText>
                      <SubTabsWrapper>
                        <SubTabButton $active={subTab === 'all'} onClick={() => setSubTab('all')}>{SUBTAB_LABELS.all}</SubTabButton>
                        <SubTabButton $active={subTab === 'recommended'} onClick={() => setSubTab('recommended')}>{SUBTAB_LABELS.recommended}</SubTabButton>
                        <SubTabButton $active={subTab === 'popular'} onClick={() => setSubTab('popular')}>{SUBTAB_LABELS.popular}</SubTabButton>
                        <SubTabButton $active={subTab === 'nearest'} onClick={() => setSubTab('nearest')}>{SUBTAB_LABELS.nearest}</SubTabButton>
                      </SubTabsWrapper>
                    </TabControlsRow>

                    {/* Grids of Services */}
                    <DashboardCardsGrid>
                      {filteredTreatments.map((t) => (
                        <DashboardCard key={t.id}>
                          <CardImageWrapper>
                            <img src={t.image} alt={t.name} />
                          </CardImageWrapper>
                          <CardBody>
                            <CardHeaderRow>
                              <CardTag>{t.tag}</CardTag>
                              <CardRating>
                                <Star size={13} fill="#e2a000" stroke="#e2a000" />
                                {t.rating}
                              </CardRating>
                            </CardHeaderRow>
                            <CardTitle>{t.name}</CardTitle>
                            <CardDoctor>{t.doctor}</CardDoctor>
                            <CardLocation>
                              <MapPin size={12} />
                              {TREATMENTS_SECTION_TEXT.locationLabel}
                            </CardLocation>
                            <CardPriceRow>
                              <CardPriceVal>{t.price}</CardPriceVal>
                              <CardActionBtn onClick={() => {
                                setDoctor(t.doctor);
                                setTreatment(t.name);
                                setActiveTab(DASHBOARD_TAB.APPOINTMENTS);
                              }}>
                                {TREATMENTS_SECTION_TEXT.bookVisitBtn}
                              </CardActionBtn>
                            </CardPriceRow>
                          </CardBody>
                        </DashboardCard>
                      ))}
                    </DashboardCardsGrid>

                    {/* Insurance Premium Promo Card at bottom */}
                    <HorizontalBanner>
                      <BannerContent>
                        <BannerTitle>{INSURANCE_BANNER_TEXT.title}</BannerTitle>
                        <BannerSubtitle>
                          {INSURANCE_BANNER_TEXT.subtitle}
                        </BannerSubtitle>
                        <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', width: '200px', overflow: 'hidden' }}>
                          <div style={{ background: colors.primary.default, height: '100%', width: '75%' }}></div>
                        </div>
                      </BannerContent>
                      <BannerAction>
                        <BannerMetric>{PATIENT_METRICS_TEXT.allowanceValue}</BannerMetric>
                        <BannerMetricLabel>{INSURANCE_BANNER_TEXT.metricLabel}</BannerMetricLabel>
                      </BannerAction>
                    </HorizontalBanner>
                  </>
                )}

                {/* CLINIC (ADMIN) OVERVIEW VIEW */}
                {currentRole === DASHBOARD_ROLE.ADMIN && (
                  <>
                    {/* Metrics Grid */}
                    <MetricsGrid>
                      <MetricCard>
                        <MetricHeader>
                          <MetricTitle>{ADMIN_METRICS_TEXT.queueTitle}</MetricTitle>
                          <MetricIcon $colorType="primary">
                            <UsersIcon size={18} />
                          </MetricIcon>
                        </MetricHeader>
                        <div>
                          <MetricValue>{allAppointments.filter(a => a.date === DASHBOARD_INITIAL_VALUES.DATE || a.status === APPOINTMENT_STATUS.CONFIRMED).length} {ADMIN_METRICS_TEXT.queueSuffix}</MetricValue>
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
                          <MetricValue>{allAppointments.filter(a => a.status === APPOINTMENT_STATUS.PENDING).length} {ADMIN_METRICS_TEXT.pendingSuffix}</MetricValue>
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

                    <TabControlsRow>
                      <ResultsCountText>
                        {ADMIN_QUEUE_TEXT.title}
                        <span>{filteredAdminAppointments.length} {ADMIN_QUEUE_TEXT.scheduledSuffix}</span>
                      </ResultsCountText>
                    </TabControlsRow>

                    {/* Appointments management list */}
                    <AppointmentList>
                      {filteredAdminAppointments.length > 0 ? (
                        filteredAdminAppointments.map((appt) => (
                          <AdminApptItem key={appt.id}>
                            <PatientInfoRow>
                              <MessageAvatar>
                                {appt.doctorName.split(' ').map(n => n[0]).join('')}
                              </MessageAvatar>
                              <PatientMetaText>
                                <PatientNameText>
                                  {appt.id === mockUser.nextAppointmentId ? mockUser.name : `${ADMIN_QUEUE_TEXT.patientNamePrefix} (${appt.id})`}
                                </PatientNameText>
                                <PatientSubText>
                                  {ADMIN_QUEUE_TEXT.treatmentLabel}<strong>{appt.type}</strong> ({appt.specialty})
                                </PatientSubText>
                                <PatientSubText style={{ fontSize: '11px', color: '#64748b' }}>
                                  {ADMIN_QUEUE_TEXT.scheduledLabel}{appt.date} at {appt.time}
                                </PatientSubText>
                              </PatientMetaText>
                            </PatientInfoRow>                             <StatusBadgeWrapper>
                              <StatusBadge $status={appt.status}>{appt.status}</StatusBadge>
                              <AdminActionGroup>
                                {appt.status === APPOINTMENT_STATUS.PENDING && (
                                  <AdminActionBtn $variant="success" onClick={() => onUpdateAppointmentStatus(appt.id, APPOINTMENT_STATUS.CONFIRMED)}>
                                    {ADMIN_QUEUE_TEXT.confirmBtn}
                                  </AdminActionBtn>
                                )}
                                {appt.status === APPOINTMENT_STATUS.CONFIRMED && (
                                  <AdminActionBtn $variant="primary" onClick={() => onUpdateAppointmentStatus(appt.id, APPOINTMENT_STATUS.COMPLETED)}>
                                    {ADMIN_QUEUE_TEXT.checkInBtn}
                                  </AdminActionBtn>
                                )}
                                {appt.status !== APPOINTMENT_STATUS.COMPLETED && appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                                  <AdminActionBtn $variant="danger" onClick={() => onUpdateAppointmentStatus(appt.id, APPOINTMENT_STATUS.CANCELLED)}>
                                    {ADMIN_QUEUE_TEXT.cancelBtn}
                                  </AdminActionBtn>
                                )}
                              </AdminActionGroup>
                            </StatusBadgeWrapper>
                          </AdminApptItem>
                        ))
                      ) : (
                        <p>{ADMIN_QUEUE_TEXT.emptyState}</p>
                      )}
                    </AppointmentList>

                    {/* Clinic Operations metrics banner */}
                    <HorizontalBanner>
                      <BannerContent>
                        <BannerTitle>{ADMIN_OPS_BANNER_TEXT.title}</BannerTitle>
                        <BannerSubtitle>
                          {ADMIN_OPS_BANNER_TEXT.subtitle}
                        </BannerSubtitle>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '16px' }}>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{ADMIN_OPS_BANNER_TEXT.chairsOccupiedLabel}<strong>{ADMIN_OPS_BANNER_TEXT.chairsOccupiedValue}</strong></span>
                          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{ADMIN_OPS_BANNER_TEXT.staffOnDutyLabel}<strong>{ADMIN_OPS_BANNER_TEXT.staffOnDutyValue}</strong></span>
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
                <StyledDashboardCard>
                  <StyledCardTitle>
                    <Calendar size={18} />
                    {APPOINTMENTS_TAB_TEXT.scheduleTitle}
                  </StyledCardTitle>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <SubTabButton $active={filter === APPOINTMENT_FILTER.ALL} onClick={() => setFilter(APPOINTMENT_FILTER.ALL)}>{APPOINTMENTS_TAB_TEXT.filterAll}</SubTabButton>
                    <SubTabButton $active={filter === APPOINTMENT_FILTER.UPCOMING} onClick={() => setFilter(APPOINTMENT_FILTER.UPCOMING)}>{APPOINTMENTS_TAB_TEXT.filterUpcoming}</SubTabButton>
                    <SubTabButton $active={filter === APPOINTMENT_FILTER.PAST} onClick={() => setFilter(APPOINTMENT_FILTER.PAST)}>{APPOINTMENTS_TAB_TEXT.filterPast}</SubTabButton>
                  </div>

                  <AppointmentList>
                    {appointments.length > 0 ? (
                      appointments.map((appt) => (
                        <AppointmentCard key={appt.id}>
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
                            {appt.status !== APPOINTMENT_STATUS.COMPLETED && appt.status !== APPOINTMENT_STATUS.CANCELLED && (
                              <ActionLink onClick={() => onCancelAppointment(appt.id)}>
                                {APPOINTMENTS_TAB_TEXT.cancelVisit}
                              </ActionLink>
                            )}
                          </StatusBadgeWrapper>
                        </AppointmentCard>
                      ))
                    ) : (
                      <p>{APPOINTMENTS_TAB_TEXT.emptyState}</p>
                    )}
                  </AppointmentList>
                </StyledDashboardCard>

                {currentRole === DASHBOARD_ROLE.PATIENT && (
                  <StyledDashboardCard>
                    <StyledCardTitle>
                      <HeartPulse size={18} />
                      {APPOINTMENTS_TAB_TEXT.newApptTitle}
                    </StyledCardTitle>
                    <form onSubmit={handleBook}>
                      <FormRow>
                        <FormField>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{APPOINTMENTS_TAB_TEXT.chooseDoctor}</label>
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
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{APPOINTMENTS_TAB_TEXT.treatmentPlan}</label>
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
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{DASHBOARD_TEXT.dateLabel}</label>
                          <StyledInput
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </FormField>
                        <FormField>
                          <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{APPOINTMENTS_TAB_TEXT.preferredTimeSlot}</label>
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
                        {APPOINTMENTS_TAB_TEXT.submitBtn}
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
                    {currentRole === DASHBOARD_ROLE.ADMIN ? RECORDS_TAB_TEXT.adminTitle : RECORDS_TAB_TEXT.patientTitle}
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
                    {RECORDS_TAB_TEXT.diagnosesTitle}
                  </StyledCardTitle>
                  <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#475569' }}>
                    {activeDiagnoses.map((dx) => (
                      <li key={dx.id}><strong>{dx.title}</strong>: {dx.desc}</li>
                    ))}
                  </ul>
                </StyledDashboardCard>
              </>
            )}

            {/* ANALYTICS TAB */}
            {activeTab === DASHBOARD_TAB.ANALYTICS && (
              <StyledDashboardCard>
                <StyledCardTitle>
                  <Sparkles size={18} />
                  {ANALYTICS_TAB_TEXT.title}
                </StyledCardTitle>
                <p style={{ fontSize: '14px', color: '#64748b' }}>
                  {ANALYTICS_TAB_TEXT.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      <span>{ANALYTICS_TAB_TEXT.brushingLabel}</span>
                      <span>{ANALYTICS_TAB_TEXT.brushingValue}</span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '92%', background: colors.primary.default }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      <span>{ANALYTICS_TAB_TEXT.flossingLabel}</span>
                      <span>{ANALYTICS_TAB_TEXT.flossingValue}</span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '65%', background: colors.primary.accent }}></div>
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                      <span>{ANALYTICS_TAB_TEXT.plaqueLabel}</span>
                      <span>{ANALYTICS_TAB_TEXT.plaqueValue}</span>
                    </div>
                    <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: '40%', background: '#10b981' }}></div>
                    </div>
                  </div>
                </div>
              </StyledDashboardCard>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <StyledDashboardCard>
                <StyledCardTitle>
                  <Settings size={18} />
                  {SETTINGS_TAB_TEXT.title}
                </StyledCardTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <FormField>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{SETTINGS_TAB_TEXT.emailLabel}</label>
                    <StyledInput type="email" value={user.email} disabled />
                  </FormField>
                  <FormField>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{SETTINGS_TAB_TEXT.phoneLabel}</label>
                    <StyledInput type="tel" value={user.phone} disabled />
                  </FormField>
                  <FormField>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>{SETTINGS_TAB_TEXT.notificationLabel}</label>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                      <label><input type="checkbox" defaultChecked /> {SETTINGS_TAB_TEXT.emailAlerts}</label>
                      <label><input type="checkbox" defaultChecked /> {SETTINGS_TAB_TEXT.smsAlerts}</label>
                    </div>
                  </FormField>
                </div>
              </StyledDashboardCard>
            )}
          </MiddleContentScroll>

          {/* Right Sidebar panels */}
          <RightSidebarScroll>
            {/* Panel 1: Recent Messages */}
            <div>
              <PanelTitle>
                {RIGHT_PANEL_TEXT.recentMessagesTitle}
                <span style={{ fontSize: '11px', background: colors.primary.default, color: 'white', padding: '2px 6px', borderRadius: '10px' }}>{recentMessages.length}</span>
              </PanelTitle>

              <MessageList>
                {recentMessages.map((msg) => (
                  <MessageItem key={msg.id} onClick={() => setActiveTab('chat')}>
                    <MessageAvatar style={{ background: msg.avatarBg || colors.primary.default, color: msg.avatarBg ? undefined : 'white' }}>{msg.avatarInitials}</MessageAvatar>
                    <MessageContent>
                      <MessageSender>{msg.sender}</MessageSender>
                      <MessageText>{msg.text}</MessageText>
                    </MessageContent>
                    {msg.hasBadge && <MessageBadge />}
                  </MessageItem>
                ))}
              </MessageList>
            </div>

            {/* Panel 2: Interactive map view */}
            <div>
              <PanelTitle>{RIGHT_PANEL_TEXT.mapViewTitle}</PanelTitle>
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
    </DashboardContainer>
  );
};

const StylizedClinicMap: React.FC = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 220" style={{ background: '#f1f5f9', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#map-grid)" />

      {/* River */}
      <path d="M 230 -10 Q 270 100 210 230 L 330 230 L 330 -10 Z" fill="#bae6fd" opacity="0.6" />
      <text x="250" y="140" fill="#0284c7" fontSize="8" fontWeight="700" fontFamily="sans-serif" opacity="0.4" transform="rotate(75 250 140)">{CLINIC_MAP_LABELS.river}</text>

      {/* Parks */}
      <rect x="20" y="20" width="80" height="60" rx="8" fill="#dcfce7" opacity="0.7" />
      <text x="32" y="52" fill="#166534" fontSize="8" fontWeight="700" fontFamily="sans-serif" opacity="0.6">{CLINIC_MAP_LABELS.park}</text>

      {/* Streets grid */}
      <line x1="120" y1="0" x2="120" y2="220" stroke="#ffffff" strokeWidth="12" />
      <line x1="120" y1="0" x2="120" y2="220" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

      <line x1="200" y1="0" x2="200" y2="220" stroke="#ffffff" strokeWidth="12" />
      <line x1="200" y1="0" x2="200" y2="220" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

      <line x1="0" y1="100" x2="320" y2="100" stroke="#ffffff" strokeWidth="16" />
      <line x1="0" y1="100" x2="320" y2="100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

      {/* Street labels */}
      <text x="124" y="190" fill="#94a3b8" fontSize="7" fontWeight="700" transform="rotate(-90 124 190)" fontFamily="sans-serif" letterSpacing="0.5">{CLINIC_MAP_LABELS.avenue}</text>
      <text x="10" y="104" fill="#94a3b8" fontSize="7" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.5">{CLINIC_MAP_LABELS.medicalAve}</text>

      {/* Buildings */}
      <rect x="145" y="65" width="20" height="20" rx="4" fill="#cbd5e1" opacity="0.8" />
      <rect x="145" y="25" width="20" height="20" rx="4" fill="#cbd5e1" opacity="0.8" />

      {/* Clinic Marker Anchor */}
      <g transform="translate(160, 100)">
        {/* Pulsing ring */}
        <circle cx="0" cy="0" r="14" fill={`rgba(${colors.rgb.primary}, 0.25)`}>
          <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
        </circle>
        {/* Static center dot */}
        <circle cx="0" cy="0" r="5" fill={colors.primary.default} stroke="#ffffff" strokeWidth="1.5" />
      </g>
    </svg>
  );
};

export default Dashboard;
