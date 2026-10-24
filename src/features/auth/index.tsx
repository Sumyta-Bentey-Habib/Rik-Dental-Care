'use client';

import React, { useState } from 'react';
import {
  Stethoscope,
  ArrowLeft,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Award,
  Clock,
  UserCheck,
  KeyRound,
  RotateCcw,
} from 'lucide-react';
import { User } from '@/types';
import { BRAND_NAME, AUTH_TEXT } from '@/constants/constants';
import { useAuth } from '@/context';
import { isApiError } from '@/lib/api';
import {
  AuthPageContainer,
  BackButton,
  SideHeroPanel,
  HeroContent,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroTrustRow,
  TrustItem,
  HeroEmergencyCallout,
  FormPane,
  FormCard,
  BrandHeader,
  FormHeader,
  FormTitle,
  FormSubtitle,
  RoleSelectorContainer,
  RoleSelectorTab,
  StyledForm,
  FormGroup,
  LabelRow,
  Label,
  ForgotPasswordLink,
  InputWrapper,
  Input,
  PasswordToggleButton,
  FieldError,
  AlertBanner,
  SubmitButton,
  ToggleText,
  ToggleButtonLink,
  SuccessCard,
  SuccessIconBadge,
  SuccessTitle,
  SuccessDesc,
  SecondaryActionButton,
  OtpExpiryBadge,
} from './style';

export type AuthMode = 'login' | 'register' | 'recovery';
type RecoveryStep = 'request_otp' | 'enter_otp' | 'set_new_password' | 'completed';
type RegisterStep = 'form' | 'verify_otp' | 'completed';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToHome: () => void;
  onToggleMode: (mode?: AuthMode) => void;
  initialMode?: AuthMode;
}

export const Auth: React.FC<AuthProps> = ({
  onLoginSuccess,
  onNavigateToHome,
  onToggleMode,
  initialMode = 'login',
}) => {
  const {
    login,
    register,
    verifyEmail,
    resendVerification,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
  } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<'patient' | 'admin'>('patient');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Registration specific states
  const [registerStep, setRegisterStep] = useState<RegisterStep>('form');
  const [regOtp, setRegOtp] = useState('');

  // Recovery specific states
  const [recoveryStep, setRecoveryStep] = useState<RecoveryStep>('request_otp');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status & Validation states
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Sync mode if initialMode prop changes from router
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
    setFieldErrors({});
    setGeneralError(null);
    setSuccessNotice(null);
    setRegisterStep('form');
    setRegOtp('');
    setRecoveryStep('request_otp');
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setFieldErrors({});
    setGeneralError(null);
    setSuccessNotice(null);
    setRegisterStep('form');
    setRegOtp('');
    setRecoveryStep('request_otp');
    onToggleMode(newMode);
  };

  const validate = (): boolean => {
    const errors: typeof fieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'register') {
      if (registerStep === 'form') {
        if (!name.trim()) {
          errors.name = AUTH_TEXT.errNameRequired;
        }

        if (!email.trim()) {
          errors.email = AUTH_TEXT.errEmailRequired;
        } else if (!emailRegex.test(email.trim())) {
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
      } else if (registerStep === 'verify_otp') {
        if (!regOtp.trim()) {
          errors.otp = AUTH_TEXT.errOtpRequired;
        } else if (!/^\d{6}$/.test(regOtp.trim())) {
          errors.otp = AUTH_TEXT.errOtpInvalid;
        }
      }
    }

    if (mode === 'login') {
      if (!email.trim()) {
        errors.email = AUTH_TEXT.errEmailRequired;
      } else if (!emailRegex.test(email.trim())) {
        errors.email = AUTH_TEXT.errEmailInvalid;
      }

      if (!password) {
        errors.password = AUTH_TEXT.errPasswordRequired;
      } else if (password.length < 8) {
        errors.password = AUTH_TEXT.errPasswordShort;
      }
    }

    if (mode === 'recovery') {
      if (recoveryStep === 'request_otp') {
        if (!email.trim()) {
          errors.email = AUTH_TEXT.errEmailRequired;
        } else if (!emailRegex.test(email.trim())) {
          errors.email = AUTH_TEXT.errEmailInvalid;
        }
      }

      if (recoveryStep === 'enter_otp') {
        if (!otp.trim()) {
          errors.otp = AUTH_TEXT.errOtpRequired;
        } else if (!/^\d{6}$/.test(otp.trim())) {
          errors.otp = AUTH_TEXT.errOtpInvalid;
        }
      }

      if (recoveryStep === 'set_new_password') {
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
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResendRecoveryOtp = async () => {
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
  };

  const handleResendRegistrationOtp = async () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setSuccessNotice(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const loggedUser = await login({
          email: email.trim(),
          password,
        });

        const initials = loggedUser.name
          ? loggedUser.name
              .split(' ')
              .map((p) => p[0])
              .filter(Boolean)
              .join('')
              .slice(0, 2)
              .toUpperCase()
          : 'U';

        const clientUser: User = {
          id: loggedUser.id,
          name: loggedUser.name,
          email: loggedUser.email,
          phone: loggedUser.phone || '',
          avatar: initials,
          dob: '1995-01-01',
          memberSince: new Date(loggedUser.createdAt).getFullYear().toString(),
          insuranceProvider: 'Standard Dental Cover',
          policyNumber: `POL-${loggedUser.id.slice(-6).toUpperCase()}`,
          role: loggedUser.role === 'ADMIN' ? 'admin' : 'patient',
        };

        onLoginSuccess(clientUser);
      } else if (mode === 'register') {
        if (registerStep === 'form') {
          await register({
            name: name.trim(),
            email: email.trim(),
            password,
            phone: phone.trim() || undefined,
          });
          setRegisterStep('verify_otp');
          setSuccessNotice(AUTH_TEXT.registrationSuccessDesc);
        } else if (registerStep === 'verify_otp') {
          await verifyEmail({
            email: email.trim(),
            otp: regOtp.trim(),
          });
          setRegisterStep('completed');
          setSuccessNotice(AUTH_TEXT.accountVerifiedDesc);
        }
      } else if (mode === 'recovery') {
        if (recoveryStep === 'request_otp') {
          await forgotPassword(email.trim());
          setRecoveryStep('enter_otp');
        } else if (recoveryStep === 'enter_otp') {
          await verifyResetOtp(email.trim(), otp.trim());
          setRecoveryStep('set_new_password');
          setSuccessNotice(AUTH_TEXT.otpVerifiedNotice);
        } else if (recoveryStep === 'set_new_password') {
          await resetPassword({
            email: email.trim(),
            otp: otp.trim(),
            password: newPassword,
          });
          setRecoveryStep('completed');
        }
      }
    } catch (err: unknown) {
      const message = isApiError(err) ? err.message : AUTH_TEXT.errUnexpected;
      setGeneralError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageContainer>
      <BackButton onClick={onNavigateToHome} type="button" aria-label={AUTH_TEXT.backBtn}>
        <ArrowLeft size={16} />
        <span>{AUTH_TEXT.backBtn}</span>
      </BackButton>

      {/* Left Healthcare Brand Showcase Panel */}
      <SideHeroPanel>
        <BrandHeader>
          <Stethoscope size={28} />
          <h3>
            {BRAND_NAME.first}
            <span>{BRAND_NAME.second}</span>
          </h3>
        </BrandHeader>

        <HeroContent>
          <HeroBadge>{AUTH_TEXT.sideEyebrow}</HeroBadge>
          <HeroTitle>{AUTH_TEXT.sideHeading}</HeroTitle>
          <HeroSubtitle>{AUTH_TEXT.sideDescription}</HeroSubtitle>

          <HeroTrustRow>
            <TrustItem>
              <ShieldCheck size={18} />
              <span>{AUTH_TEXT.badgeHipaa}</span>
            </TrustItem>
            <TrustItem>
              <Lock size={18} />
              <span>{AUTH_TEXT.badgeEncryption}</span>
            </TrustItem>
            <TrustItem>
              <Award size={18} />
              <span>{AUTH_TEXT.badgeSpecialists}</span>
            </TrustItem>
          </HeroTrustRow>
        </HeroContent>

        <HeroEmergencyCallout>
          <Clock size={18} />
          <span>{AUTH_TEXT.emergencyCallout}</span>
        </HeroEmergencyCallout>
      </SideHeroPanel>

      {/* Right Form Card Pane */}
      <FormPane>
        <FormCard>
          <BrandHeader>
            <Stethoscope size={24} />
            <h3>
              {BRAND_NAME.first}
              <span>{BRAND_NAME.second}</span>
            </h3>
          </BrandHeader>

          {/* Role selector tab (Patient vs Clinic Staff) for login/register */}
          {mode !== 'recovery' && registerStep === 'form' && (
            <RoleSelectorContainer role="tablist" aria-label={AUTH_TEXT.sideEyebrow}>
              <RoleSelectorTab
                type="button"
                role="tab"
                aria-selected={role === 'patient'}
                $active={role === 'patient'}
                onClick={() => setRole('patient')}
              >
                <UserCheck size={15} />
                <span>{AUTH_TEXT.rolePatient}</span>
              </RoleSelectorTab>
              <RoleSelectorTab
                type="button"
                role="tab"
                aria-selected={role === 'admin'}
                $active={role === 'admin'}
                onClick={() => setRole('admin')}
              >
                <ShieldCheck size={15} />
                <span>{AUTH_TEXT.roleAdmin}</span>
              </RoleSelectorTab>
            </RoleSelectorContainer>
          )}

          {/* Staff guidance callout if admin tab active in registration */}
          {role === 'admin' && mode === 'register' && registerStep === 'form' && (
            <AlertBanner $variant="info" role="status">
              <ShieldCheck size={18} />
              <span>{AUTH_TEXT.adminStaffNotice}</span>
            </AlertBanner>
          )}

          <FormHeader>
            <FormTitle>
              {mode === 'login' && AUTH_TEXT.welcomeBack}
              {mode === 'register' &&
                (registerStep === 'verify_otp'
                  ? AUTH_TEXT.verifyAccountTitle
                  : registerStep === 'completed'
                  ? AUTH_TEXT.accountVerifiedTitle
                  : AUTH_TEXT.createAccount)}
              {mode === 'recovery' &&
                (recoveryStep === 'enter_otp'
                  ? AUTH_TEXT.recoveryOtpStepTitle
                  : recoveryStep === 'set_new_password'
                  ? AUTH_TEXT.setNewPasswordTitle
                  : recoveryStep === 'completed'
                  ? AUTH_TEXT.resetSuccessTitle
                  : AUTH_TEXT.recoveryTitle)}
            </FormTitle>
            <FormSubtitle>
              {mode === 'login' && AUTH_TEXT.loginSubtitle}
              {mode === 'register' &&
                (registerStep === 'verify_otp'
                  ? AUTH_TEXT.verifyAccountSubtitle
                  : registerStep === 'completed'
                  ? AUTH_TEXT.accountVerifiedDesc
                  : AUTH_TEXT.registerSubtitle)}
              {mode === 'recovery' &&
                (recoveryStep === 'enter_otp'
                  ? AUTH_TEXT.recoveryOtpStepSubtitle
                  : recoveryStep === 'set_new_password'
                  ? AUTH_TEXT.setNewPasswordSubtitle
                  : recoveryStep === 'completed'
                  ? AUTH_TEXT.resetSuccessDesc
                  : AUTH_TEXT.recoverySubtitle)}
            </FormSubtitle>
          </FormHeader>

          {generalError && (
            <AlertBanner $variant="error" role="alert">
              <AlertCircle size={18} />
              <span>{generalError}</span>
            </AlertBanner>
          )}

          {successNotice && (
            <AlertBanner $variant="success" role="status">
              <CheckCircle2 size={18} />
              <span>{successNotice}</span>
            </AlertBanner>
          )}

          {/* Registration Completed Success Card */}
          {mode === 'register' && registerStep === 'completed' ? (
            <SuccessCard>
              <SuccessIconBadge>
                <CheckCircle2 size={28} />
              </SuccessIconBadge>
              <SuccessTitle>{AUTH_TEXT.accountVerifiedTitle}</SuccessTitle>
              <SuccessDesc>{AUTH_TEXT.accountVerifiedDesc}</SuccessDesc>
              <SubmitButton
                type="button"
                onClick={() => switchMode('login')}
                style={{ marginTop: '16px' }}
              >
                {AUTH_TEXT.signInBtn}
              </SubmitButton>
            </SuccessCard>
          ) : mode === 'recovery' && recoveryStep === 'completed' ? (
            /* Password Recovery Completed Success Card */
            <SuccessCard>
              <SuccessIconBadge>
                <CheckCircle2 size={28} />
              </SuccessIconBadge>
              <SuccessTitle>{AUTH_TEXT.resetSuccessTitle}</SuccessTitle>
              <SuccessDesc>{AUTH_TEXT.resetSuccessDesc}</SuccessDesc>
              <SubmitButton
                type="button"
                onClick={() => switchMode('login')}
                style={{ marginTop: '16px' }}
              >
                {AUTH_TEXT.recoveryBackToLogin}
              </SubmitButton>
            </SuccessCard>
          ) : (
            <StyledForm onSubmit={handleSubmit} noValidate>
              {/* Registration Form Step 1 */}
              {mode === 'register' && registerStep === 'form' && (
                <>
                  <FormGroup>
                    <Label htmlFor="auth-name">{AUTH_TEXT.fullNameLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.name}>
                      <UserIcon size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-name"
                        type="text"
                        placeholder={AUTH_TEXT.fullNamePlaceholder}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        $hasError={!!fieldErrors.name}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                        disabled={isLoading}
                        required
                      />
                    </InputWrapper>
                    {fieldErrors.name && (
                      <FieldError id="err-name" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.name}</span>
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="auth-email">{AUTH_TEXT.emailLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.email}>
                      <Mail size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-email"
                        type="email"
                        autoComplete="email"
                        placeholder={AUTH_TEXT.emailPlaceholder}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        $hasError={!!fieldErrors.email}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                        disabled={isLoading}
                        required
                      />
                    </InputWrapper>
                    {fieldErrors.email && (
                      <FieldError id="err-email" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.email}</span>
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="auth-phone">{AUTH_TEXT.phoneLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.phone}>
                      <Phone size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder={AUTH_TEXT.phonePlaceholder}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        $hasError={!!fieldErrors.phone}
                        aria-invalid={!!fieldErrors.phone}
                        aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                        disabled={isLoading}
                      />
                    </InputWrapper>
                    {fieldErrors.phone && (
                      <FieldError id="err-phone" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.phone}</span>
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="auth-password">{AUTH_TEXT.passwordLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.password}>
                      <Lock size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        placeholder={AUTH_TEXT.passwordPlaceholder}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) {
                            setFieldErrors((prev) => ({ ...prev, password: undefined }));
                          }
                        }}
                        $hasError={!!fieldErrors.password}
                        $hasSuffix
                        aria-invalid={!!fieldErrors.password}
                        aria-describedby={fieldErrors.password ? 'err-password' : undefined}
                        disabled={isLoading}
                        required
                      />
                      <PasswordToggleButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? AUTH_TEXT.hidePassword : AUTH_TEXT.showPassword}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </PasswordToggleButton>
                    </InputWrapper>
                    {fieldErrors.password && (
                      <FieldError id="err-password" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.password}</span>
                      </FieldError>
                    )}
                  </FormGroup>
                </>
              )}

              {/* Registration Form Step 2: Verify Registration OTP */}
              {mode === 'register' && registerStep === 'verify_otp' && (
                <>
                  <OtpExpiryBadge>
                    <Clock size={13} />
                    <span>{AUTH_TEXT.otpBadge}</span>
                  </OtpExpiryBadge>

                  <FormGroup>
                    <Label htmlFor="auth-reg-otp">{AUTH_TEXT.otpLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.otp}>
                      <KeyRound size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-reg-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder={AUTH_TEXT.otpPlaceholder}
                        value={regOtp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setRegOtp(val);
                          if (fieldErrors.otp) setFieldErrors((prev) => ({ ...prev, otp: undefined }));
                        }}
                        $hasError={!!fieldErrors.otp}
                        aria-invalid={!!fieldErrors.otp}
                        aria-describedby={fieldErrors.otp ? 'err-reg-otp' : undefined}
                        disabled={isLoading}
                        required
                      />
                    </InputWrapper>
                    {fieldErrors.otp && (
                      <FieldError id="err-reg-otp" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.otp}</span>
                      </FieldError>
                    )}
                  </FormGroup>
                </>
              )}

              {/* Login Form Fields */}
              {mode === 'login' && (
                <>
                  <FormGroup>
                    <Label htmlFor="auth-email">{AUTH_TEXT.emailLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.email}>
                      <Mail size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-email"
                        type="email"
                        autoComplete="email"
                        placeholder={AUTH_TEXT.emailPlaceholder}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        $hasError={!!fieldErrors.email}
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                        disabled={isLoading}
                        required
                      />
                    </InputWrapper>
                    {fieldErrors.email && (
                      <FieldError id="err-email" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.email}</span>
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <LabelRow>
                      <Label htmlFor="auth-password">{AUTH_TEXT.passwordLabel}</Label>
                      <ForgotPasswordLink
                        type="button"
                        onClick={() => switchMode('recovery')}
                      >
                        {AUTH_TEXT.forgotPassword}
                      </ForgotPasswordLink>
                    </LabelRow>

                    <InputWrapper $hasError={!!fieldErrors.password}>
                      <Lock size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        placeholder={AUTH_TEXT.passwordPlaceholder}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) {
                            setFieldErrors((prev) => ({ ...prev, password: undefined }));
                          }
                        }}
                        $hasError={!!fieldErrors.password}
                        $hasSuffix
                        aria-invalid={!!fieldErrors.password}
                        aria-describedby={fieldErrors.password ? 'err-password' : undefined}
                        disabled={isLoading}
                        required
                      />
                      <PasswordToggleButton
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? AUTH_TEXT.hidePassword : AUTH_TEXT.showPassword}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </PasswordToggleButton>
                    </InputWrapper>

                    {fieldErrors.password && (
                      <FieldError id="err-password" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.password}</span>
                      </FieldError>
                    )}
                  </FormGroup>
                </>
              )}

              {/* Recovery Step 1: Email */}
              {mode === 'recovery' && recoveryStep === 'request_otp' && (
                <FormGroup>
                  <Label htmlFor="auth-email">{AUTH_TEXT.emailLabel}</Label>
                  <InputWrapper $hasError={!!fieldErrors.email}>
                    <Mail size={18} className="input-icon-prefix" />
                    <Input
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      placeholder={AUTH_TEXT.emailPlaceholder}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      $hasError={!!fieldErrors.email}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                      disabled={isLoading}
                      required
                    />
                  </InputWrapper>
                  {fieldErrors.email && (
                    <FieldError id="err-email" role="alert">
                      <AlertCircle size={13} />
                      <span>{fieldErrors.email}</span>
                    </FieldError>
                  )}
                </FormGroup>
              )}

              {/* Recovery Step 2: Enter & Verify OTP */}
              {mode === 'recovery' && recoveryStep === 'enter_otp' && (
                <>
                  <OtpExpiryBadge>
                    <Clock size={13} />
                    <span>{AUTH_TEXT.otpBadge}</span>
                  </OtpExpiryBadge>

                  <FormGroup>
                    <Label htmlFor="auth-otp">{AUTH_TEXT.otpLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.otp}>
                      <KeyRound size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder={AUTH_TEXT.otpPlaceholder}
                        value={otp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setOtp(val);
                          if (fieldErrors.otp) setFieldErrors((prev) => ({ ...prev, otp: undefined }));
                        }}
                        $hasError={!!fieldErrors.otp}
                        aria-invalid={!!fieldErrors.otp}
                        aria-describedby={fieldErrors.otp ? 'err-otp' : undefined}
                        disabled={isLoading}
                        required
                      />
                    </InputWrapper>
                    {fieldErrors.otp && (
                      <FieldError id="err-otp" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.otp}</span>
                      </FieldError>
                    )}
                  </FormGroup>
                </>
              )}

              {/* Recovery Step 3: Set New Password */}
              {mode === 'recovery' && recoveryStep === 'set_new_password' && (
                <>
                  <FormGroup>
                    <Label htmlFor="auth-new-password">{AUTH_TEXT.newPasswordLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.newPassword}>
                      <Lock size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder={AUTH_TEXT.newPasswordPlaceholder}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (fieldErrors.newPassword) {
                            setFieldErrors((prev) => ({ ...prev, newPassword: undefined }));
                          }
                        }}
                        $hasError={!!fieldErrors.newPassword}
                        $hasSuffix
                        aria-invalid={!!fieldErrors.newPassword}
                        aria-describedby={fieldErrors.newPassword ? 'err-new-password' : undefined}
                        disabled={isLoading}
                        required
                      />
                      <PasswordToggleButton
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        aria-label={showNewPassword ? AUTH_TEXT.hidePassword : AUTH_TEXT.showPassword}
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </PasswordToggleButton>
                    </InputWrapper>
                    {fieldErrors.newPassword && (
                      <FieldError id="err-new-password" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.newPassword}</span>
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="auth-confirm-password">{AUTH_TEXT.confirmPasswordLabel}</Label>
                    <InputWrapper $hasError={!!fieldErrors.confirmPassword}>
                      <Lock size={18} className="input-icon-prefix" />
                      <Input
                        id="auth-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={AUTH_TEXT.confirmPasswordPlaceholder}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (fieldErrors.confirmPassword) {
                            setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                          }
                        }}
                        $hasError={!!fieldErrors.confirmPassword}
                        $hasSuffix
                        aria-invalid={!!fieldErrors.confirmPassword}
                        aria-describedby={fieldErrors.confirmPassword ? 'err-confirm-password' : undefined}
                        disabled={isLoading}
                        required
                      />
                      <PasswordToggleButton
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? AUTH_TEXT.hidePassword : AUTH_TEXT.showPassword}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </PasswordToggleButton>
                    </InputWrapper>
                    {fieldErrors.confirmPassword && (
                      <FieldError id="err-confirm-password" role="alert">
                        <AlertCircle size={13} />
                        <span>{fieldErrors.confirmPassword}</span>
                      </FieldError>
                    )}
                  </FormGroup>
                </>
              )}

              {/* Primary Submit Button */}
              <SubmitButton
                type="submit"
                disabled={isLoading}
                $isLoading={isLoading}
              >
                {isLoading && <Loader2 size={18} className="spinner-icon" />}
                <span>
                  {isLoading
                    ? mode === 'login'
                      ? AUTH_TEXT.loadingSignIn
                      : mode === 'register'
                      ? registerStep === 'verify_otp'
                        ? AUTH_TEXT.loadingVerifyAccount
                        : AUTH_TEXT.loadingSignUp
                      : recoveryStep === 'enter_otp'
                      ? AUTH_TEXT.loadingVerifyOtp
                      : recoveryStep === 'set_new_password'
                      ? AUTH_TEXT.loadingReset
                      : AUTH_TEXT.loadingRecovery
                    : mode === 'login'
                    ? AUTH_TEXT.signInBtn
                    : mode === 'register'
                    ? registerStep === 'verify_otp'
                      ? AUTH_TEXT.verifyAccountBtn
                      : AUTH_TEXT.signUpBtn
                    : recoveryStep === 'enter_otp'
                    ? AUTH_TEXT.verifyOtpBtn
                    : recoveryStep === 'set_new_password'
                    ? AUTH_TEXT.confirmResetBtn
                    : AUTH_TEXT.recoveryBtn}
                </span>
              </SubmitButton>

              {/* Resend Code Button in Registration Step 2 */}
              {mode === 'register' && registerStep === 'verify_otp' && (
                <SecondaryActionButton
                  type="button"
                  onClick={handleResendRegistrationOtp}
                  disabled={isLoading}
                >
                  <RotateCcw size={14} />
                  <span>{AUTH_TEXT.resendVerificationBtn}</span>
                </SecondaryActionButton>
              )}

              {/* Resend Code Button in Recovery Step 2 */}
              {mode === 'recovery' && recoveryStep === 'enter_otp' && (
                <SecondaryActionButton
                  type="button"
                  onClick={handleResendRecoveryOtp}
                  disabled={isLoading}
                >
                  <RotateCcw size={14} />
                  <span>{AUTH_TEXT.resendCodeBtn}</span>
                </SecondaryActionButton>
              )}
            </StyledForm>
          )}

          {/* Footer Navigation Switcher */}
          {mode === 'login' && (
            <ToggleText>
              {AUTH_TEXT.noAccount}
              <ToggleButtonLink
                type="button"
                onClick={() => switchMode('register')}
              >
                {AUTH_TEXT.signUpBtn}
              </ToggleButtonLink>
            </ToggleText>
          )}

          {mode === 'register' && registerStep === 'form' && (
            <ToggleText>
              {AUTH_TEXT.hasAccount}
              <ToggleButtonLink
                type="button"
                onClick={() => switchMode('login')}
              >
                {AUTH_TEXT.signInBtn}
              </ToggleButtonLink>
            </ToggleText>
          )}

          {mode === 'register' && registerStep === 'verify_otp' && (
            <ToggleText>
              <ToggleButtonLink
                type="button"
                onClick={() => setRegisterStep('form')}
              >
                {AUTH_TEXT.backBtn}
              </ToggleButtonLink>
            </ToggleText>
          )}

          {mode === 'recovery' && recoveryStep !== 'completed' && (
            <ToggleText>
              <ToggleButtonLink
                type="button"
                onClick={() => switchMode('login')}
              >
                {AUTH_TEXT.recoveryBackToLogin}
              </ToggleButtonLink>
            </ToggleText>
          )}
        </FormCard>
      </FormPane>
    </AuthPageContainer>
  );
};

export default Auth;
