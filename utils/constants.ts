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
  badge: 'Introducing AI Dental Support',
  titleFirst: 'Family-Friendly',
  titleSecond: 'Dental Care',
  subtitle: 'Permanent natural-looking solutions to replace missing teeth and restore confident healthy smiles.',
  primaryBtn: 'Book a Appointment',
  secondaryBtn: 'Book a Call',
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
  badge: 'Feature Treatment',
  title: 'Advanced Dental Care for a Healthier Smile',
  bookBtn: 'Book Appointment',
  checkupsLabel: 'Recommended Checkups per year',
  checkupsVal: '2 Visits',
  timeLabel: 'Average Treatment Time',
  timeVal: '40 Mins',
  progressTitle: "Today's Appointment Progress",
  progressVal: '68%',
} as const;

export const HOME_WHY_CHOOSE = {
  titleFirst: 'Why Choose',
  titleSpan: 'Precision Dental?',
  featureCardTitle: 'Complete Oral Care Solutions',
  rewardsBadge: 'Rewards',
  rewardsTitle: 'Maintain your preventive care streak and earn exclusive rewards.',
  rewardsDesc: 'Get special discounts on whitening packages and cosmetic treatments by completing scheduled biannual hygiene cleanings.',
  radFreeTitle: 'Radiation-Free',
  radFreeDesc: 'Health Diagnostics',
  radFreeMetric: '98%',
} as const;

export const HOME_TESTIMONIALS = {
  badge: 'Testimonials',
  title: 'What Our Patients Say',
} as const;

export const HOME_INSIGHTS = {
  badge: 'Our Insights',
  title: 'Advanced Dental Care Ensures Precision Comfort And Long Lasting Healthy Smiles.',
  btn: 'Book a Call',
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
  phoneLabel: 'Phone Number',
  phonePlaceholder: 'e.g. +1 (555) 000-0000',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  signInBtn: 'Sign In',
  signUpBtn: 'Sign Up',
  noAccount: "Don't have an account?",
  hasAccount: 'Already have an account?',
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

