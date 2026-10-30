export type UserRole = 'PATIENT' | 'MANAGER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone?: string | null;
  image?: string | null;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  id: string;
  userId: string;
  token?: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  user: AuthUser;
  session: AuthSession;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RegisterResponseData {
  userId: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyResetOtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface ResendVerificationPayload {
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  revokeOtherSessions?: boolean;
}

// ==========================================
// AUTH UI & COMPONENT TYPES
// ==========================================
export type AuthMode = 'login' | 'register' | 'recovery';
export type RecoveryStep = 'request_otp' | 'enter_otp' | 'set_new_password' | 'completed';
export type RegisterStep = 'form' | 'verify_otp' | 'completed';
export type AuthRole = 'patient' | 'admin';

export interface AuthProps {
  onLoginSuccess: (user: import('./index').User) => void;
  onNavigateToHome: () => void;
  onToggleMode: (mode?: AuthMode) => void;
  initialMode?: AuthMode;
}

export interface LoginFormProps {
  role?: AuthRole;
  onLoginSuccess: (user: import('./index').User) => void;
  onForgotPassword: () => void;
  onSwitchToRegister: () => void;
}

export interface RegisterFormProps {
  role?: AuthRole;
  onSwitchToLogin: () => void;
  onStepChange?: (step: RegisterStep) => void;
}

export interface RecoveryFormProps {
  onSwitchToLogin: () => void;
}

export interface RoleSelectorProps {
  role: AuthRole;
  onSelectRole: (role: AuthRole) => void;
  showNotice?: boolean;
}

