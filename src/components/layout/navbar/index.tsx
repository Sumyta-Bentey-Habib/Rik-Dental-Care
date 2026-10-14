'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import {
  USER_SESSION_KEY,
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
  MobilePrimaryButton
} from './style';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Read user from sessionStorage using useSyncExternalStore (SSR-safe, reactive, no cascading renders)
  const userJson = React.useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      return () => window.removeEventListener('storage', callback);
    },
    () => (typeof window !== 'undefined' ? sessionStorage.getItem(USER_SESSION_KEY) : null),
    () => null
  );
  const user = React.useMemo<{ name: string; avatar: string } | null>(() => {
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }, [userJson]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Close mobile menu on path changes without cascading effect renders
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  const handleLogout = () => {
    sessionStorage.removeItem(USER_SESSION_KEY);
    window.dispatchEvent(new Event('storage'));
    setIsMobileMenuOpen(false);
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
          {user && (
            <>
              <NavLink $active={pathname === ROUTES.DASHBOARD} onClick={() => router.push(ROUTES.DASHBOARD)}>
                {SIDEBAR_TEXT.dashboard}
              </NavLink>
              <NavLink $active={pathname === ROUTES.CHAT} onClick={() => router.push(ROUTES.CHAT)}>
                {SIDEBAR_TEXT.aiAssistant}
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
                  <UserRoleText>{NAVBAR_TEXT.patientRole}</UserRoleText>
                </UserMetaText>
              </UserProfileBadge>
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
        <HamburgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            {user && (
              <>
                <MobileNavLink $active={pathname === ROUTES.DASHBOARD} onClick={() => router.push(ROUTES.DASHBOARD)}>
                  {SIDEBAR_TEXT.dashboard}
                </MobileNavLink>
                <MobileNavLink $active={pathname === ROUTES.CHAT} onClick={() => router.push(ROUTES.CHAT)}>
                  {SIDEBAR_TEXT.aiAssistant}
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
                    <UserRoleText>{NAVBAR_TEXT.patientRole}</UserRoleText>
                  </UserMetaText>
                </UserProfileBadge>
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
