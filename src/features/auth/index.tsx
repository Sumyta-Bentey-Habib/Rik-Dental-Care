'use client';

import React, { useState } from 'react';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { BRAND_NAME, AUTH_TEXT } from '@/constants/constants';
import {
  AuthMode,
  AuthProps,
} from '@/types';
import {
  SideHero,
  LoginForm,
  RegisterForm,
  RecoveryForm,
} from './components';
import {
  AuthPageContainer,
  BackButton,
  FormPane,
  FormCard,
  BrandHeader,
} from './style';

export type {
  AuthMode,
  AuthRole,
  AuthProps,
  RecoveryStep,
  RegisterStep,
  LoginFormProps,
  RegisterFormProps,
  RecoveryFormProps,
} from '@/types';

export const Auth: React.FC<AuthProps> = ({
  onLoginSuccess,
  onNavigateToHome,
  onToggleMode,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sync mode if initialMode prop changes from router navigation
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    onToggleMode(newMode);
  };

  return (
    <AuthPageContainer>
      <BackButton
        onClick={onNavigateToHome}
        type="button"
        aria-label={AUTH_TEXT.backBtn}
      >
        <ArrowLeft size={16} />
        <span>{AUTH_TEXT.backBtn}</span>
      </BackButton>

      {/* Left Healthcare Brand Showcase Panel */}
      <SideHero />

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

          {/* Form Flows */}
          {mode === 'login' && (
            <LoginForm
              onLoginSuccess={onLoginSuccess}
              onForgotPassword={() => switchMode('recovery')}
              onSwitchToRegister={() => switchMode('register')}
            />
          )}

          {mode === 'register' && (
            <RegisterForm
              onSwitchToLogin={() => switchMode('login')}
            />
          )}

          {mode === 'recovery' && (
            <RecoveryForm
              onSwitchToLogin={() => switchMode('login')}
            />
          )}
        </FormCard>
      </FormPane>
    </AuthPageContainer>
  );
};

export default Auth;
