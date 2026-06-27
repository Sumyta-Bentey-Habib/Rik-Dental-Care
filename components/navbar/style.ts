import styled from 'styled-components';
import { Stethoscope } from 'lucide-react';
import { colors } from '../../utils/colors';
import { media } from '../../utils/breakpoints';

export const NavbarWrapper = styled.header`
  position: relative;
  z-index: 100;
  width: 100%;
  background: rgba(${colors.rgb.slate50}, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(${colors.rgb.slate200}, 0.6);
  box-shadow: 0 4px 30px rgba(${colors.rgb.black}, 0.03);
`;

export const NavbarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

export const StyledLogoIcon = styled(Stethoscope)`
  color: ${colors.primary.default};
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(15deg) scale(1.1);
  }
`;

export const LogoText = styled.span`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: ${colors.neutral.slate900};

  span {
    color: ${colors.primary.default};
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  ${media.tablet} {
    display: none;
  }
`;

interface NavLinkProps {
  $active?: boolean;
}

export const NavLink = styled.button<NavLinkProps>`
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.$active ? colors.primary.default : colors.neutral.slate600)};
  cursor: pointer;
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary.default};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.$active ? '100%' : '0%')};
    height: 2px;
    background-color: ${colors.primary.default};
    transition: width 0.2s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${media.tablet} {
    display: none;
  }
`;

export const LoginButton = styled.button`
  background: transparent;
  border: 1px solid rgba(${colors.rgb.primary}, 0.4);
  color: ${colors.primary.default};
  font-size: 14px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(${colors.rgb.primary}, 0.05);
    border-color: ${colors.primary.default};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PrimaryButton = styled.button`
  background: ${colors.primary.default};
  border: none;
  color: ${colors.neutral.white};
  font-size: 14px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(${colors.rgb.primary}, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.primary.hover};
    box-shadow: 0 6px 20px rgba(${colors.rgb.primary}, 0.4);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UserProfileBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background: rgba(${colors.rgb.slate200}, 0.4);
  border-radius: 14px;
  border: 1px solid rgba(${colors.rgb.slate200}, 0.6);
`;

export const UserAvatarCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${colors.primary.default}, ${colors.primary.accent});
  color: ${colors.neutral.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

export const UserMetaText = styled.div`
  display: flex;
  flex-direction: column;

  ${media.mobileMd} {
    display: none;
  }
`;

export const UserDisplayName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.neutral.slate900};
`;

export const UserRoleText = styled.span`
  font-size: 11px;
  color: ${colors.neutral.slate500};
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.neutral.slate900};
  padding: 4px;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary.default};
  }

  ${media.tablet} {
    display: flex;
  }
`;

interface MobileMenuProps {
  $isOpen: boolean;
}

export const MobileMenu = styled.div<MobileMenuProps>`
  display: none;
  
  ${media.tablet} {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 72px;
    left: 0;
    width: 100%;
    background: ${colors.neutral.white};
    border-bottom: 1px solid rgba(${colors.rgb.slate200}, 0.8);
    padding: 24px;
    box-shadow: 0 10px 20px rgba(${colors.rgb.black}, 0.05);
    z-index: 99;
    gap: 20px;
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

export const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MobileNavLink = styled(NavLink)`
  font-size: 16px;
  padding: 8px 0;
  width: 100%;
  text-align: left;

  &::after {
    display: none;
  }
`;

export const MobileActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid rgba(${colors.rgb.slate200}, 0.8);
`;

export const MobileLoginButton = styled(LoginButton)`
  width: 100%;
  text-align: center;
  padding: 12px;
`;

export const MobilePrimaryButton = styled(PrimaryButton)`
  width: 100%;
  text-align: center;
  padding: 12px;
`;
