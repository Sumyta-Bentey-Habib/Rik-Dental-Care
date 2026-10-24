import { useState, useCallback } from 'react';
import { useAuth } from '@/context';
import { isApiError } from '@/lib/api';
import { AUTH_TEXT } from '@/constants/constants';
import { AuthRole, RegisterStep } from '@/types';
import { isValidEmail, isValidOtp, sanitizeOtp } from '@/utils';

interface UseRegisterFormProps {
  role: AuthRole;
  onStepChange?: (step: RegisterStep) => void;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
}

export const useRegisterForm = ({ onStepChange }: UseRegisterFormProps) => {
  const { register, verifyEmail, resendVerification } = useAuth();

  const [step, setStepState] = useState<RegisterStep>('form');
  const [name, setNameState] = useState('');
  const [email, setEmailState] = useState('');
  const [phone, setPhoneState] = useState('');
  const [password, setPasswordState] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regOtp, setRegOtpState] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<RegisterFormErrors>({});

  const setStep = useCallback(
    (newStep: RegisterStep) => {
      setStepState(newStep);
      onStepChange?.(newStep);
    },
    [onStepChange]
  );

  const setName = useCallback((value: string) => {
    setNameState(value);
    setFieldErrors((prev) => (prev.name ? { ...prev, name: undefined } : prev));
  }, []);

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    setFieldErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
  }, []);

  const setPhone = useCallback((value: string) => {
    setPhoneState(value);
    setFieldErrors((prev) => (prev.phone ? { ...prev, phone: undefined } : prev));
  }, []);

  const setPassword = useCallback((value: string) => {
    setPasswordState(value);
    setFieldErrors((prev) => (prev.password ? { ...prev, password: undefined } : prev));
  }, []);

  const setRegOtp = useCallback((value: string) => {
    const clean = sanitizeOtp(value);
    setRegOtpState(clean);
    setFieldErrors((prev) => (prev.otp ? { ...prev, otp: undefined } : prev));
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const validate = useCallback((): boolean => {
    const errors: RegisterFormErrors = {};

    if (step === 'form') {
      if (!name.trim()) {
        errors.name = AUTH_TEXT.errNameRequired;
      }

      if (!email.trim()) {
        errors.email = AUTH_TEXT.errEmailRequired;
      } else if (!isValidEmail(email)) {
        errors.email = AUTH_TEXT.errEmailInvalid;
      }

      if (phone.trim() && phone.trim().length < 5) {
        errors.phone = AUTH_TEXT.errPhoneInvalid;
      }

      if (!password) {
        errors.password = AUTH_TEXT.errPasswordRequired;
      } else if (password.length < 8) {
        errors.password = AUTH_TEXT.errPasswordShort;
      }
    } else if (step === 'verify_otp') {
      if (!regOtp.trim()) {
        errors.otp = AUTH_TEXT.errOtpRequired;
      } else if (!isValidOtp(regOtp)) {
        errors.otp = AUTH_TEXT.errOtpInvalid;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [step, name, email, phone, password, regOtp]);

  const handleResendRegistrationOtp = useCallback(async () => {
    setGeneralError(null);
    setSuccessNotice(null);
    setIsLoading(true);

    try {
      await resendVerification(email.trim());
      setSuccessNotice(AUTH_TEXT.resendVerificationSuccess);
    } catch (err: unknown) {
      const msg = isApiError(err) ? err.message : AUTH_TEXT.errUnexpected;
      setGeneralError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [resendVerification, email]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setGeneralError(null);
      setSuccessNotice(null);

      if (!validate()) {
        return;
      }

      setIsLoading(true);

      try {
        if (step === 'form') {
          await register({
            name: name.trim(),
            email: email.trim(),
            password,
            phone: phone.trim() || undefined,
          });
          setStep('verify_otp');
          setSuccessNotice(AUTH_TEXT.registrationSuccessDesc);
        } else if (step === 'verify_otp') {
          await verifyEmail({
            email: email.trim(),
            otp: regOtp.trim(),
          });
          setStep('completed');
          setSuccessNotice(AUTH_TEXT.accountVerifiedDesc);
        }
      } catch (err: unknown) {
        const message = isApiError(err) ? err.message : AUTH_TEXT.errUnexpected;
        setGeneralError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [validate, step, register, verifyEmail, name, email, password, phone, regOtp, setStep]
  );

  const resetToFormStep = useCallback(() => {
    setStep('form');
    setFieldErrors({});
    setGeneralError(null);
    setSuccessNotice(null);
  }, [setStep]);

  return {
    step,
    name,
    email,
    phone,
    password,
    showPassword,
    regOtp,
    isLoading,
    generalError,
    successNotice,
    fieldErrors,
    setName,
    setEmail,
    setPhone,
    setPassword,
    setRegOtp,
    toggleShowPassword,
    handleResendRegistrationOtp,
    handleSubmit,
    resetToFormStep,
  };
};
