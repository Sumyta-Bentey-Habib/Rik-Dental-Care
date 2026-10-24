import React from 'react';
import {
  Mail,
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
import { RecoveryFormProps } from '@/types';
import { useRecoveryForm } from '@/hooks';
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

export const RecoveryForm: React.FC<RecoveryFormProps> = ({ onSwitchToLogin }) => {
  const {
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
  } = useRecoveryForm();

  return (
    <>
      <FormHeader>
        <FormTitle>
          {step === 'enter_otp'
            ? AUTH_TEXT.recoveryOtpStepTitle
            : step === 'set_new_password'
            ? AUTH_TEXT.setNewPasswordTitle
            : step === 'completed'
            ? AUTH_TEXT.resetSuccessTitle
            : AUTH_TEXT.recoveryTitle}
        </FormTitle>
        <FormSubtitle>
          {step === 'enter_otp'
            ? AUTH_TEXT.recoveryOtpStepSubtitle
            : step === 'set_new_password'
            ? AUTH_TEXT.setNewPasswordSubtitle
            : step === 'completed'
            ? AUTH_TEXT.resetSuccessDesc
            : AUTH_TEXT.recoverySubtitle}
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
          <SuccessTitle>{AUTH_TEXT.resetSuccessTitle}</SuccessTitle>
          <SuccessDesc>{AUTH_TEXT.resetSuccessDesc}</SuccessDesc>
          <SuccessActionButton
            type="button"
            onClick={onSwitchToLogin}
          >
            {AUTH_TEXT.recoveryBackToLogin}
          </SuccessActionButton>
        </SuccessCard>
      ) : (
        <StyledForm onSubmit={handleSubmit} noValidate>
          {step === 'request_otp' && (
            <FormGroup>
              <Label htmlFor="auth-recovery-email">{AUTH_TEXT.emailLabel}</Label>
              <InputWrapper $hasError={!!fieldErrors.email}>
                <Mail size={18} className="input-icon-prefix" />
                <Input
                  id="auth-recovery-email"
                  type="email"
                  autoComplete="email"
                  placeholder={AUTH_TEXT.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  $hasError={!!fieldErrors.email}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? 'err-recovery-email' : undefined}
                  disabled={isLoading}
                  required
                />
              </InputWrapper>
              {fieldErrors.email && (
                <FieldError id="err-recovery-email" role="alert">
                  <AlertCircle size={13} />
                  <span>{fieldErrors.email}</span>
                </FieldError>
              )}
            </FormGroup>
          )}

          {step === 'enter_otp' && (
            <>
              <OtpExpiryBadge>
                <Clock size={13} />
                <span>{AUTH_TEXT.otpBadge}</span>
              </OtpExpiryBadge>

              <FormGroup>
                <Label htmlFor="auth-recovery-otp">{AUTH_TEXT.otpLabel}</Label>
                <InputWrapper $hasError={!!fieldErrors.otp}>
                  <KeyRound size={18} className="input-icon-prefix" />
                  <Input
                    id="auth-recovery-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder={AUTH_TEXT.otpPlaceholder}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    $hasError={!!fieldErrors.otp}
                    aria-invalid={!!fieldErrors.otp}
                    aria-describedby={fieldErrors.otp ? 'err-recovery-otp' : undefined}
                    disabled={isLoading}
                    required
                  />
                </InputWrapper>
                {fieldErrors.otp && (
                  <FieldError id="err-recovery-otp" role="alert">
                    <AlertCircle size={13} />
                    <span>{fieldErrors.otp}</span>
                  </FieldError>
                )}
              </FormGroup>
            </>
          )}

          {step === 'set_new_password' && (
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
                    onChange={(e) => setNewPassword(e.target.value)}
                    $hasError={!!fieldErrors.newPassword}
                    $hasSuffix
                    aria-invalid={!!fieldErrors.newPassword}
                    aria-describedby={fieldErrors.newPassword ? 'err-new-password' : undefined}
                    disabled={isLoading}
                    required
                  />
                  <PasswordToggleButton
                    type="button"
                    onClick={toggleShowNewPassword}
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    $hasError={!!fieldErrors.confirmPassword}
                    $hasSuffix
                    aria-invalid={!!fieldErrors.confirmPassword}
                    aria-describedby={fieldErrors.confirmPassword ? 'err-confirm-password' : undefined}
                    disabled={isLoading}
                    required
                  />
                  <PasswordToggleButton
                    type="button"
                    onClick={toggleShowConfirmPassword}
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

          <SubmitButton
            type="submit"
            disabled={isLoading}
            $isLoading={isLoading}
          >
            {isLoading && <Loader2 size={18} className="spinner-icon" />}
            <span>
              {isLoading
                ? step === 'enter_otp'
                  ? AUTH_TEXT.loadingVerifyOtp
                  : step === 'set_new_password'
                  ? AUTH_TEXT.loadingReset
                  : AUTH_TEXT.loadingRecovery
                : step === 'enter_otp'
                ? AUTH_TEXT.verifyOtpBtn
                : step === 'set_new_password'
                ? AUTH_TEXT.confirmResetBtn
                : AUTH_TEXT.recoveryBtn}
            </span>
          </SubmitButton>

          {step === 'enter_otp' && (
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

      {step !== 'completed' && (
        <ToggleText>
          <ToggleButtonLink
            type="button"
            onClick={onSwitchToLogin}
          >
            {AUTH_TEXT.recoveryBackToLogin}
          </ToggleButtonLink>
        </ToggleText>
      )}
    </>
  );
};
