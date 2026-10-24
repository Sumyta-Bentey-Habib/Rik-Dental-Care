import { useState, useCallback } from 'react';
import { useAuth } from '@/context';
import { isApiError } from '@/lib/api';
import { AUTH_TEXT } from '@/constants/constants';
import { RecoveryStep } from '@/types';
import { isValidEmail, isValidOtp, sanitizeOtp } from '@/utils';

interface RecoveryFormErrors {
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useRecoveryForm = () => {
  const { forgotPassword, verifyResetOtp, resetPassword } = useAuth();

  const [step, setStep] = useState<RecoveryStep>('request_otp');
  const [email, setEmailState] = useState('');
  const [otp, setOtpState] = useState('');
  const [newPassword, setNewPasswordState] = useState('');
  const [confirmPassword, setConfirmPasswordState] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<RecoveryFormErrors>({});

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    setFieldErrors((prev) => (prev.email ? { ...prev, email: undefined } : prev));
  }, []);

  const setOtp = useCallback((value: string) => {
    const clean = sanitizeOtp(value);
    setOtpState(clean);
    setFieldErrors((prev) => (prev.otp ? { ...prev, otp: undefined } : prev));
  }, []);

  const setNewPassword = useCallback((value: string) => {
    setNewPasswordState(value);
    setFieldErrors((prev) => (prev.newPassword ? { ...prev, newPassword: undefined } : prev));
  }, []);

  const setConfirmPassword = useCallback((value: string) => {
    setConfirmPasswordState(value);
    setFieldErrors((prev) => (prev.confirmPassword ? { ...prev, confirmPassword: undefined } : prev));
  }, []);

  const toggleShowNewPassword = useCallback(() => {
    setShowNewPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const validate = useCallback((): boolean => {
    const errors: RecoveryFormErrors = {};

    if (step === 'request_otp') {
      if (!email.trim()) {
        errors.email = AUTH_TEXT.errEmailRequired;
      } else if (!isValidEmail(email)) {
        errors.email = AUTH_TEXT.errEmailInvalid;
      }
    } else if (step === 'enter_otp') {
      if (!otp.trim()) {
        errors.otp = AUTH_TEXT.errOtpRequired;
      } else if (!isValidOtp(otp)) {
        errors.otp = AUTH_TEXT.errOtpInvalid;
      }
    } else if (step === 'set_new_password') {
      if (!newPassword) {
        errors.newPassword = AUTH_TEXT.errPasswordRequired;
      } else if (newPassword.length < 8) {
        errors.newPassword = AUTH_TEXT.errPasswordShort;
      }

      if (!confirmPassword) {
        errors.confirmPassword = AUTH_TEXT.errPasswordRequired;
      } else if (confirmPassword !== newPassword) {
        errors.confirmPassword = AUTH_TEXT.errPasswordMismatch;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [step, email, otp, newPassword, confirmPassword]);

  const handleResendRecoveryOtp = useCallback(async () => {
    setGeneralError(null);
    setSuccessNotice(null);
    setIsLoading(true);

    try {
      await forgotPassword(email.trim());
      setSuccessNotice(AUTH_TEXT.recoverySuccessDesc);
    } catch (err: unknown) {
      const msg = isApiError(err) ? err.message : AUTH_TEXT.errUnexpected;
      setGeneralError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [forgotPassword, email]);

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
        if (step === 'request_otp') {
          await forgotPassword(email.trim());
          setStep('enter_otp');
        } else if (step === 'enter_otp') {
          await verifyResetOtp(email.trim(), otp.trim());
          setStep('set_new_password');
          setSuccessNotice(AUTH_TEXT.otpVerifiedNotice);
        } else if (step === 'set_new_password') {
          await resetPassword({
            email: email.trim(),
            otp: otp.trim(),
            password: newPassword,
          });
          setStep('completed');
        }
      } catch (err: unknown) {
        const message = isApiError(err) ? err.message : AUTH_TEXT.errUnexpected;
        setGeneralError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [validate, step, forgotPassword, verifyResetOtp, resetPassword, email, otp, newPassword]
  );

  return {
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    showNewPassword,
    showConfirmPassword,
    isLoading,
    generalError,
    successNotice,
    fieldErrors,
    setEmail,
    setOtp,
    setNewPassword,
    setConfirmPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    handleResendRecoveryOtp,
    handleSubmit,
  };
};
