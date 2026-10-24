'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';
import {
  BRAND_NAME,
  AUTH_PATH_PREFIX,
  NAVBAR_TEXT,
  NAVBAR_LINKS,
  SIDEBAR_TEXT,
} from '@/constants/constants';
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
  MobilePrimaryButton,
  MobileUserProfileBadge,
  MobileUserMetaText,
} from './style';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { legacyUser: user, isAuthenticated, logout } = useAuth();
  const isLoggedIn = Boolean(isAuthenticated && user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close mobile menu on path changes without cascading effect renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    await logout();
    router.push(ROUTES.HOME);
  };

  // Hide navbar on all auth, dashboard, and chat pages
  if (
    pathname?.startsWith(AUTH_PATH_PREFIX) ||
    pathname === ROUTES.DASHBOARD ||
    pathname === ROUTES.CHAT
  ) {
    return null;
  }

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoWrapper onClick={() => router.push(ROUTES.HOME)}>
          <StyledLogoIcon />
          <LogoText>
            {BRAND_NAME.first}<span>{BRAND_NAME.second}</span>
          </LogoText>
        </LogoWrapper>

        {/* Desktop Navigation */}
        <NavLinks>
          {NAVBAR_LINKS.map((link) => (
            <NavLink
              key={link.href}
              $active={pathname === link.href}
              onClick={() => router.push(link.href)}
            >
              {link.label}
            </NavLink>
          ))}
          {isLoggedIn && (
            <NavLink $active={pathname === ROUTES.CHAT} onClick={() => router.push(ROUTES.CHAT)}>
              {SIDEBAR_TEXT.aiAssistant}
            </NavLink>
          )}
        </NavLinks>

        {/* Desktop Actions */}
        <ActionsWrapper>
          {isLoggedIn && user ? (
            <>
              <UserProfileBadge
                onClick={() => router.push(ROUTES.DASHBOARD)}
                role="button"
                tabIndex={0}
                aria-label={NAVBAR_TEXT.dashboard}
                title={NAVBAR_TEXT.dashboard}
              >
                <UserAvatarCircle>{user.avatar}</UserAvatarCircle>
                <UserMetaText>
                  <UserDisplayName>{user.name}</UserDisplayName>
                  <UserRoleText>
                    {user.role === 'admin' ? NAVBAR_TEXT.adminRole : NAVBAR_TEXT.patientRole}
                  </UserRoleText>
                </UserMetaText>
              </UserProfileBadge>
              <PrimaryButton onClick={() => router.push(ROUTES.DASHBOARD)}>
                {NAVBAR_TEXT.dashboard}
              </PrimaryButton>
              <LoginButton onClick={handleLogout}>{NAVBAR_TEXT.logOut}</LoginButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => router.push(ROUTES.LOGIN)}>{NAVBAR_TEXT.logIn}</LoginButton>
              <PrimaryButton onClick={() => router.push(ROUTES.REGISTER)}>
                {NAVBAR_TEXT.bookConsult}
              </PrimaryButton>
            </>
          )}
        </ActionsWrapper>

        {/* Mobile/Tablet Hamburger Toggle */}
        <HamburgerButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </HamburgerButton>

        {/* Mobile Menu Dropdown */}
        <MobileMenu $isOpen={isMobileMenuOpen}>
          <MobileNavLinks>
            {NAVBAR_LINKS.map((link) => (
              <MobileNavLink
                key={link.href}
                $active={pathname === link.href}
                onClick={() => router.push(link.href)}
              >
                {link.label}
              </MobileNavLink>
            ))}
            {isLoggedIn && (
              <MobileNavLink $active={pathname === ROUTES.CHAT} onClick={() => router.push(ROUTES.CHAT)}>
                {SIDEBAR_TEXT.aiAssistant}
              </MobileNavLink>
            )}
          </MobileNavLinks>

          <MobileActionsWrapper>
            {isLoggedIn && user ? (
              <>
                <MobileUserProfileBadge
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push(ROUTES.DASHBOARD);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={NAVBAR_TEXT.dashboard}
                >
                  <UserAvatarCircle>{user.avatar}</UserAvatarCircle>
                  <MobileUserMetaText>
                    <UserDisplayName>{user.name}</UserDisplayName>
                    <UserRoleText>
                      {user.role === 'admin' ? NAVBAR_TEXT.adminRole : NAVBAR_TEXT.patientRole}
                    </UserRoleText>
                  </MobileUserMetaText>
                </MobileUserProfileBadge>
                <MobilePrimaryButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push(ROUTES.DASHBOARD);
                  }}
                >
                  {NAVBAR_TEXT.dashboard}
                </MobilePrimaryButton>
                <MobileLoginButton onClick={handleLogout}>{NAVBAR_TEXT.logOut}</MobileLoginButton>
              </>
            ) : (
              <>
                <MobileLoginButton onClick={() => router.push(ROUTES.LOGIN)}>{NAVBAR_TEXT.logIn}</MobileLoginButton>
                <MobilePrimaryButton onClick={() => router.push(ROUTES.REGISTER)}>
                  {NAVBAR_TEXT.bookConsult}
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
