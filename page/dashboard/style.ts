import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  padding: 32px 24px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #f8fafc;
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
  color: #0f172a;
  letter-spacing: -0.5px;
  margin: 0 0 4px 0;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
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
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
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
  background: ${(props) => (props.$active ? '#1d4ed8' : '#ffffff')};
  border: 1px solid ${(props) => (props.$active ? '#1d4ed8' : 'rgba(226, 232, 240, 1)')};
  color: ${(props) => (props.$active ? '#ffffff' : '#64748b')};
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? '#ffffff' : '#1d4ed8')};
    border-color: ${(props) => (props.$active ? '#1d4ed8' : 'rgba(29, 78, 216, 0.3)')};
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
  background: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(29, 78, 216, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  }

  @media (max-width: 640px) {
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
  color: #0f172a;
`;

export const AppointmentDoctorText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
`;

export const AppointmentDetailsText = styled.span`
  font-size: 13px;
  color: #475569;
`;

export const StatusBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 640px) {
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
        return 'background: #f1f5f9; color: #475569;';
      case 'cancelled':
        return 'background: #fee2e2; color: #991b1b;';
      default:
        return 'background: #f1f5f9; color: #475569;';
    }
  }}
`;

export const ActionLink = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding: 0;

  &:hover {
    color: #b91c1c;
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
  color: #64748b;
  font-weight: 500;
`;

export const InfoValue = styled.span`
  color: #0f172a;
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
  color: #475569;
  line-height: 1.5;
  margin: 0;
`;

export const TeaserButton = styled.button`
  background: #1d4ed8;
  color: #ffffff;
  border: none;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background: #1e40af;
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
  background: #f8fafc;
  outline: none;
  color: #0f172a;

  &:focus {
    border-color: #1d4ed8;
  }
`;

export const StyledInput = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 13px;
  font-weight: 500;
  background: #f8fafc;
  outline: none;
  color: #0f172a;

  &:focus {
    border-color: #1d4ed8;
  }
`;

export const SubmitBookingButton = styled.button`
  background: #1d4ed8;
  color: #ffffff;
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
    background: #1e40af;
  }
`;
