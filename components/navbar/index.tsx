'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { ROUTES } from '../../utils/routes';
import {
  ActionsWrapper,
  LoginButton,
  LogoText,
  LogoWrapper,
  NavbarContainer,
  NavbarWrapper,
  NavLink,
  NavLinks,
  PrimaryButton,
  StyledLogoIcon,
  UserAvatarCircle,
  UserDisplayName,
  UserMetaText,
  UserProfileBadge,
  UserRoleText
} from './style';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Read user from sessionStorage (client-only)
  const [user, setUser] = React.useState<{ name: string; avatar: string } | null>(null);

  React.useEffect(() => {
    const stored = sessionStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [pathname]); // re-check on every route change

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    router.push(ROUTES.HOME);
  };

  // Hide navbar on all auth pages
  if (pathname?.startsWith('/auth')) return null;

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoWrapper onClick={() => router.push(ROUTES.HOME)}>
          <StyledLogoIcon />
          <LogoText>
            Rik<span>Dental</span>
          </LogoText>
        </LogoWrapper>

        <NavLinks>
          <NavLink $active={pathname === ROUTES.HOME} onClick={() => router.push(ROUTES.HOME)}>
            Home
          </NavLink>
          <NavLink $active={pathname === ROUTES.SPECIALISTS} onClick={() => router.push(ROUTES.SPECIALISTS)}>
            Specialists
          </NavLink>
          <NavLink $active={pathname === ROUTES.ABOUT} onClick={() => router.push(ROUTES.ABOUT)}>
            About Us
          </NavLink>
          <NavLink $active={pathname === ROUTES.EMERGENCY} onClick={() => router.push(ROUTES.EMERGENCY)}>
            Emergency
          </NavLink>
          {user && (
            <>
              <NavLink $active={pathname === ROUTES.DASHBOARD} onClick={() => router.push(ROUTES.DASHBOARD)}>
                Dashboard
              </NavLink>
              <NavLink $active={pathname === ROUTES.CHAT} onClick={() => router.push(ROUTES.CHAT)}>
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
              <LoginButton onClick={handleLogout}>Log Out</LoginButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => router.push(ROUTES.LOGIN)}>Log In</LoginButton>
              <PrimaryButton onClick={() => router.push(ROUTES.REGISTER)}>
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
