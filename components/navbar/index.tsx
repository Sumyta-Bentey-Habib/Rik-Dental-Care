'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Menu, X } from 'lucide-react';
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
  UserRoleText,
  HamburgerButton,
  MobileMenu,
  MobileNavLinks,
  MobileNavLink,
  MobileActionsWrapper,
  MobileLoginButton,
  MobilePrimaryButton
} from './style';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Read user from sessionStorage (client-only)
  const [user, setUser] = React.useState<{ name: string; avatar: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const stored = sessionStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [pathname]); // re-check on every route change

  // Close mobile menu on path changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setIsMobileMenuOpen(false);
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

        {/* Desktop Navigation */}
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

        {/* Desktop Actions */}
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

        {/* Mobile/Tablet Hamburger Toggle */}
        <HamburgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </HamburgerButton>

        {/* Mobile Menu Dropdown */}
        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileNavLinks>
            <MobileNavLink $active={pathname === ROUTES.HOME} onClick={() => router.push(ROUTES.HOME)}>
              Home
            </MobileNavLink>
            <MobileNavLink $active={pathname === ROUTES.SPECIALISTS} onClick={() => router.push(ROUTES.SPECIALISTS)}>
              Specialists
            </MobileNavLink>
            <MobileNavLink $active={pathname === ROUTES.ABOUT} onClick={() => router.push(ROUTES.ABOUT)}>
              About Us
            </MobileNavLink>
            <MobileNavLink $active={pathname === ROUTES.EMERGENCY} onClick={() => router.push(ROUTES.EMERGENCY)}>
              Emergency
            </MobileNavLink>
            {user && (
              <>
                <MobileNavLink $active={pathname === ROUTES.DASHBOARD} onClick={() => router.push(ROUTES.DASHBOARD)}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink $active={pathname === ROUTES.CHAT} onClick={() => router.push(ROUTES.CHAT)}>
                  AI Assistant
                </MobileNavLink>
              </>
            )}
          </MobileNavLinks>

          <MobileActionsWrapper>
            {user ? (
              <>
                <UserProfileBadge style={{ alignSelf: 'flex-start', width: 'auto' }}>
                  <UserAvatarCircle>{user.avatar}</UserAvatarCircle>
                  <UserMetaText style={{ display: 'flex' }}>
                    <UserDisplayName>{user.name}</UserDisplayName>
                    <UserRoleText>Patient</UserRoleText>
                  </UserMetaText>
                </UserProfileBadge>
                <MobileLoginButton onClick={handleLogout}>Log Out</MobileLoginButton>
              </>
            ) : (
              <>
                <MobileLoginButton onClick={() => router.push(ROUTES.LOGIN)}>Log In</MobileLoginButton>
                <MobilePrimaryButton onClick={() => router.push(ROUTES.REGISTER)}>
                  Book Consult
                </MobilePrimaryButton>
              </>
            )}
          </MobileActionsWrapper>
        </MobileMenu>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
