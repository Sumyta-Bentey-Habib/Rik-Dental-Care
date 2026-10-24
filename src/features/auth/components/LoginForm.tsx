import React from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { AUTH_TEXT } from '@/constants/constants';
import { LoginFormProps } from '@/types';
import { useLoginForm } from '@/hooks';
import {
  FormHeader,
  FormTitle,
  FormSubtitle,
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
} from '../style';

export const LoginForm: React.FC<LoginFormProps> = ({
  role,
  onLoginSuccess,
  onForgotPassword,
  onSwitchToRegister,
}) => {
  const {
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
  } = useLoginForm({ role, onLoginSuccess });

  return (
    <>
      <FormHeader>
        <FormTitle>{AUTH_TEXT.welcomeBack}</FormTitle>
        <FormSubtitle>{AUTH_TEXT.loginSubtitle}</FormSubtitle>
      </FormHeader>

      {generalError && (
        <AlertBanner $variant="error" role="alert">
          <AlertCircle size={18} />
          <span>{generalError}</span>
        </AlertBanner>
      )}

      <StyledForm onSubmit={handleSubmit} noValidate>
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
          <LabelRow>
            <Label htmlFor="auth-password">{AUTH_TEXT.passwordLabel}</Label>
            <ForgotPasswordLink
              type="button"
              onClick={onForgotPassword}
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

        <SubmitButton
          type="submit"
          disabled={isLoading}
          $isLoading={isLoading}
        >
          {isLoading && <Loader2 size={18} className="spinner-icon" />}
          <span>{isLoading ? AUTH_TEXT.loadingSignIn : AUTH_TEXT.signInBtn}</span>
        </SubmitButton>
      </StyledForm>

      <ToggleText>
        {AUTH_TEXT.noAccount}
        <ToggleButtonLink
          type="button"
          onClick={onSwitchToRegister}
        >
          {AUTH_TEXT.signUpBtn}
        </ToggleButtonLink>
      </ToggleText>
    </>
  );
};
