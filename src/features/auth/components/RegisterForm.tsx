import React from 'react';
import {
  User as UserIcon,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { AUTH_TEXT } from '@/constants/constants';
import { RegisterFormProps } from '@/types';
import { useRegisterForm } from '@/hooks';
import {
  FormHeader,
  FormTitle,
  FormSubtitle,
  StyledForm,
  FormGroup,
  Label,
  InputWrapper,
  Input,
  PasswordToggleButton,
  FieldError,
  AlertBanner,
  SubmitButton,
  SecondaryActionButton,
  SuccessCard,
  SuccessIconBadge,
  SuccessTitle,
  SuccessDesc,
  SuccessActionButton,
  OtpExpiryBadge,
  ToggleText,
  ToggleButtonLink,
} from '../style';

export const RegisterForm: React.FC<RegisterFormProps> = ({
  role = 'patient',
  onSwitchToLogin,
  onStepChange,
}) => {
  const {
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
  } = useRegisterForm({ role, onStepChange });

  return (
    <>
      <FormHeader>
        <FormTitle>
          {step === 'verify_otp'
            ? AUTH_TEXT.verifyAccountTitle
            : step === 'completed'
            ? AUTH_TEXT.accountVerifiedTitle
            : AUTH_TEXT.createAccount}
        </FormTitle>
        <FormSubtitle>
          {step === 'verify_otp'
            ? AUTH_TEXT.verifyAccountSubtitle
            : step === 'completed'
            ? AUTH_TEXT.accountVerifiedDesc
            : AUTH_TEXT.registerSubtitle}
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

      {step === 'completed' ? (
        <SuccessCard>
          <SuccessIconBadge>
            <CheckCircle2 size={28} />
          </SuccessIconBadge>
          <SuccessTitle>{AUTH_TEXT.accountVerifiedTitle}</SuccessTitle>
          <SuccessDesc>{AUTH_TEXT.accountVerifiedDesc}</SuccessDesc>
          <SuccessActionButton
            type="button"
            onClick={onSwitchToLogin}
          >
            {AUTH_TEXT.signInBtn}
          </SuccessActionButton>
        </SuccessCard>
      ) : (
        <StyledForm onSubmit={handleSubmit} noValidate>
          {step === 'form' && (
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
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                    $hasError={!!fieldErrors.password}
                    $hasSuffix
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? 'err-password' : undefined}
                    disabled={isLoading}
                    required
                  />
                  <PasswordToggleButton
                    type="button"
                    onClick={toggleShowPassword}
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

          {step === 'verify_otp' && (
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
                    onChange={(e) => setRegOtp(e.target.value)}
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

          <SubmitButton
            type="submit"
            disabled={isLoading}
            $isLoading={isLoading}
          >
            {isLoading && <Loader2 size={18} className="spinner-icon" />}
            <span>
              {isLoading
                ? step === 'verify_otp'
                  ? AUTH_TEXT.loadingVerifyAccount
                  : AUTH_TEXT.loadingSignUp
                : step === 'verify_otp'
                ? AUTH_TEXT.verifyAccountBtn
                : AUTH_TEXT.signUpBtn}
            </span>
          </SubmitButton>

          {step === 'verify_otp' && (
            <SecondaryActionButton
              type="button"
              onClick={handleResendRegistrationOtp}
              disabled={isLoading}
            >
              <RotateCcw size={14} />
              <span>{AUTH_TEXT.resendVerificationBtn}</span>
            </SecondaryActionButton>
          )}
        </StyledForm>
      )}

      {step === 'form' && (
        <ToggleText>
          {AUTH_TEXT.hasAccount}
          <ToggleButtonLink
            type="button"
            onClick={onSwitchToLogin}
          >
            {AUTH_TEXT.signInBtn}
          </ToggleButtonLink>
        </ToggleText>
      )}

      {step === 'verify_otp' && (
        <ToggleText>
          <ToggleButtonLink
            type="button"
            onClick={resetToFormStep}
          >
            {AUTH_TEXT.backBtn}
          </ToggleButtonLink>
        </ToggleText>
      )}
    </>
  );
};
