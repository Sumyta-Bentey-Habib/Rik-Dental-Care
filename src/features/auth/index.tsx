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
  UserCheck
} from 'lucide-react';
import { User } from '@/types';
import { mockUser, mockAdmin } from '@/data/dummy-data';
import { BRAND_NAME, AUTH_TEXT } from '@/constants/constants';
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
  SuccessDesc
} from './style';

export type AuthMode = 'login' | 'register' | 'recovery';

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
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<'patient' | 'admin'>('patient');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation states
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
  }>({});
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  // Sync mode if initialMode prop changes from router
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
    setFieldErrors({});
    setGeneralError(null);
    setRecoverySuccess(false);
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setFieldErrors({});
    setGeneralError(null);
    setRecoverySuccess(false);
    onToggleMode(newMode);
  };

  const validate = (): boolean => {
    const errors: typeof fieldErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === 'register') {
      if (!name.trim()) {
        errors.name = AUTH_TEXT.errNameRequired;
      }
    }

    if (!email.trim()) {
      errors.email = AUTH_TEXT.errEmailRequired;
    } else if (!emailRegex.test(email.trim())) {
      errors.email = AUTH_TEXT.errEmailInvalid;
    }

    if (mode === 'register' && phone.trim()) {
      if (phone.trim().length < 7) {
        errors.phone = AUTH_TEXT.errPhoneInvalid;
      }
    }

    if (mode === 'login' || mode === 'register') {
      if (!password) {
        errors.password = AUTH_TEXT.errPasswordRequired;
      } else if (password.length < 8) {
        errors.password = AUTH_TEXT.errPasswordShort;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate real asynchronous network verification
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (mode === 'login') {
        if (role === 'admin' || email.trim().toLowerCase() === 'admin@rikdental.com') {
          onLoginSuccess(mockAdmin);
        } else {
          onLoginSuccess(mockUser);
        }
      } else if (mode === 'register') {
        const registeredUser: User = {
          id: `pat_${Date.now()}`,
          name: name.trim() || 'Guest User',
          email: email.trim().toLowerCase() || 'guest@dentalcare.com',
          phone: phone.trim() || '+1 (555) 000-0000',
          avatar: (name ? name.split(' ').map((n) => n[0]).join('') : 'GU').toUpperCase(),
          dob: '1995-01-01',
          memberSince: '2026',
          insuranceProvider: 'Standard Dental Cover',
          policyNumber: 'POL-GUEST-99',
          role: role
        };
        onLoginSuccess(registeredUser);
      } else if (mode === 'recovery') {
        setRecoverySuccess(true);
      }
    } catch {
      setGeneralError(AUTH_TEXT.errUnexpected);
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

          {/* Role selector tab (Patient vs Clinic Admin) for login/register */}
          {mode !== 'recovery' && (
            <RoleSelectorContainer role="tablist" aria-label="Portal access selection">
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

          <FormHeader>
            <FormTitle>
              {mode === 'login' && AUTH_TEXT.welcomeBack}
              {mode === 'register' && AUTH_TEXT.createAccount}
              {mode === 'recovery' && AUTH_TEXT.recoveryTitle}
            </FormTitle>
            <FormSubtitle>
              {mode === 'login' && AUTH_TEXT.loginSubtitle}
              {mode === 'register' && AUTH_TEXT.registerSubtitle}
              {mode === 'recovery' && AUTH_TEXT.recoverySubtitle}
            </FormSubtitle>
          </FormHeader>

          {generalError && (
            <AlertBanner $variant="error" role="alert">
              <AlertCircle size={18} />
              <span>{generalError}</span>
            </AlertBanner>
          )}

          {/* Password Recovery Success Card */}
          {mode === 'recovery' && recoverySuccess ? (
            <SuccessCard>
              <SuccessIconBadge>
                <CheckCircle2 size={28} />
              </SuccessIconBadge>
              <SuccessTitle>{AUTH_TEXT.recoverySuccessTitle}</SuccessTitle>
              <SuccessDesc>{AUTH_TEXT.recoverySuccessDesc}</SuccessDesc>

              <SubmitButton
                type="button"
                onClick={() => switchMode('login')}
                style={{ marginTop: '16px' }}
              >
                {AUTH_TEXT.recoveryBackToLogin}
              </SubmitButton>

              <ToggleButtonLink
                type="button"
                onClick={() => setRecoverySuccess(false)}
                style={{ marginTop: '8px' }}
              >
                {AUTH_TEXT.recoveryResend}
              </ToggleButtonLink>
            </SuccessCard>
          ) : (
            <StyledForm onSubmit={handleSubmit} noValidate>
              {/* Full Name (Registration only) */}
              {mode === 'register' && (
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
              )}

              {/* Email Address (All modes) */}
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

              {/* Phone Number (Optional, Registration only) */}
              {mode === 'register' && (
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
              )}

              {/* Password (Login & Register) */}
              {mode !== 'recovery' && (
                <FormGroup>
                  <LabelRow>
                    <Label htmlFor="auth-password">{AUTH_TEXT.passwordLabel}</Label>
                    {mode === 'login' && (
                      <ForgotPasswordLink
                        type="button"
                        onClick={() => switchMode('recovery')}
                      >
                        {AUTH_TEXT.forgotPassword}
                      </ForgotPasswordLink>
                    )}
                  </LabelRow>

                  <InputWrapper $hasError={!!fieldErrors.password}>
                    <Lock size={18} className="input-icon-prefix" />
                    <Input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
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
              )}

              {/* Submit Button */}
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
                      ? AUTH_TEXT.loadingSignUp
                      : AUTH_TEXT.loadingRecovery
                    : mode === 'login'
                    ? AUTH_TEXT.signInBtn
                    : mode === 'register'
                    ? AUTH_TEXT.signUpBtn
                    : AUTH_TEXT.recoveryBtn}
                </span>
              </SubmitButton>
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

          {mode === 'register' && (
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

          {mode === 'recovery' && !recoverySuccess && (
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
