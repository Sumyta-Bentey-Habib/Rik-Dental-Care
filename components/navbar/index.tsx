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
  currentView: 'home' | 'auth' | 'dashboard' | 'chat' | 'about' | 'specialists' | 'emergency';
  onViewChange: (view: 'home' | 'auth' | 'dashboard' | 'chat' | 'about' | 'specialists' | 'emergency') => void;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onViewChange,
  user,
  onLogout
}) => {
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoWrapper onClick={() => onViewChange('home')}>
          <StyledLogoIcon />
          <LogoText>
            Rik<span>Dental</span>
          </LogoText>
        </LogoWrapper>

        <NavLinks>
          <NavLink
            $active={currentView === 'home'}
            onClick={() => onViewChange('home')}
          >
            Home
          </NavLink>
          <NavLink
            $active={currentView === 'specialists'}
            onClick={() => onViewChange('specialists')}
          >
            Specialists
          </NavLink>
          <NavLink
            $active={currentView === 'about'}
            onClick={() => onViewChange('about')}
          >
            About Us
          </NavLink>
          <NavLink
            $active={currentView === 'emergency'}
            onClick={() => onViewChange('emergency')}
          >
            Emergency
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
