'use client';

import React, { useState } from 'react';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { BRAND_NAME, AUTH_TEXT } from '@/constants/constants';
import {
  AuthMode,
  AuthRole,
  AuthProps,
  RegisterStep,
} from '@/types';
import {
  SideHero,
  RoleSelector,
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
  RoleSelectorProps,
} from '@/types';

export const Auth: React.FC<AuthProps> = ({
  onLoginSuccess,
  onNavigateToHome,
  onToggleMode,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [role, setRole] = useState<AuthRole>('patient');
  const [registerStep, setRegisterStep] = useState<RegisterStep>('form');

  // Sync mode if initialMode prop changes from router navigation
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setMode(initialMode);
    setRegisterStep('form');
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setRegisterStep('form');
    onToggleMode(newMode);
  };

  const showRoleSelector = mode !== 'recovery' && registerStep === 'form';
  const showAdminStaffNotice = role === 'admin' && mode === 'register' && registerStep === 'form';

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

          {/* Role selector tab (Patient vs Clinic Staff) */}
          {showRoleSelector && (
            <RoleSelector
              role={role}
              onSelectRole={setRole}
              showNotice={showAdminStaffNotice}
            />
          )}

          {/* Form Flows */}
          {mode === 'login' && (
            <LoginForm
              role={role}
              onLoginSuccess={onLoginSuccess}
              onForgotPassword={() => switchMode('recovery')}
              onSwitchToRegister={() => switchMode('register')}
            />
          )}

          {mode === 'register' && (
            <RegisterForm
              role={role}
              onSwitchToLogin={() => switchMode('login')}
              onStepChange={setRegisterStep}
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
