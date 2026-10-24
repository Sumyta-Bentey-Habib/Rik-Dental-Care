'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { authApi } from '@/features/auth/api';
import { isApiError } from '@/lib/api';
import {
  AuthSession,
  AuthUser,
  LoginPayload,
  RegisterPayload,
  RegisterResponseData,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from '@/types/auth';
import { User } from '@/types';
import { USER_SESSION_KEY } from '@/constants/constants';

export interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  legacyUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<RegisterResponseData>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetOtp: (email: string, otp: string) => Promise<boolean>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  verifyEmail: (payload: VerifyEmailPayload) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  refreshUser: () => Promise<AuthUser | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapToLegacyUser = (authUser: AuthUser): User => {
  const initials = authUser.name
    ? authUser.name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const memberYear = authUser.createdAt
    ? new Date(authUser.createdAt).getFullYear().toString()
    : new Date().getFullYear().toString();

  return {
    id: authUser.id,
    name: authUser.name,
    email: authUser.email,
    phone: authUser.phone || '',
    avatar: initials,
    dob: '1995-01-01',
    memberSince: memberYear,
    insuranceProvider: 'Standard Dental Cover',
    policyNumber: `POL-${authUser.id.slice(-6).toUpperCase()}`,
    role: authUser.role === 'ADMIN' ? 'admin' : 'patient',
  };
};

const syncSessionStorage = (user: AuthUser | null) => {
  if (typeof window === 'undefined') return;

  try {
    if (user) {
      const legacy = mapToLegacyUser(user);
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(legacy));
    } else {
      sessionStorage.removeItem(USER_SESSION_KEY);
    }
    window.dispatchEvent(new Event('storage'));
  } catch {
    // Ignore storage quota or access errors in restricted environments
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasBootedRef = useRef(false);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const response = await authApi.getMe();
      if (response?.data?.user) {
        setUser(response.data.user);
        setSession(response.data.session || null);
        syncSessionStorage(response.data.user);
        setError(null);
        return response.data.user;
      }
      setUser(null);
      setSession(null);
      syncSessionStorage(null);
      return null;
    } catch {
      setUser(null);
      setSession(null);
      syncSessionStorage(null);
      return null;
    }
  }, []);

  useEffect(() => {
    if (hasBootedRef.current) return;
    hasBootedRef.current = true;

    const bootstrapAuth = async () => {
      setIsLoading(true);
      try {
        await refreshUser();
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrapAuth();
  }, [refreshUser]);

  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthUser> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.login(payload);
        const loggedUser = response.data.user;
        const loggedSession = response.data.session;

        setUser(loggedUser);
        setSession(loggedSession);
        syncSessionStorage(loggedUser);
        return loggedUser;
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : 'Login failed. Please check your credentials.';
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<RegisterResponseData> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.register(payload);
        return response.data;
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : 'Registration failed. Please try again.';
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Best-effort logout cleanup on client
    } finally {
      setUser(null);
      setSession(null);
      syncSessionStorage(null);
      setIsLoading(false);
      setError(null);
    }
  }, []);

  const forgotPassword = useCallback(async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.forgotPassword({ email });
    } catch (err: unknown) {
      const msg = isApiError(err) ? err.message : 'Failed to send password reset code.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyResetOtp = useCallback(
    async (email: string, otp: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.verifyResetOtp({ email, otp });
        return response?.success ?? true;
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : 'Invalid verification code.';
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetPassword = useCallback(
    async (payload: ResetPasswordPayload): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        await authApi.resetPassword(payload);
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : 'Failed to reset password.';
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const verifyEmail = useCallback(
    async (payload: VerifyEmailPayload): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authApi.verifyEmail(payload);
        if (response?.data?.user) {
          setUser(response.data.user);
          syncSessionStorage(response.data.user);
        }
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : 'Failed to verify email.';
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resendVerification = useCallback(
    async (email: string): Promise<void> => {
      setIsLoading(true);
      setError(null);

      try {
        await authApi.resendVerification({ email });
      } catch (err: unknown) {
        const msg = isApiError(err) ? err.message : 'Failed to resend verification code.';
        setError(msg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const legacyUser = useMemo(() => (user ? mapToLegacyUser(user) : null), [user]);
  const isAuthenticated = useMemo(() => user !== null, [user]);

  const contextValue: AuthContextType = useMemo(
    () => ({
      user,
      session,
      legacyUser,
      isAuthenticated,
      isLoading,
      error,
      login,
      register,
      logout,
      forgotPassword,
      verifyResetOtp,
      resetPassword,
      verifyEmail,
      resendVerification,
      refreshUser,
    }),
    [
      user,
      session,
      legacyUser,
      isAuthenticated,
      isLoading,
      error,
      login,
      register,
      logout,
      forgotPassword,
      verifyResetOtp,
      resetPassword,
      verifyEmail,
      resendVerification,
      refreshUser,
    ]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
