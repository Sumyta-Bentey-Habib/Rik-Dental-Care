import styled from 'styled-components';
import { Stethoscope } from 'lucide-react';

export const NavbarWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(248, 250, 252, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
`;

export const NavbarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

export const StyledLogoIcon = styled(Stethoscope)`
  color: #1d4ed8;
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
  color: #0f172a;

  span {
    color: #1d4ed8;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
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
  color: ${(props) => (props.$active ? '#1d4ed8' : '#475569')};
  cursor: pointer;
  position: relative;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${(props) => (props.$active ? '100%' : '0%')};
    height: 2px;
    background-color: #1d4ed8;
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
`;

export const LoginButton = styled.button`
  background: transparent;
  border: 1px solid rgba(29, 78, 216, 0.4);
  color: #1d4ed8;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(29, 78, 216, 0.05);
    border-color: #1d4ed8;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PrimaryButton = styled.button`
  background: #1d4ed8;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(29, 78, 216, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: #1e40af;
    box-shadow: 0 6px 20px rgba(29, 78, 216, 0.4);
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
  background: rgba(226, 232, 240, 0.4);
  border-radius: 14px;
  border: 1px solid rgba(226, 232, 240, 0.6);
`;

export const UserAvatarCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
`;

export const UserMetaText = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const UserDisplayName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
`;

export const UserRoleText = styled.span`
  font-size: 11px;
  color: #64748b;
`;
