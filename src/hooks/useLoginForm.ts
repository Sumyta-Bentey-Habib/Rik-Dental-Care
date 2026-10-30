import { useState, useCallback } from 'react';
import { useAuth } from '@/context';
import { isApiError } from '@/lib/api';
import { AUTH_TEXT } from '@/constants/constants';
import { User, AuthRole } from '@/types';
import { isValidEmail, mapAuthUserToClientUser } from '@/utils';

interface UseLoginFormProps {
  role?: AuthRole;
  onLoginSuccess: (user: User) => void;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const useLoginForm = ({ onLoginSuccess }: UseLoginFormProps) => {
  const { login } = useAuth();

  const [email, setEmailState] = useState('');
  const [password, setPasswordState] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LoginFormErrors>({});

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    setFieldErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
  }, []);

  const setPassword = useCallback((value: string) => {
    setPasswordState(value);
    setFieldErrors((prev) => (prev.password ? { ...prev, password: undefined } : prev));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const validate = useCallback((): boolean => {
    const errors: LoginFormErrors = {};

    if (!email.trim()) {
      errors.email = AUTH_TEXT.errEmailRequired;
    } else if (!isValidEmail(email)) {
      errors.email = AUTH_TEXT.errEmailInvalid;
    }

    if (!password) {
      errors.password = AUTH_TEXT.errPasswordRequired;
    } else if (password.length < 8) {
      errors.password = AUTH_TEXT.errPasswordShort;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setGeneralError(null);

      if (!validate()) {
        return;
      }

      setIsLoading(true);

      try {
        const loggedUser = await login({
          email: email.trim(),
          password,
        });

        const clientUser = mapAuthUserToClientUser(loggedUser);
        onLoginSuccess(clientUser);
      } catch (err: unknown) {
        const message = isApiError(err) ? err.message : AUTH_TEXT.errUnexpected;
        setGeneralError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [validate, login, email, password, onLoginSuccess]
  );

  return {
    email,
    password,
    showPassword,
    isLoading,
    generalError,
    fieldErrors,
    setEmail,
    setPassword,
    toggleShowPassword,
    handleSubmit,
  };
};
