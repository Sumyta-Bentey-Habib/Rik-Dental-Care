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
  role?: 'admin' | 'patient';
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
