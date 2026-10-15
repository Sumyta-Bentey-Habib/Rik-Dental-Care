import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { media, breakpoints } from '@/constants/breakpoints';

interface AuthWrapperProps {
  $isLogin: boolean;
}

export const AuthWrapper = styled.div<AuthWrapperProps>`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: linear-gradient(rgba(${colors.rgb.slate900}, 0.45), rgba(${colors.rgb.slate900}, 0.45)),
    url(${props => props.$isLogin ? '/auth_login_bg.png' : '/auth_register_bg.png'});
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  overflow: hidden;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 32px;
  left: 32px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(${colors.rgb.white}, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(${colors.rgb.white}, 0.4);
  padding: 10px 18px;
  border-radius: 30px;
  color: ${colors.neutral.slate900};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(${colors.rgb.black}, 0.1);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    background: ${colors.neutral.white};
    transform: translateX(-4px);
    box-shadow: 0 6px 24px rgba(${colors.rgb.black}, 0.15);
    
    svg {
      transform: translateX(-2px);
    }
  }

  &:active {
    transform: translateX(-2px) scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }

  ${media.mobileMd} {
    top: 20px;
    left: 20px;
    padding: 8px 14px;
    font-size: 13px;
  }
`;

export const FormPane = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 24px;
  z-index: 2;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 440px;
  background: rgba(${colors.rgb.white}, 0.72);
  backdrop-filter: blur(20px) saturate(190%);
  -webkit-backdrop-filter: blur(20px) saturate(190%);
  border: 1px solid rgba(${colors.rgb.white}, 0.35);
  padding: 48px 40px;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(${colors.rgb.black}, 0.25);
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${breakpoints.mobileLg}) {
    padding: 32px 24px;
    border-radius: 20px;
  }
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  color: ${colors.primary.default};

  h3 {
    font-size: 20px;
    font-weight: 800;
    color: ${colors.neutral.slate900};
    letter-spacing: -0.5px;
    
    span {
      color: ${colors.primary.default};
    }
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 28px;
  text-align: center;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  letter-spacing: -0.5px;
  margin-bottom: 8px;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.neutral.slate600};
  line-height: 1.4;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate700};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(${colors.rgb.slate900}, 0.08);
  font-size: 14px;
  font-weight: 500;
  outline: none;
  background: rgba(${colors.rgb.white}, 0.85);
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary.default};
    background: ${colors.neutral.white};
    box-shadow: 0 0 0 3px rgba(${colors.rgb.primary}, 0.15);
  }

  &::placeholder {
    color: ${colors.neutral.slate400};
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: ${colors.primary.default};
  border: none;
  color: ${colors.neutral.white};
  font-size: 14px;
  font-weight: 600;
  padding: 14px 20px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(${colors.rgb.primary}, 0.25);
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: ${colors.primary.hover};
    box-shadow: 0 6px 18px rgba(${colors.rgb.primary}, 0.35);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

export const ToggleText = styled.p`
  font-size: 14px;
  color: ${colors.neutral.slate600};
  text-align: center;
  margin-top: 24px;
`;

export const ToggleButtonLink = styled.button`
  background: none;
  border: none;
  color: ${colors.primary.default};
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  margin-left: 6px;
  text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary.hover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const RoleSelectorContainer = styled.div`
  display: flex;
  background: rgba(${colors.rgb.slate900}, 0.05);
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 20px;
  gap: 4px;
`;

interface RoleSelectorTabProps {
  $active: boolean;
}

export const RoleSelectorTab = styled.button<RoleSelectorTabProps>`
  flex: 1;
  border: none;
  background: ${props => props.$active ? colors.neutral.white : 'transparent'};
  color: ${props => props.$active ? colors.primary.default : colors.neutral.slate600};
  font-size: 13px;
  font-weight: 700;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: ${props => props.$active ? `0 2px 8px rgba(${colors.rgb.black}, 0.08)` : 'none'};
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.primary.default};
  }
`;
