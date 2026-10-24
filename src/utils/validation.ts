/**
 * Authentication & form input validation utility helpers
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_REGEX = /^\d{6}$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const isValidOtp = (otp: string): boolean => {
  return OTP_REGEX.test(otp.trim());
};

export const sanitizeOtp = (value: string): string => {
  return value.replace(/\D/g, '');
};
