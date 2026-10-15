import { ROUTES } from './routes';

// ==========================================
// 1. GENERAL / SESSION CONSTANTS
// ==========================================
export const USER_SESSION_KEY = 'user';

export const BRAND_NAME = {
  first: 'Rik',
  second: 'Dental',
} as const;

export const APP_METADATA = {
  title: 'Rik Dental Care Center',
  description: 'State-of-the-art patient portal and AI consultation support',
} as const;

export const AUTH_PATH_PREFIX = '/auth';

// ==========================================
// 2. NAVBAR & SIDEBAR
// ==========================================
export const NAVBAR_TEXT = {
  logoFirst: 'Rik',
  logoSecond: 'Dental',
  patientRole: 'Patient',
  logIn: 'Log In',
  bookConsult: 'Book Consult',
  logOut: 'Log Out',
} as const;

export const NAVBAR_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Specialists', href: ROUTES.SPECIALISTS },
  { label: 'About Us', href: ROUTES.ABOUT },
  { label: 'Emergency', href: ROUTES.EMERGENCY },
] as const;

export const SIDEBAR_TEXT = {
  dashboard: 'Dashboard',
  aiAssistant: 'AI Assistant',
  logOut: 'Log Out',
} as const;

// ==========================================
// 3. CHAT COMPONENT / PAGE
// ==========================================
export const CHAT_QUICK_PROMPTS = [
  'I have a toothache, what should I do?',
  'When is my next appointment?',
  'How much does a routine cleaning cost?',
  'Do you accept Apex Dental insurance?',
] as const;

export const CHAT_TEXT = {
  windowTitle: 'AI Dental Assistant',
  onlineStatus: 'Online & Ready to Help',
  clearHistory: 'Clear History',
  botName: 'Rik Bot',
  userName: 'You',
  thinking: 'Rik Bot is thinking...',
  placeholder: 'Type your message here...',
  pageTitle: 'AI Consultation Assistant',
  pageSubtitle: 'Ask questions about symptoms, checkup procedures, or post-operative dental care.',
} as const;

// ==========================================
// 4. HOME PAGE
// ==========================================
export const HOME_HERO = {
  badge: 'State-of-the-Art Dental Care',
  titleFirst: 'Modern, Gentle',
  titleSecond: 'Dental Care',
  subtitle: 'Experience compassionate, precision-guided dentistry for the entire family. From routine hygiene cleanings to advanced reconstructive and cosmetic treatments.',
  primaryBtn: 'Book an Appointment',
  secondaryBtn: 'Explore Services',
  meetSpecialistsBtn: 'Meet Specialists',
  ratingTrust: '4.9/5 Rating (500+ Patients)',
  emergencyTrust: '24/7 Emergency Support',
  specialistsTrust: 'Board-Certified Specialists',
  imageAlt: 'Rik Dental Care clinic modern patient consultation',
  floatingBadge: 'Accredited Care • 98% Satisfaction',
  videoMeta: 'Restore natural healthy confident dental growth.',
  videoRating: '4.9 [Rating]',
} as const;

export const HOME_ABOUT = {
  badge: 'About Us',
  titleFirst: 'We deliver personalized dental treatments with modern',
  titleSpan: 'technology',
  titleSecond: 'and gentle care.',
  paragraph: 'Rik Dental Care Center integrates cutting-edge technology with general, restorative, and orthodontic expertise. Our state-of-the-art facility features 3D imaging, digital diagnostics, and an AI-driven support portal to ensure comfortable, efficient care for patients of all ages.',
  metrics: [
    { num: '98%', label: 'Satisfaction Rate' },
    { num: '2k+', label: 'Smiles Transformed' },
    { num: '4.9*', label: 'Customer Rating' },
  ],
} as const;

export const HOME_SERVICES = {
  badge: 'Clinical Services',
  title: 'Comprehensive Dental Treatments',
  subtitle: 'From preventive hygiene checkups to specialized surgery, our clinic provides end-to-end dental care.',
  bookBtn: 'Book Consultation',
  learnMore: 'Learn More',
  checkupsLabel: 'Recommended Checkups per year',
  checkupsVal: '2 Visits',
  timeLabel: 'Average Treatment Time',
  timeVal: '40 Mins',
  progressTitle: "Today's Appointment Progress",
  progressVal: '68%',
} as const;

export const HOME_SPECIALISTS_SECTION = {
  badge: 'Clinical Team',
  title: 'Meet Our Specialist Dentists',
  subtitle: 'Our multidisciplinary team brings decades of advanced clinical training and a compassionate, patient-first approach to every procedure.',
  viewAllBtn: 'View All Specialists',
  bookWithPrefix: 'Book with ',
} as const;

export const HOME_WHY_CHOOSE = {
  badge: 'The Rik Dental Difference',
  titleFirst: 'Why Patients Trust',
  titleSpan: 'Rik Dental Care',
  subtitle: 'We combine cutting-edge dental technology with a calming clinic environment designed to make every visit stress-free.',
  featureCardTitle: 'Complete Oral Care Solutions',
  rewardsBadge: 'Rewards',
  rewardsTitle: 'Maintain your preventive care streak and earn exclusive rewards.',
  rewardsDesc: 'Get special discounts on whitening packages and cosmetic treatments by completing scheduled biannual hygiene cleanings.',
  radFreeTitle: 'Radiation-Free',
  radFreeDesc: 'Health Diagnostics',
  radFreeMetric: '98%',
  items: [
    {
      title: '3D Digital Diagnostics',
      desc: 'Advanced low-radiation imaging and precision intraoral digital mapping for accurate diagnoses.',
    },
    {
      title: 'Gentle & Painless Dentistry',
      desc: 'Calming clinic environment and gentle sedation protocols designed to eliminate dental anxiety.',
    },
    {
      title: 'All Specialists Under One Roof',
      desc: 'Implantology, orthodontics, periodontics, and surgery coordinated seamlessly by our team.',
    },
    {
      title: 'Direct Insurance Billing',
      desc: 'Direct co-pay processing with Apex Dental and major insurance networks for hassle-free visits.',
    },
  ],
} as const;

export const HOME_CLINIC_INFO = {
  badge: 'Location & Hours',
  title: 'Visit Rik Dental Care Center',
  subtitle: 'Conveniently located in the Medical District with dedicated morning, evening, and 24/7 emergency slots.',
  hoursTitle: 'Operating Hours',
  contactTitle: 'Direct Contact',
  emergencyPrompt: 'Facing acute dental pain or tooth trauma?',
  emergencyBtn: '24/7 Emergency Care',
  callBtn: 'Call +1 (555) 745-3368',
} as const;

export const HOME_TESTIMONIALS = {
  badge: 'Patient Stories',
  title: 'What Our Patients Say',
  subtitle: 'Real experiences from patients who trust Rik Dental Care for their ongoing oral health.',
} as const;

export const HOME_INSIGHTS = {
  badge: 'Start Your Care Today',
  title: 'Restore Confidence in Your Smile with Rik Dental',
  subtitle: 'Schedule your comprehensive examination today or use our instant AI dental assistant for symptom guidance.',
  btn: 'Book Your Visit',
  aiBtn: 'Talk to AI Assistant',
} as const;

// ==========================================
// 5. ABOUT PAGE
// ==========================================
export const ABOUT_HERO = {
  badge: 'About Us',
  titleFirst: 'Redefining Dental',
  titleSpan: 'Excellence',
  subtitle: "Since 2010, Rik Dental Care Center has been setting the standard for boutique, patient-centric dental care.",
} as const;

export const ABOUT_STATS = [
  { num: '15+', label: 'Years of Excellence' },
  { num: '12,000+', label: 'Smiles Transformed' },
  { num: '98%', label: 'Patient Satisfaction' },
  { num: '24/7', label: 'Emergency Support' },
] as const;

export const ABOUT_STORY = {
  title: 'Our Story',
  paras: [
    "Founded by Dr. Rik Ahmed after years of advanced training at Harvard School of Dental Medicine, Rik Dental Care was born from a simple belief: dental visits don't have to be stressful.",
    "We designed every touchpoint—from our calming clinic interiors to our AI-powered booking system—to remove friction and anxiety. Today, we serve over 12,000 patients with a team of specialist dentists.",
  ],
} as const;

export const ABOUT_VALUES = {
  title: 'Our Core Values',
  subtitle: 'The principles that guide every interaction, every procedure, every smile.',
  list: [
    { title: 'Patient-First Philosophy', desc: 'Every decision we make centers on your comfort, health, and absolute well-being.' },
    { title: 'Clinical Integrity', desc: 'We adhere to the highest international safety standards with evidence-based dental care.' },
    { title: 'Aesthetic Precision', desc: 'Great dentistry is invisible. Our cosmetic work blends with your natural facial harmony.' },
    { title: 'Collaborative Care', desc: 'Our multidisciplinary team of specialists guarantees all your needs are solved under one roof.' },
  ],
} as const;

export const ABOUT_VISIT = {
  title: 'Visit Us',
  subtitle: 'We are conveniently located in the heart of the city.',
  cards: [
    { title: 'Location', val1: '42 Medical Plaza, Suite 300', val2: 'Dhaka, Bangladesh' },
    { title: 'Phone', val1: '+880 1234-567890', val2: '24/7 Emergency Line' },
    { title: 'Email', val1: 'care@rikdental.com', val2: 'We respond within 2 hours' },
  ],
} as const;

// ==========================================
// 6. SPECIALISTS PAGE
// ==========================================
export const SPECIALISTS_HERO = {
  badge: 'Our Clinical Team',
  titleFirst: 'World-Class',
  titleSpan: 'Specialists',
  subtitle: 'Each member of our team brings decades of specialized training and a commitment to painless, precision dentistry.',
} as const;

export const SPECIALISTS_LIST = [
  {
    name: 'Dr. Rik Ahmed',
    title: 'Founder & Lead Implantologist',
    experience: '15+ years',
    rating: 4.9,
    reviews: 248,
    image: '/doctor-carter.png',
    specialties: ['Dental Implants', 'Cosmetic Reconstruction', 'Regenerative Dentistry'],
    credentials: [
      { title: 'Ph.D. in Implantology', sub: 'Harvard School of Dental Medicine' },
      { title: 'Member of ADA & AACD', sub: 'Active contributor to global dental standards' },
      { title: 'National Excellence Award 2023', sub: 'Recognized for outstanding cosmetic work' },
    ],
  },
  {
    name: 'Dr. Sarah Chen',
    title: 'Orthodontist & Invisalign Specialist',
    experience: '10+ years',
    rating: 4.8,
    reviews: 195,
    image: '/hero-dentistry.png',
    specialties: ['Invisalign', 'Braces', 'Bite Correction'],
    credentials: [
      { title: 'D.D.S. in Orthodontics', sub: 'Columbia University' },
      { title: 'Invisalign Diamond Provider', sub: 'Top 1% of Invisalign providers globally' },
      { title: 'Published Researcher', sub: '15+ papers in orthodontic biomechanics' },
    ],
  },
  {
    name: 'Dr. Marcus Thorne',
    title: 'Periodontist & Gum Specialist',
    experience: '12+ years',
    rating: 4.9,
    reviews: 163,
    image: '/dental-chair.png',
    specialties: ['Gum Surgery', 'Laser Treatment', 'Periodontal Care'],
    credentials: [
      { title: 'M.D. in Periodontology', sub: 'University of Pennsylvania' },
      { title: 'Fellow, AAP', sub: 'American Academy of Periodontology' },
      { title: 'Laser Dentistry Certified', sub: 'Advanced training in LANAP procedures' },
    ],
  },
] as const;

export const SPECIALISTS_TEXT = {
  bookWithPrefix: 'Book with ',
} as const;

// ==========================================
// 7. EMERGENCY PAGE
// ==========================================
export const EMERGENCY_HERO = {
  badge: '24/7 Response Active',
  titleFirst: 'Emergency',
  titleSpan: 'Dental Care',
  subtitle: 'Experiencing acute dental pain, trauma, or a broken crown? Contact our dedicated trauma desk immediately.',
  phoneLabel: 'Call +880 1234-567890',
  phoneHref: 'tel:+8801234567890',
} as const;

export const EMERGENCY_SAFETY = {
  title: 'Critical Safety Information',
  desc: 'If you have experienced severe facial trauma, a fractured jaw, or difficulty breathing or swallowing, please bypass clinical dental checkups and proceed directly to the nearest hospital emergency room.',
} as const;

export const EMERGENCY_SECTIONS = {
  urgentHeading: 'Urgent Care Instructions',
  commonHeading: 'Common Inquiries',
} as const;

export const EMERGENCIES_LIST = [
  {
    q: 'Severe Dental Trauma or Knocked-Out Tooth',
    a: 'If a tooth is knocked out, keep it moist. Try placing it back in the socket without touching the root, or store it in a cup of milk and contact us immediately. Re-implantation is most successful within 1 hour.',
  },
  {
    q: 'Lost Crown, Filling, or Broken Braces',
    a: 'Apply dental wax or temporary filling material (available at pharmacies) to protect the tooth surface. Avoid chewing on that side and request an emergency slot in your dashboard.',
  },
  {
    q: 'Extreme Toothache with Swelling',
    a: 'A throbbing toothache accompanied by facial swelling or a fever can indicate a serious abscess infection. Rinse with warm salt water, take over-the-counter pain relievers, and do not place aspirin directly on the gum.',
  },
] as const;

export const EMERGENCY_FAQS_LIST = [
  {
    q: 'Do you accept dental insurance for emergency procedures?',
    a: 'Yes, we partner with major insurance networks including Apex Dental Premium. Our administration team processes co-pays and filings directly for a hassle-free experience.',
  },
  {
    q: 'What is your emergency clinical protocol?',
    a: 'We allocate dedicated slots every day for urgent walkthroughs, severe trauma, or acute pain. You can call our 24/7 hotline directly or book an emergency query through our AI portal.',
  },
  {
    q: 'How long does Invisalign treatment usually take?',
    a: 'Typical alignment treatment takes between 6 to 18 months. We use digital 3D scans on your first consult to map out your custom treatment path.',
  },
] as const;

// ==========================================
// 8. DASHBOARD PAGE
// ==========================================
export const DASHBOARD_TEXT = {
  welcomePrefix: 'Welcome back, ',
  welcomeSubtitle: 'Here is your dental health summary and upcoming visits.',
  appointmentsTitle: 'Dental Appointments',
  filterAll: 'All',
  filterUpcoming: 'Upcoming',
  filterPast: 'Past',
  cancelLabel: 'Cancel',
  noAppointments: 'No appointments found matching this filter.',
  bookNewTitle: 'Book New Appointment',
  selectDoctor: 'Select Doctor',
  treatmentType: 'Treatment Type',
  dateLabel: 'Date',
  preferredTime: 'Preferred Time',
  timePlaceholder: 'e.g. 10:30 AM',
  submitBooking: 'Submit Appointment Request',
  patientProfile: 'Patient Profile',
  patientId: 'Patient ID',
  dob: 'Date of Birth',
  phone: 'Phone',
  memberSince: 'Member Since',
  insuranceProvider: 'Insurance Provider',
  policyNumber: 'Policy Number',
  teaserTitle: 'AI Assistant Advisor',
  teaserDesc: 'Have questions about tooth sensitivity, pain relief, or post-treatment dental care? Talk to our instant AI assistant.',
  teaserBtn: 'Start AI Chat',
} as const;

export const DOCTOR_OPTIONS = [
  { value: 'Dr. Marcus Vance', label: 'Dr. Marcus Vance (General)' },
  { value: 'Dr. Sarah Jenkins', label: 'Dr. Sarah Jenkins (Orthodontist)' },
  { value: 'Dr. Evelyn Ross', label: 'Dr. Evelyn Ross (Surgeon)' },
] as const;

export const TREATMENT_OPTIONS = [
  { value: 'Routine Clean & Scaling', label: 'Routine Clean & Scaling' },
  { value: 'Cavity Filling', label: 'Cavity Filling' },
  { value: 'Invisalign Consultation', label: 'Invisalign Consultation' },
  { value: 'Tooth Extraction', label: 'Tooth Extraction' },
] as const;

export const DASHBOARD_SIDEBAR_NAV = {
  dashboard: 'Dashboard',
  appointments: 'Appointments',
  aiChatAssistant: 'AI Chat Assistant',
  clinicRecords: 'Clinic Records',
  dentalHealthRecord: 'Dental Health Record',
  analytics: 'Analytics',
  settings: 'Settings',
  helpSupport: 'Help & Support',
  logOut: 'Log Out',
  chatBadgeCount: 3,
} as const;

export const DASHBOARD_ADMIN_PROFILE = {
  name: 'Dr. Daniel Carter',
  avatar: '/doctor-carter.png',
  role: 'Lead Specialist / Admin',
  greeting: 'Dr. Carter',
} as const;

export const DASHBOARD_SEARCH_PLACEHOLDER = {
  ADMIN: 'Search patient queues...',
  PATIENT: 'Search services / doctors...',
} as const;

export const DASHBOARD_OVERVIEW_TABS = {
  overview: 'Overview Panel',
  schedules: 'Schedules',
  medicalHistory: 'Medical History',
  conversations: 'Conversations',
} as const;

export const PATIENT_METRICS_TEXT = {
  nextVisitTitle: 'Next Visit',
  nextVisitNone: 'None Scheduled',
  nextVisitBookPrompt: 'Book a consultation below',
  nextVisitWithPrefix: 'With ',
  oralHygieneTitle: 'Oral Hygiene',
  oralHygieneValue: '92%',
  oralHygieneSub: 'Brushing Streak: Perfect',
  aiConsultsTitle: 'AI Consults',
  aiConsultsValue: '3 Active',
  aiConsultsSub: 'Rik Bot is online',
  allowanceTitle: 'Allowance',
  allowanceValue: '$1,200',
  allowanceSub: 'Remaining coverage limit',
} as const;

export const TREATMENTS_SECTION_TEXT = {
  title: 'Available Treatments',
  matchedSuffix: 'Options matched',
  bookVisitBtn: 'Book Visit',
  locationLabel: 'Rik Dental Main Center',
} as const;

export const SUBTAB_LABELS = {
  all: 'All',
  recommended: 'Recommended',
  popular: 'Popular',
  nearest: 'Nearest',
} as const;

export const INSURANCE_BANNER_TEXT = {
  title: 'Apex Dental Premium Active Plan',
  subtitle: 'Policy: POL-7739-10A • Standard composite fillings & scaling covered with 0% copay.',
  metricLabel: 'Remaining Allowance',
} as const;

export const ADMIN_METRICS_TEXT = {
  queueTitle: "Today's Queue",
  queueSuffix: 'visits',
  queueSub: 'Active patient listings',
  pendingTitle: 'Pending',
  pendingSuffix: 'Actions',
  pendingSub: 'Requires verification',
  chairStatusTitle: 'Chair Status',
  chairStatusValue: '3 / 4 Active',
  chairStatusSub: '1 Operational vacancy',
  dailyEarningsTitle: 'Daily Earnings',
  dailyEarningsValue: '$8,450',
  dailyEarningsSub: 'Total checkout receipts',
} as const;

export const ADMIN_QUEUE_TEXT = {
  title: 'Clinic Active Queue',
  scheduledSuffix: 'Patient visits scheduled',
  emptyState: 'No active scheduled visits found matching filters.',
  treatmentLabel: 'Treatment: ',
  scheduledLabel: 'Scheduled: ',
  patientNamePrefix: 'Patient',
  confirmBtn: 'Confirm',
  checkInBtn: 'Check In',
  cancelBtn: 'Cancel',
} as const;

export const ADMIN_OPS_BANNER_TEXT = {
  title: 'Rik Dental Operations Summary',
  subtitle: 'Clinical activities are operating within normal limits. 4 active treatment chairs.',
  chairsOccupiedLabel: 'Chairs Occupied: ',
  chairsOccupiedValue: '3 / 4',
  staffOnDutyLabel: 'Staff on Duty: ',
  staffOnDutyValue: '7 Clinical',
  revenueValue: '$8,450',
  revenueLabel: 'Revenue Collected Today',
} as const;

export const APPOINTMENTS_TAB_TEXT = {
  scheduleTitle: 'My Appointments Schedule',
  filterAll: 'All Statuses',
  filterUpcoming: 'Upcoming',
  filterPast: 'Completed / Past',
  emptyState: 'You have no appointments scheduled under this filter.',
  cancelVisit: 'Cancel Visit',
  newApptTitle: 'Request a New Appointment',
  chooseDoctor: 'Choose a Doctor',
  treatmentPlan: 'Treatment Plan',
  preferredTimeSlot: 'Preferred Time Slot',
  submitBtn: 'Submit Appointment Request',
  bookingNotes: 'Scheduled via patient portal.',
} as const;

export const RECORDS_TAB_TEXT = {
  adminTitle: 'Clinic Patient Registry',
  patientTitle: 'My Clinical Profile',
  fullName: 'Full Patient Name',
  registryId: 'Patient Registry ID',
  dob: 'Date of Birth',
  phone: 'Phone Number',
  memberSince: 'Member Since',
  insuranceProvider: 'Insurance Provider',
  policyNumber: 'Insurance Policy Number',
  diagnosesTitle: 'Active Diagnoses & Treatment Plan',
} as const;

export const ANALYTICS_TAB_TEXT = {
  title: 'Oral Hygiene Analytics',
  description: 'Below are records of brushing compliance tracked over the last quarter. Perfect compliance requires brushing twice a day for 2 minutes.',
  brushingLabel: 'Brushing Compliance Percentage',
  brushingValue: '92%',
  flossingLabel: 'Flossing Compliance Percentage',
  flossingValue: '65%',
  plaqueLabel: 'Plaque Index Score',
  plaqueValue: 'Good (1.2 / 3.0)',
} as const;

export const SETTINGS_TAB_TEXT = {
  title: 'Account & Profile Settings',
  emailLabel: 'Register Email Address',
  phoneLabel: 'Contact Phone',
  notificationLabel: 'Notification Channels',
  emailAlerts: 'Email alerts',
  smsAlerts: 'SMS alerts',
} as const;

export const RIGHT_PANEL_TEXT = {
  recentMessagesTitle: 'Recent Messages',
  mapViewTitle: 'Map View',
  clinicName: 'Rik Dental Headquarters',
  clinicAddress: '120 Dental Plaza, Medical District',
} as const;

export const CLINIC_MAP_LABELS = {
  river: 'RIVER',
  park: 'GREEN PARK',
  avenue: '5TH AVENUE',
  medicalAve: 'MEDICAL AVE',
} as const;

export const DASHBOARD_DIALOG_TEXT = {
  confirmCancelTitle: 'Cancel Appointment?',
  confirmCancelDesc: 'Are you sure you want to cancel this visit? This appointment slot will be released back to the clinic queue.',
  confirmCancelKeep: 'Keep Appointment',
  confirmCancelProceed: 'Yes, Cancel Visit',
  bookModalTitle: 'Book New Appointment',
  bookModalSubtitle: 'Select a clinical specialist, treatment procedure, and your preferred appointment time.',
  closeModal: 'Close dialog',
  successBookTitle: 'Appointment Requested!',
  successBookDesc: 'Your appointment has been scheduled and added to your dental calendar.',
} as const;

export const DASHBOARD_REDESIGN_TEXT = {
  quickBookCta: 'Book Appointment',
  nextVisitBadge: 'NEXT UPCOMING VISIT',
  nextVisitNoLocation: 'Suite 300 • Chair 2',
  viewAllVisits: 'View All Visits',
  tableHeaderDate: 'Date & Time',
  tableHeaderDoctor: 'Doctor & Specialty',
  tableHeaderTreatment: 'Treatment Plan',
  tableHeaderStatus: 'Status',
  tableHeaderActions: 'Actions',
  emptyFilterTitle: 'No Appointments Found',
  emptyFilterDesc: 'You do not have any appointments matching the selected filter. Schedule a visit with our dental team.',
  filterAllBadge: 'All',
  filterUpcomingBadge: 'Upcoming',
  filterPastBadge: 'Completed',
  filterCancelledBadge: 'Cancelled',
  insurancePolicyLabel: 'Policy ID: ',
  insuranceAllowanceLabel: 'Remaining Coverage Allowance',
  insuranceCoverageProgress: '75% Used',
  quickAssistantPrompt: 'Need instant guidance on dental pain or preparation?',
  quickAssistantBtn: 'Chat with AI Assistant',
  rescheduleNotice: 'To reschedule, please contact clinic reception or cancel and re-book.',
  statusTooltipConfirmed: 'Confirmed by clinic staff',
  statusTooltipPending: 'Awaiting clinic confirmation',
  statusTooltipCompleted: 'Visit completed',
  statusTooltipCancelled: 'Visit cancelled',
  patientProfileCardTitle: 'Patient Dental Profile',
  emergencyDeskNotice: 'Dental Emergency? Call our 24/7 hotline at +1 (555) 911-DENT',
  overviewHeroTag: 'PATIENT PORTAL',
} as const;

// ==========================================
// 9. AUTH PAGE
// ==========================================
export const AUTH_TEXT = {
  backBtn: 'Back to Home',
  welcomeBack: 'Welcome Back',
  createAccount: 'Create Account',
  loginSubtitle: 'Enter your details below to access your patient portal',
  registerSubtitle: 'Sign up to manage your dental appointments and history',
  fullNameLabel: 'Full Name',
  fullNamePlaceholder: 'e.g. John Doe',
  emailLabel: 'Email Address',
  emailPlaceholder: 'e.g. name@example.com',
  phoneLabel: 'Phone Number (Optional)',
  phonePlaceholder: 'e.g. +1 (555) 000-0000',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  signInBtn: 'Sign In',
  signUpBtn: 'Create Account',
  noAccount: "Don't have an account?",
  hasAccount: 'Already have an account?',
  forgotPassword: 'Forgot password?',
  
  // Role switcher
  rolePatient: 'Patient Portal',
  roleAdmin: 'Clinic Staff',
  
  // Password Recovery
  recoveryTitle: 'Reset Password',
  recoverySubtitle: 'Enter your registered email address and we will send you secure recovery instructions.',
  recoveryBtn: 'Send Reset Link',
  recoverySuccessTitle: 'Check Your Inbox',
  recoverySuccessDesc: 'We have dispatched a secure password reset link to your email address. Follow the link inside to set a new password.',
  recoveryBackToLogin: 'Return to Sign In',
  recoveryResend: "Didn't receive an email? Resend link",
  
  // Accessibility & Visibility
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  
  // Loading states
  loadingSignIn: 'Signing in...',
  loadingSignUp: 'Creating account...',
  loadingRecovery: 'Sending instructions...',
  
  // Validation errors
  errNameRequired: 'Full name is required to register',
  errEmailRequired: 'Email address is required',
  errEmailInvalid: 'Please enter a valid email address (e.g. name@example.com)',
  errPasswordRequired: 'Password is required',
  errPasswordShort: 'Password must be at least 8 characters long',
  errPhoneInvalid: 'Please enter a valid phone number',
  errUnexpected: 'An unexpected authentication error occurred. Please try again.',
  
  // Security & Trust Badges
  badgeHipaa: 'HIPAA Compliant',
  badgeEncryption: '256-Bit SSL Encrypted',
  badgeSpecialists: 'Certified Dental Specialists',
  
  // Side Showcase Banner
  sideEyebrow: 'PATIENT & CLINICAL PORTAL',
  sideHeading: 'Exceptional Dental Care, Effortlessly Managed',
  sideDescription: 'Schedule seamless appointments, access digital diagnostic records, and communicate with your dedicated care team.',
  emergencyCallout: 'Emergency dental triage available 24/7 at +1 (555) 911-DENT',
} as const;

// ==========================================
// 10. FOOTER CONSTANTS (RETAINED FROM PREVIOUS EDIT)
// ==========================================
export const FOOTER_BRAND = {
  first: 'Rik',
  second: 'Dental',
} as const;

export const FOOTER_DESCRIPTION = 'State-of-the-art dental care center offering expert clinical services and innovative AI-assisted consultation diagnostics for your oral health needs.';

export const FOOTER_TITLES = {
  quickLinks: 'Quick Links',
  openingHours: 'Opening Hours',
  contactUs: 'Contact Us',
} as const;

export const FOOTER_QUICK_LINKS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Specialists', href: ROUTES.SPECIALISTS },
  { label: 'About Us', href: ROUTES.ABOUT },
  { label: 'Emergency Care', href: ROUTES.EMERGENCY },
] as const;

export const FOOTER_COPYRIGHT = 'Rik Dental Care Center. All rights reserved.';

export const FOOTER_BOTTOM_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const;

export const OPENING_HOURS = [
  { day: 'Mon - Fri', time: '8:00 AM - 7:00 PM' },
  { day: 'Saturday', time: '9:00 AM - 4:00 PM' },
  { day: 'Sunday', time: 'Emergency Only' },
] as const;

export const CONTACT_INFO = {
  address: '120 Dental Plaza, Suite 400, Medical District',
  phone: '+1 (555) 745-3368',
  email: 'support@rikdental.com',
} as const;

// ==========================================
// 11. STATE LITERALS & INITIAL VALUES
// ==========================================
export const DASHBOARD_ROLE = {
  PATIENT: 'patient',
  ADMIN: 'admin',
} as const;

export const DASHBOARD_TAB = {
  OVERVIEW: 'overview',
  APPOINTMENTS: 'appointments',
  CHAT: 'chat',
  RECORDS: 'records',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
} as const;

export const DASHBOARD_SUBTAB = {
  ALL: 'all',
  RECOMMENDED: 'recommended',
  POPULAR: 'popular',
  NEAREST: 'nearest',
} as const;

export const APPOINTMENT_FILTER = {
  ALL: 'all',
  UPCOMING: 'upcoming',
  PAST: 'past',
} as const;

export const APPOINTMENT_STATUS = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const DASHBOARD_INITIAL_VALUES = {
  DATE: '2026-06-18',
  TIME: '09:30 AM',
  REFERENCE_DATE: '2026-06-01',
} as const;
