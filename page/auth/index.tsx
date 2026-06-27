'use client';

import React, { useState, useEffect } from 'react';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import { mockUser, User } from '../../data/dummy-data';
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
  onBack: () => void;
  initialMode?: 'login' | 'register';
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess, onBack, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

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
      <BackButton onClick={onBack} type="button">
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </BackButton>

      <FormPane>
        <FormContainer>
          <BrandHeader>
            <Stethoscope size={24} />
            <h3>Rik<span>Dental</span></h3>
          </BrandHeader>

          <FormHeader>
            <FormTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</FormTitle>
            <FormSubtitle>
              {isLogin
                ? 'Enter your details below to access your patient portal'
                : 'Sign up to manage your dental appointments and history'}
            </FormSubtitle>
          </FormHeader>

          <StyledForm onSubmit={handleSubmit}>
            {!isLogin && (
              <FormGroup>
                <Label htmlFor="reg-name">Full Name</Label>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="auth-email">Email Address</Label>
              <Input
                id="auth-email"
                type="email"
                placeholder="sumytabenteyhabib@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label htmlFor="reg-phone">Phone Number</Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="+1 (555) 777-8888"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="auth-password">Password</Label>
              <Input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <SubmitButton type="submit">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </SubmitButton>
          </StyledForm>

          <ToggleText>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <ToggleButtonLink type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </ToggleButtonLink>
          </ToggleText>
        </FormContainer>
      </FormPane>
    </AuthWrapper>
  );
};

export default Auth;
