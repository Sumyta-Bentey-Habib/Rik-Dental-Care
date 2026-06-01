'use client';

import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { mockUser, User } from '../../data/dummy-data';
import {
  AuthWrapper,
  VisualPane,
  BrandInfo,
  VisualContent,
  VisualBadge,
  VisualTitle,
  VisualDesc,
  VisualFooter,
  FormPane,
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  StyledForm,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  ToggleText,
  ToggleButtonLink
} from './style';

interface AuthProps {
  onLoginSuccess: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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
    <AuthWrapper>
      <VisualPane>
        <BrandInfo>
          <Stethoscope size={28} />
          <h3>Rik Dental Care</h3>
        </BrandInfo>
        
        <VisualContent>
          <VisualBadge>Secure Patient Portal</VisualBadge>
          <VisualTitle>Manage Your Dental Care Anywhere</VisualTitle>
          <VisualDesc>
            Review upcoming appointments, update billing info, and ask our AI Assistant about procedures or sudden symptoms in a secure, encrypted dashboard.
          </VisualDesc>
        </VisualContent>

        <VisualFooter>
          © 2026 Rik Dental Care Center. All rights reserved.
        </VisualFooter>
      </VisualPane>

      <FormPane>
        <FormContainer>
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
                placeholder="alex.rivers@dentalcare.com"
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
                  placeholder="+1 (555) 234-5678"
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
