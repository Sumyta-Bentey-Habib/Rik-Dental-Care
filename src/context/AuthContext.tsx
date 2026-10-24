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
import { USER_SESSION_KEY, AUTH_TEXT } from '@/constants/constants';
import { mapAuthUserToClientUser } from '@/utils';

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
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==========================================
// PERSISTENCE HELPER
// ==========================================
const syncSessionStorage = (user: AuthUser | null): void => {
  if (typeof window === 'undefined') return;

  try {
    if (user) {
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(mapAuthUserToClientUser(user)));
    } else {
      sessionStorage.removeItem(USER_SESSION_KEY);
    }
    window.dispatchEvent(new Event('storage'));
  } catch {
    // Non-blocking storage quota or sandbox fallback
  }
};

// ==========================================
// PROVIDER COMPONENT
// ==========================================
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasBootedRef = useRef(false);

  const clearError = useCallback(() => setError(null), []);

  /**
   * Centralized atomic state & persistence updater
   */
  const setAuthSession = useCallback(
    (nextUser: AuthUser | null, nextSession: AuthSession | null = null): void => {
      setUser(nextUser);
      setSession(nextSession);
      syncSessionStorage(nextUser);
    },
    []
  );

  /**
   * Generic asynchronous action executor to eliminate repetitive try/catch and loading boilerplate
   */
  const executeAuthAction = useCallback(
    async <T,>(action: () => Promise<T>, fallbackError: string): Promise<T> => {
      setIsLoading(true);
      setError(null);

      try {
        return await action();
      } catch (err: unknown) {
        const message = isApiError(err) ? err.message : fallbackError;
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Session hydration: validates HTTP-only session cookie against /api/v1/auth/me
   */
  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const response = await authApi.getMe();
      if (response?.data?.user) {
        setAuthSession(response.data.user, response.data.session || null);
        setError(null);
        return response.data.user;
      }
      setAuthSession(null, null);
      return null;
    } catch {
      setAuthSession(null, null);
      return null;
    }
  }, [setAuthSession]);

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

  // ==========================================
  // AUTHENTICATION ACTIONS
  // ==========================================
  const login = useCallback(
    async (payload: LoginPayload): Promise<AuthUser> => {
      return executeAuthAction(async () => {
        const response = await authApi.login(payload);
        const loggedUser = response.data.user;
        const loggedSession = response.data.session;

        setAuthSession(loggedUser, loggedSession);
        return loggedUser;
      }, AUTH_TEXT.errLoginFailed);
    },
    [executeAuthAction, setAuthSession]
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<RegisterResponseData> => {
      return executeAuthAction(async () => {
        const response = await authApi.register(payload);
        return response.data;
      }, AUTH_TEXT.errRegisterFailed);
    },
    [executeAuthAction]
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } catch {
      // Best-effort server session invalidation
    } finally {
      setAuthSession(null, null);
      setIsLoading(false);
      setError(null);
    }
  }, [setAuthSession]);

  const forgotPassword = useCallback(
    async (email: string): Promise<void> => {
      await executeAuthAction(async () => {
        await authApi.forgotPassword({ email });
      }, AUTH_TEXT.errForgotPasswordFailed);
    },
    [executeAuthAction]
  );

  const verifyResetOtp = useCallback(
    async (email: string, otp: string): Promise<boolean> => {
      return executeAuthAction(async () => {
        const response = await authApi.verifyResetOtp({ email, otp });
        return response?.success ?? true;
      }, AUTH_TEXT.errVerifyOtpFailed);
    },
    [executeAuthAction]
  );

  const resetPassword = useCallback(
    async (payload: ResetPasswordPayload): Promise<void> => {
      await executeAuthAction(async () => {
        await authApi.resetPassword(payload);
      }, AUTH_TEXT.errResetPasswordFailed);
    },
    [executeAuthAction]
  );

  const verifyEmail = useCallback(
    async (payload: VerifyEmailPayload): Promise<void> => {
      await executeAuthAction(async () => {
        const response = await authApi.verifyEmail(payload);
        if (response?.data?.user) {
          setAuthSession(response.data.user);
        }
      }, AUTH_TEXT.errVerifyEmailFailed);
    },
    [executeAuthAction, setAuthSession]
  );

  const resendVerification = useCallback(
    async (email: string): Promise<void> => {
      await executeAuthAction(async () => {
        await authApi.resendVerification({ email });
      }, AUTH_TEXT.errResendVerificationFailed);
    },
    [executeAuthAction]
  );

  // ==========================================
  // MEMOIZED DERIVED STATES & CONTEXT VALUE
  // ==========================================
  const legacyUser = useMemo(() => (user ? mapAuthUserToClientUser(user) : null), [user]);
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
      clearError,
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
      clearError,
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
