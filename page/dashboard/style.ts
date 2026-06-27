import styled from 'styled-components';
import { colors } from '../../utils/colors';
import { media } from '../../utils/breakpoints';

export const DashboardWrapper = styled.div`
  padding: 32px 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: ${colors.neutral.slate50};
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const HeaderWelcome = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WelcomeTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  letter-spacing: -0.5px;
  margin: 0 0 4px 0;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 14px;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  ${media.desktop} {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Card = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

interface FilterButtonProps {
  $active: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  background: ${(props) => (props.$active ? colors.primary.default : colors.neutral.white)};
  border: 1px solid ${(props) => (props.$active ? colors.primary.default : 'rgba(226, 232, 240, 1)')};
  color: ${(props) => (props.$active ? colors.neutral.white : colors.neutral.slate500)};
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? colors.neutral.white : colors.primary.default)};
    border-color: ${(props) => (props.$active ? colors.primary.default : 'rgba(29, 78, 216, 0.3)')};
  }
`;

export const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background: ${colors.neutral.white};
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(29, 78, 216, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  }

  ${media.mobileMd} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const AppointmentMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AppointmentDateText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
`;

export const AppointmentDoctorText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate500};
`;

export const AppointmentDetailsText = styled.span`
  font-size: 13px;
  color: ${colors.neutral.slate600};
`;

export const StatusBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${media.mobileMd} {
    width: 100%;
    justify-content: space-between;
  }
`;

interface BadgeProps {
  $status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export const StatusBadge = styled.span<BadgeProps>`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.2px;

  ${(props) => {
    switch (props.$status) {
      case 'confirmed':
        return 'background: #d1fae5; color: #065f46;';
      case 'pending':
        return 'background: #fef3c7; color: #92400e;';
      case 'completed':
        return `background: ${colors.neutral.slate100}; color: ${colors.neutral.slate600};`;
      case 'cancelled':
        return `background: ${colors.emergency.red100}; color: ${colors.emergency.red800};`;
      default:
        return `background: ${colors.neutral.slate100}; color: ${colors.neutral.slate600};`;
    }
  }}
`;

export const ActionLink = styled.button`
  background: none;
  border: none;
  color: ${colors.status.error};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding: 0;

  &:hover {
    color: ${colors.emergency.red700};
  }
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(226, 232, 240, 0.8);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const InfoLabel = styled.span`
  color: ${colors.neutral.slate500};
  font-weight: 500;
`;

export const InfoValue = styled.span`
  color: ${colors.neutral.slate900};
  font-weight: 600;
`;

export const AIChatTeaser = styled.div`
  background: linear-gradient(135deg, rgba(29, 78, 216, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 1px solid rgba(29, 78, 216, 0.1);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TeaserText = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate600};
  line-height: 1.5;
  margin: 0;
`;

export const TeaserButton = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: ${colors.primary.hover};
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
`;

export const StyledSelect = styled.select`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 13px;
  font-weight: 500;
  background: ${colors.neutral.slate50};
  outline: none;
  color: ${colors.neutral.slate900};

  &:focus {
    border-color: ${colors.primary.default};
  }
`;

export const StyledInput = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 13px;
  font-weight: 500;
  background: ${colors.neutral.slate50};
  outline: none;
  color: ${colors.neutral.slate900};

  &:focus {
    border-color: ${colors.primary.default};
  }
`;

export const SubmitBookingButton = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.primary.hover};
  }
`;
