'use client';

import React from 'react';
import { User } from '../../data/dummy-data';
import {
  NavbarWrapper,
  NavbarContainer,
  LogoWrapper,
  StyledLogoIcon,
  LogoText,
  NavLinks,
  NavLink,
  ActionsWrapper,
  LoginButton,
  PrimaryButton,
  UserProfileBadge,
  UserAvatarCircle,
  UserMetaText,
  UserDisplayName,
  UserRoleText
} from './style';

interface NavbarProps {
  currentView: 'home' | 'auth' | 'dashboard' | 'chat';
  onViewChange: (view: 'home' | 'auth' | 'dashboard' | 'chat') => void;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  user,
  onLogout
}) => {
  const handleScroll = (id: string) => {
    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoWrapper onClick={() => handleScroll('hero')}>
          <StyledLogoIcon />
          <LogoText>
            Rik<span>Dental</span>
          </LogoText>
        </LogoWrapper>

        <NavLinks>
          <NavLink
            $active={currentView === 'home'}
            onClick={() => handleScroll('hero')}
          >
            Home
          </NavLink>
          <NavLink onClick={() => handleScroll('services')}>
            Services
          </NavLink>
          <NavLink onClick={() => handleScroll('about')}>
            About Us
          </NavLink>
          <NavLink onClick={() => handleScroll('testimonials')}>
            Testimonial
          </NavLink>
          {user && (
            <>
              <NavLink
                $active={currentView === 'dashboard'}
                onClick={() => onViewChange('dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink
                $active={currentView === 'chat'}
                onClick={() => onViewChange('chat')}
              >
                AI Assistant
              </NavLink>
            </>
          )}
        </NavLinks>

        <ActionsWrapper>
          {user ? (
            <>
              <UserProfileBadge>
                <UserAvatarCircle>{user.avatar}</UserAvatarCircle>
                <UserMetaText>
                  <UserDisplayName>{user.name}</UserDisplayName>
                  <UserRoleText>Patient</UserRoleText>
                </UserMetaText>
              </UserProfileBadge>
              <LoginButton onClick={onLogout}>Log Out</LoginButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => onViewChange('auth')}>Log In</LoginButton>
              <PrimaryButton onClick={() => onViewChange('auth')}>
                Book Consult
              </PrimaryButton>
            </>
          )}
        </ActionsWrapper>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
