export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  dob: string;
  memberSince: string;
  insuranceProvider: string;
  policyNumber: string;
  nextAppointmentId?: string;
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  type: string; // e.g., Consultation, Cleanup, etc.
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const mockUser: User = {
  id: "pat_8820",
  name: "Alex Rivers",
  email: "alex.rivers@dentalcare.com",
  phone: "+1 (555) 234-5678",
  avatar: "AR",
  dob: "1994-10-12",
  memberSince: "2023",
  insuranceProvider: "Apex Dental Premium",
  policyNumber: "POL-7739-10A",
  nextAppointmentId: "appt_101"
};

export const mockAppointments: Appointment[] = [
  {
    id: "appt_101",
    doctorName: "Dr. Marcus Vance",
    specialty: "General Dentistry",
    date: "2026-06-15",
    time: "10:30 AM",
    type: "Routine Clean & Scaling",
    status: "confirmed",
    notes: "Please arrive 10 minutes early. Remember to bring your insurance card."
  },
  {
    id: "appt_102",
    doctorName: "Dr. Sarah Jenkins",
    specialty: "Orthodontics",
    date: "2026-07-02",
    time: "02:00 PM",
    type: "Invisalign Checkup",
    status: "pending",
    notes: "Routine alignment progress check."
  },
  {
    id: "appt_103",
    doctorName: "Dr. Evelyn Ross",
    specialty: "Oral Surgery",
    date: "2026-04-12",
    time: "09:00 AM",
    type: "Wisdom Tooth Extraction Consultation",
    status: "completed",
    notes: "X-rays completed, extraction scheduled for future date."
  },
  {
    id: "appt_104",
    doctorName: "Dr. Marcus Vance",
    specialty: "General Dentistry",
    date: "2025-11-20",
    time: "11:00 AM",
    type: "Cavity Filling",
    status: "completed",
    notes: "Lower left molar filled successfully."
  },
  {
    id: "appt_105",
    doctorName: "Dr. Evelyn Ross",
    specialty: "Oral Surgery",
    date: "2026-01-18",
    time: "03:30 PM",
    type: "Emergency Crown Repair",
    status: "cancelled",
    notes: "Cancelled by patient due to scheduling conflict."
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t_1",
    name: "Eleanor Vance",
    role: "Patient since 2022",
    text: "The AI assistant answered all my concerns about dental implants instantly, and Dr. Ross made the actual procedure completely painless. Simply the best dental experience I've ever had!",
    rating: 5
  },
  {
    id: "t_2",
    name: "Devon Carter",
    role: "Patient since 2024",
    text: "Booking is so simple. I used the AI chat to understand my symptoms before coming in, and the dentist was already briefed. Highly professional and state-of-the-art.",
    rating: 5
  },
  {
    id: "t_3",
    name: "Sofia Rodriguez",
    role: "Patient since 2021",
    text: "Beautiful clinic, glassmorphic patient portal, and incredibly caring staff. Dr. Jenkins helped me achieve my dream smile with Invisalign. Can't recommend Rik Dental enough!",
    rating: 5
  }
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: "msg_1",
    sender: "ai",
    text: "Hello Alex! I am Rik Dental's AI Assistant. How can I help you today? You can ask me about dental symptoms, clarify post-operation care guidelines, or ask about your upcoming appointments.",
    timestamp: new Date("2026-06-01T10:00:00")
  },
  {
    id: "msg_2",
    sender: "user",
    text: "Hi! I just noticed some sensitivity to hot drinks in my lower left molar. What should I do?",
    timestamp: new Date("2026-06-01T10:01:00")
  },
  {
    id: "msg_3",
    sender: "ai",
    text: "Sensitivity to heat in a specific tooth can sometimes indicate a cavity or minor nerve irritation. I suggest avoiding very hot or cold beverages for now. Since you have an upcoming appointment with Dr. Marcus Vance on June 15th, I recommend mentioning it to him. If the pain becomes severe, throbbing, or keeps you awake, please let me know so we can schedule an emergency visit.",
    timestamp: new Date("2026-06-01T10:01:30")
  }
];

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  rating: number;
}

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  bio: string;
}

export const mockDoctorProfiles: DoctorProfile[] = [
  {
    id: "doc_carter",
    name: "Dr. Daniel Carter",
    role: "Lead Dental Specialist",
    rating: 4.8,
    reviewsCount: 45,
    avatarUrl: "/doctor-carter.png",
    bio: "Join hundreds of patients achieving healthier, brighter smiles through expert dental care and personalized treatment plans with Dr. Daniel Carter."
  }
];

export const serviceCategories: ServiceCategory[] = [
  { id: "checkup", name: "Dental Checkup", description: "Routine exams to evaluate teeth alignment, gums, and oral health.", rating: 4.9 },
  { id: "cleaning", name: "Teeth Cleaning", description: "Deep scaling and polish to restore tooth color and prevent cavities.", rating: 4.8 },
  { id: "filling", name: "Tooth Filling", description: "Permanent natural-looking composite fillings to restore cavity decay.", rating: 4.9 },
  { id: "gum", name: "Gum Treatment", description: "Specialized care for bleeding gums, swelling, and periodontal disease.", rating: 4.7 },
  { id: "retainers", name: "Retainers", description: "Post-braces alignment retainers to preserve healthy tooth spacing.", rating: 4.9 }
];

export const careTimelineSteps = [
  { step: "01", name: "Smile Assessment", desc: "Initial visual scan and 3D dental digital mapping." },
  { step: "02", name: "Care Planning", desc: "Consultation and customized clinical timeline design." },
  { step: "03", name: "Treatment Process", desc: "Safe, precision-guided dental operations." },
  { step: "04", name: "Dental Maintenance", desc: "Post-care checkups and routine clean schedules." }
];

