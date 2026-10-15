import styled, { keyframes } from 'styled-components';
import { colors } from '@/constants/colors';
import { media, breakpoints } from '@/constants/breakpoints';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AuthPageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background-color: ${colors.neutral.slate50};
  position: relative;
  overflow-x: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 20;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  padding: 10px 18px;
  border-radius: 9999px;
  color: ${colors.neutral.slate700};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${colors.primary.default};
    border-color: ${colors.secondary.surfaceBorder};
    background: ${colors.secondary.surfaceLight};
    transform: translateX(-2px);

    svg {
      transform: translateX(-2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }

  ${media.mobile} {
    top: 16px;
    left: 16px;
    padding: 8px 14px;
    font-size: 12px;
  }
`;

// ==========================================
// SIDE HERO PANEL (Healthcare Branding)
// ==========================================
export const SideHeroPanel = styled.div`
  flex: 1.1;
  background: linear-gradient(145deg, ${colors.primary.dark} 0%, ${colors.primary.default} 60%, ${colors.primary.hover} 100%);
  color: ${colors.neutral.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 72px 64px 48px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${colors.rgb.primary}, 0.4) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${colors.rgb.secondarySurface}, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 480px;
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${colors.secondary.surface};
  width: fit-content;
`;

export const HeroTitle = styled.h1`
  font-size: 38px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -1px;
  color: ${colors.neutral.white};
  margin: 0;
`;

export const HeroSubtitle = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
`;

export const HeroTrustRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 2;
  margin-top: 32px;
`;

export const TrustItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);

  svg {
    color: ${colors.secondary.surface};
    flex-shrink: 0;
  }
`;

export const HeroEmergencyCallout = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.85);

  svg {
    color: ${colors.secondary.surface};
    flex-shrink: 0;
  }
`;

// ==========================================
// FORM PANE & CARD
// ==========================================
export const FormPane = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  min-height: 100vh;
  position: relative;

  ${media.mobile} {
    padding: 72px 16px 32px;
  }
`;

export const FormCard = styled.div`
  width: 100%;
  max-width: 460px;
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 24px;
  padding: 44px 36px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.35s ease-out;

  ${media.mobile} {
    padding: 28px 20px;
    border-radius: 20px;
  }
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;

  h3 {
    font-size: 20px;
    font-weight: 800;
    color: ${colors.headings};
    margin: 0;
    letter-spacing: -0.5px;

    span {
      color: ${colors.primary.default};
    }
  }

  svg {
    color: ${colors.primary.default};
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 24px;
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.headings};
  letter-spacing: -0.6px;
  margin: 0 0 6px 0;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.neutral.slate500};
  line-height: 1.5;
  margin: 0;
`;

// ==========================================
// ROLE SELECTOR
// ==========================================
export const RoleSelectorContainer = styled.div`
  display: flex;
  background: ${colors.neutral.slate100};
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 20px;
  gap: 4px;
  border: 1px solid ${colors.neutral.slate200};
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
  padding: 10px 14px;
  border-radius: 9px;
  cursor: pointer;
  box-shadow: ${props => props.$active ? '0 2px 6px rgba(0, 0, 0, 0.05)' : 'none'};
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    color: ${colors.primary.default};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 1px;
  }
`;

// ==========================================
// FORM CONTROLS & INPUTS
// ==========================================
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

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.neutral.slate700};
`;

export const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${colors.primary.default};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.primary.hover};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

interface InputWrapperProps {
  $hasError?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  .input-icon-prefix {
    position: absolute;
    left: 14px;
    color: ${props => props.$hasError ? colors.status.error : colors.neutral.slate400};
    pointer-events: none;
    transition: color 0.2s ease;
  }

  &:focus-within .input-icon-prefix {
    color: ${props => props.$hasError ? colors.status.error : colors.primary.default};
  }
`;

interface StyledInputProps {
  $hasError?: boolean;
  $hasSuffix?: boolean;
}

export const Input = styled.input<StyledInputProps>`
  width: 100%;
  padding: 13px 14px 13px 44px;
  padding-right: ${props => props.$hasSuffix ? '46px' : '14px'};
  border-radius: 12px;
  border: 1px solid ${props => props.$hasError ? colors.status.error : colors.neutral.slate200};
  font-size: 14px;
  font-weight: 500;
  outline: none;
  background: ${colors.neutral.white};
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;
  min-height: 48px;

  &:hover:not(:disabled) {
    border-color: ${props => props.$hasError ? colors.status.error : colors.neutral.slate300};
  }

  &:focus {
    border-color: ${props => props.$hasError ? colors.status.error : colors.primary.default};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(239, 68, 68, 0.15)' : `rgba(${colors.rgb.primary}, 0.12)`};
  }

  &:disabled {
    background: ${colors.neutral.slate100};
    color: ${colors.neutral.slate500};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${colors.neutral.slate400};
  }
`;

export const PasswordToggleButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  padding: 6px;
  color: ${colors.neutral.slate400};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.neutral.slate700};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }
`;

export const FieldError = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.status.errorText};
  animation: ${fadeIn} 0.2s ease;

  svg {
    flex-shrink: 0;
  }
`;

// ==========================================
// ALERT NOTIFICATION BANNER
// ==========================================
interface AlertBannerProps {
  $variant?: 'error' | 'success' | 'info';
}

export const AlertBanner = styled.div<AlertBannerProps>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 16px;
  animation: ${fadeIn} 0.25s ease;

  ${props => {
    switch (props.$variant) {
      case 'success':
        return `
          background: ${colors.status.successSurface};
          border: 1px solid ${colors.status.successBorder};
          color: ${colors.status.successText};
        `;
      case 'info':
        return `
          background: ${colors.status.infoSurface};
          border: 1px solid ${colors.status.infoBorder};
          color: ${colors.status.infoText};
        `;
      case 'error':
      default:
        return `
          background: ${colors.status.errorSurface};
          border: 1px solid ${colors.status.errorBorder};
          color: ${colors.status.errorText};
        `;
    }
  }}

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

// ==========================================
// SUBMIT BUTTON & FEEDBACK
// ==========================================
interface SubmitButtonProps {
  $isLoading?: boolean;
}

export const SubmitButton = styled.button<SubmitButtonProps>`
  width: 100%;
  background: ${colors.primary.default};
  border: none;
  color: ${colors.neutral.white};
  font-size: 14px;
  font-weight: 700;
  padding: 14px 22px;
  min-height: 48px;
  border-radius: 12px;
  cursor: ${props => props.$isLoading ? 'wait' : 'pointer'};
  box-shadow: 0 4px 14px rgba(${colors.rgb.primary}, 0.22);
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;

  &:hover:not(:disabled) {
    background: ${colors.primary.hover};
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(${colors.rgb.primary}, 0.32);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }

  .spinner-icon {
    animation: ${spin} 0.9s linear infinite;
  }
`;

export const ToggleText = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate600};
  text-align: center;
  margin: 24px 0 0;
`;

export const ToggleButtonLink = styled.button`
  background: none;
  border: none;
  color: ${colors.primary.default};
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  font-size: 13px;
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

// ==========================================
// RECOVERY SUCCESS VIEW
// ==========================================
export const SuccessCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 12px 0;
  animation: ${fadeIn} 0.3s ease;
`;

export const SuccessIconBadge = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.status.successSurface};
  border: 1px solid ${colors.status.successBorder};
  color: ${colors.status.success};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SuccessTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.headings};
  margin: 0;
`;

export const SuccessDesc = styled.p`
  font-size: 14px;
  color: ${colors.neutral.slate600};
  line-height: 1.6;
  margin: 0;
  max-width: 380px;
`;
