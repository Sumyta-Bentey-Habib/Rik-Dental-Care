import { apiRequest } from '@/lib/api';
import {
  ApiResponse,
  AuthUser,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
  RegisterResponseData,
  ResendVerificationPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from '@/types/auth';

export const authApi = {
  login: async (payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> => {
    return apiRequest<ApiResponse<LoginResponseData>>('/auth/login', {
      method: 'POST',
      json: payload,
    });
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<RegisterResponseData>> => {
    return apiRequest<ApiResponse<RegisterResponseData>>('/auth/register', {
      method: 'POST',
      json: payload,
    });
  },

  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    return apiRequest<ApiResponse<{ message: string }>>('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async (): Promise<ApiResponse<LoginResponseData>> => {
    return apiRequest<ApiResponse<LoginResponseData>>('/auth/me', {
      method: 'GET',
    });
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<ApiResponse<unknown>> => {
    return apiRequest<ApiResponse<unknown>>('/auth/forgot-password', {
      method: 'POST',
      json: payload,
    });
  },

  verifyResetOtp: async (payload: { email: string; otp: string }): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>('/api/auth/email-otp/check-verification-otp', {
      method: 'POST',
      json: {
        email: payload.email,
        type: 'forget-password',
        otp: payload.otp,
      },
    });
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ApiResponse<unknown>> => {
    return apiRequest<ApiResponse<unknown>>('/auth/reset-password', {
      method: 'POST',
      json: payload,
    });
  },

  verifyEmail: async (payload: VerifyEmailPayload): Promise<ApiResponse<{ user: AuthUser }>> => {
    return apiRequest<ApiResponse<{ user: AuthUser }>>('/auth/verify-email', {
      method: 'POST',
      json: payload,
    });
  },

  resendVerification: async (payload: ResendVerificationPayload): Promise<ApiResponse<unknown>> => {
    return apiRequest<ApiResponse<unknown>>('/auth/resend-verification', {
      method: 'POST',
      json: payload,
    });
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<ApiResponse<unknown>> => {
    return apiRequest<ApiResponse<unknown>>('/auth/change-password', {
      method: 'POST',
      json: payload,
    });
  },
};
