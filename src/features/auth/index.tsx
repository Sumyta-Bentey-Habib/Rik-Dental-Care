'use client';

import React, { useState } from 'react';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { User } from '@/types';
import { mockUser } from '@/data/dummy-data';
import { BRAND_NAME, AUTH_TEXT } from '@/constants/constants';
import {
  AuthWrapper,
  FormPane,
  FormContainer,
  BrandHeader,
  FormHeader,
  FormTitle,
  FormSubtitle,
  StyledForm,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ToggleText,
  ToggleButtonLink,
  BackButton
} from './style';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToHome: () => void;
  onToggleMode: () => void;
  initialMode?: 'login' | 'register';
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess, onNavigateToHome, onToggleMode, initialMode = 'login' }) => {
  const isLogin = initialMode === 'login';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [prevMode, setPrevMode] = useState(initialMode);
  if (prevMode !== initialMode) {
    setPrevMode(initialMode);
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate successful login/registration by returning our mockUser
    if (isLogin) {
      onLoginSuccess(mockUser);
    } else {
      // Mock registering a new user based on inputs
      const registeredUser: User = {
        id: `pat_${Date.now()}`,
        name: name || 'Guest User',
        email: email || 'guest@dentalcare.com',
        phone: phone || '+1 (555) 000-0000',
        avatar: (name ? name.split(' ').map(n => n[0]).join('') : 'GU').toUpperCase(),
        dob: '1990-01-01',
        memberSince: '2026',
        insuranceProvider: 'Standard Dental Cover',
        policyNumber: 'POL-GUEST-99',
        nextAppointmentId: undefined
      };
      onLoginSuccess(registeredUser);
    }
  };

  return (
    <AuthWrapper $isLogin={isLogin}>
      <BackButton onClick={onNavigateToHome} type="button">
        <ArrowLeft size={16} />
        <span>{AUTH_TEXT.backBtn}</span>
      </BackButton>

      <FormPane>
        <FormContainer>
          <BrandHeader>
            <Stethoscope size={24} />
            <h3>{BRAND_NAME.first}<span>{BRAND_NAME.second}</span></h3>
          </BrandHeader>

          <FormHeader>
            <FormTitle>{isLogin ? AUTH_TEXT.welcomeBack : AUTH_TEXT.createAccount}</FormTitle>
            <FormSubtitle>
              {isLogin
                ? AUTH_TEXT.loginSubtitle
                : AUTH_TEXT.registerSubtitle}
            </FormSubtitle>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup>
                <Label htmlFor="reg-name">{AUTH_TEXT.fullNameLabel}</Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder={AUTH_TEXT.fullNamePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="auth-email">{AUTH_TEXT.emailLabel}</Label>
              <Input
                id="auth-email"
                type="email"
                placeholder={AUTH_TEXT.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label htmlFor="reg-phone">{AUTH_TEXT.phoneLabel}</Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder={AUTH_TEXT.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="auth-password">{AUTH_TEXT.passwordLabel}</Label>
              <Input
                id="auth-password"
                type="password"
                placeholder={AUTH_TEXT.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <SubmitButton type="submit">
              {isLogin ? AUTH_TEXT.signInBtn : AUTH_TEXT.signUpBtn}
            </SubmitButton>
          </StyledForm>

          <ToggleText>
            {isLogin ? AUTH_TEXT.noAccount : AUTH_TEXT.hasAccount}
            <ToggleButtonLink type="button" onClick={onToggleMode}>
              {isLogin ? AUTH_TEXT.signUpBtn : AUTH_TEXT.signInBtn}
            </ToggleButtonLink>
          </ToggleText>
        </FormContainer>
      </FormPane>
    </AuthWrapper>
  );
};

export default Auth;
