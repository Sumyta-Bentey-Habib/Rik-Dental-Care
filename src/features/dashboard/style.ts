import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { media } from '@/constants/breakpoints';

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${colors.neutral.slate50};
  font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

interface SidebarProps {
  $isOpen?: boolean;
}

export const SidebarContainer = styled.aside<SidebarProps>`
  width: 280px;
  background-color: #0b0f19;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, width 0.3s ease;
  flex-shrink: 0;
  z-index: 100;
  height: 100%;

  ${media.desktop} {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

export const SidebarProfile = styled.div`
  padding: 32px 24px 24px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;

export const SidebarAvatar = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid ${colors.primary.default};
  background-color: ${colors.neutral.slate900};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 14px rgba(${colors.rgb.primary}, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SidebarName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.2px;
`;

export const SidebarRole = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.primary.default};
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const SidebarNav = styled.nav`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

interface SidebarNavItemProps {
  $active: boolean;
}

export const SidebarNavItem = styled.button<SidebarNavItemProps>`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$active ? colors.primary.accent : 'rgba(255, 255, 255, 0.55)'};
  border: none;
  background: ${props => props.$active ? `rgba(${colors.rgb.primary}, 0.08)` : 'transparent'};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  position: relative;

  &:hover {
    color: ${props => props.$active ? colors.primary.accent : '#ffffff'};
    background: ${props => props.$active ? `rgba(${colors.rgb.primary}, 0.08)` : 'rgba(255, 255, 255, 0.03)'};
  }

  &::before {
    content: '';
    display: ${props => props.$active ? 'block' : 'none'};
    position: absolute;
    left: 0;
    top: 25%;
    height: 50%;
    width: 4px;
    background-color: ${colors.primary.default};
    border-radius: 0 4px 4px 0;
  }
`;

export const SidebarBadge = styled.span`
  background: ${colors.primary.default};
  color: white;
  padding: 2px 7px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 800;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(${colors.rgb.primary}, 0.3);
`;

export const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MainLayout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

export const WorkspaceHeader = styled.header`
  padding: 18px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  background: ${colors.neutral.white};
  flex-shrink: 0;

  ${media.desktop} {
    padding: 16px 20px;
  }
`;

export const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  letter-spacing: -0.5px;
  margin: 0;

  ${media.mobileMd} {
    font-size: 20px;
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  ${media.tablet} {
    gap: 8px;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: ${colors.neutral.slate400};

  svg {
    position: absolute;
    left: 12px;
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  padding: 9px 14px 9px 36px;
  border-radius: 10px;
  border: 1px solid ${colors.neutral.slate200};
  outline: none;
  font-size: 13px;
  font-weight: 500;
  width: 220px;
  background-color: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
  transition: all 0.25s ease;

  &:focus {
    border-color: ${colors.primary.default};
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(${colors.rgb.primary}, 0.15);
  }

  ${media.tablet} {
    width: 140px;
  }
  ${media.mobileLg} {
    display: none;
  }
`;

export const RoleQuickSwitch = styled.button`
  background: linear-gradient(135deg, ${colors.primary.default} 0%, ${colors.primary.accent} 100%);
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(${colors.rgb.primary}, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(${colors.rgb.primary}, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.mobileMd} {
    padding: 8px 10px;
    font-size: 11px;
  }
`;

export const MobileToggle = styled.button`
  display: none;
  border: none;
  background: transparent;
  color: ${colors.neutral.slate900};
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;

  ${media.desktop} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SplitWorkspace = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 340px;
  overflow: hidden;
  height: 100%;

  ${media.desktopMd} {
    grid-template-columns: 1fr;
  }
`;

export const MiddleContentScroll = styled.main`
  padding: 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.neutral.slate200};
    border-radius: 4px;
  }

  ${media.tablet} {
    padding: 20px;
  }
`;

export const RightSidebarScroll = styled.aside`
  padding: 32px 24px;
  border-left: 1px solid rgba(15, 23, 42, 0.06);
  background-color: ${colors.neutral.white};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0px;
  }

  ${media.desktopMd} {
    display: none;
  }
`;

export const MainTabBar = styled.div`
  display: flex;
  gap: 24px;
  border-bottom: 2px solid ${colors.neutral.slate100};
  padding-bottom: 4px;
  margin-bottom: 8px;
`;

interface MainTabProps {
  $active: boolean;
}

export const MainTabButton = styled.button<MainTabProps>`
  border: none;
  background: transparent;
  padding: 8px 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${props => props.$active ? colors.primary.default : colors.neutral.slate500};
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.$active ? colors.primary.default : colors.neutral.slate900};
  }

  &::after {
    content: '';
    display: ${props => props.$active ? 'block' : 'none'};
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${colors.primary.default};
    border-radius: 4px;
  }
`;

export const TabControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 4px;
`;

export const ResultsCountText = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  letter-spacing: -0.3px;

  span {
    font-size: 13px;
    font-weight: 500;
    color: ${colors.neutral.slate400};
    margin-left: 6px;
  }
`;

export const SubTabsWrapper = styled.div`
  display: flex;
  background-color: ${colors.neutral.slate100};
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
`;

interface SubTabProps {
  $active: boolean;
}

export const SubTabButton = styled.button<SubTabProps>`
  border: none;
  background: ${props => props.$active ? colors.primary.default : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : colors.neutral.slate600};
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$active ? `0 2px 6px rgba(${colors.rgb.primary}, 0.15)` : 'none'};

  &:hover {
    color: ${props => props.$active ? '#ffffff' : colors.neutral.slate900};
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 28px;

  ${media.desktop} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.mobileLg} {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.04);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.07);
    border-color: rgba(${colors.rgb.primary}, 0.25);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const MetricTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate500};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetricIcon = styled.div<{ $colorType?: 'primary' | 'success' | 'warning' | 'info' }>`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => {
    switch (props.$colorType) {
      case 'success':
        return 'background: #d1fae5; color: #065f46;';
      case 'warning':
        return 'background: #fef3c7; color: #92400e;';
      case 'info':
        return 'background: #e0f2fe; color: #0369a1;';
      case 'primary':
      default:
        return `background: ${colors.primary.light}; color: ${colors.primary.default};`;
    }
  }}
`;

export const MetricValue = styled.h3`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0;
  letter-spacing: -0.5px;
`;

export const MetricSub = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${colors.neutral.slate400};
  margin-top: -4px;
`;

export const DashboardCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
`;

export const DashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.03);
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.06);
    border-color: rgba(${colors.rgb.primary}, 0.2);
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${colors.neutral.slate100};
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardBody = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

export const CardHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTag = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${colors.primary.default};
  background-color: rgba(${colors.rgb.primary}, 0.08);
  padding: 3px 8px;
  border-radius: 20px;
  letter-spacing: 0.3px;
`;

export const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #e2a000;
`;

export const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
  margin: 0;
  line-height: 1.4;
`;

export const CardDoctor = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate500};
  margin: 0;
  font-weight: 500;
`;

export const CardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${colors.neutral.slate400};
  margin-top: 4px;
`;

export const CardPriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px dashed ${colors.neutral.slate100};
`;

export const CardPriceVal = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.primary.default};
`;

export const CardActionBtn = styled.button`
  border: none;
  background-color: ${colors.primary.light};
  color: ${colors.primary.default};
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.primary.default};
    color: white;
  }
`;

export const HorizontalBanner = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border-radius: 20px;
  padding: 28px 32px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  position: relative;
  overflow: hidden;
  margin-top: 16px;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${colors.rgb.primary},0.15) 0%, rgba(${colors.rgb.primary},0) 70%);
  }

  ${media.mobileMd} {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 2;
`;

export const BannerTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.4px;
`;

export const BannerSubtitle = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate400};
  margin: 0;
  line-height: 1.4;
`;

export const BannerAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  z-index: 2;

  ${media.mobileMd} {
    align-items: flex-start;
    width: 100%;
    margin-top: 10px;
  }
`;

export const BannerMetric = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.primary.default};
`;

export const BannerMetricLabel = styled.span`
  font-size: 11px;
  color: ${colors.neutral.slate400};
  font-weight: 600;
  text-transform: uppercase;
`;

export const PanelTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${colors.neutral.slate50};
  }
`;

export const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.primary.light};
  color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid rgba(29, 78, 216, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  overflow: hidden;
`;

export const MessageSender = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
`;

export const MessageText = styled.p`
  font-size: 12px;
  color: ${colors.neutral.slate500};
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const MessageBadge = styled.span`
  width: 8px;
  height: 8px;
  background-color: ${colors.primary.default};
  border-radius: 50%;
  flex-shrink: 0;
`;

export const MapViewContainer = styled.div`
  border-radius: 16px;
  border: 1px solid ${colors.neutral.slate200};
  height: 220px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  cursor: pointer;
`;

export const MapImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e3f2fd;
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const MapPinMarker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${colors.primary.default};
  filter: drop-shadow(0 2px 8px rgba(${colors.rgb.primary}, 0.4));
  animation: mapBounce 1s infinite alternate;

  @keyframes mapBounce {
    from {
      transform: translate(-50%, -50%) translateY(0);
    }
    to {
      transform: translate(-50%, -50%) translateY(-6px);
    }
  }
`;

export const MapOverlayCard = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  span:first-child {
    font-size: 12px;
    font-weight: 700;
    color: ${colors.neutral.slate900};
  }
  span:last-child {
    font-size: 10px;
    color: ${colors.neutral.slate500};
  }
`;

// Appointments list styling (Patient & Admin)
export const AppointmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AppointmentCard = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(31, 38, 135, 0.015);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.85);
    border-color: rgba(${colors.rgb.primary}, 0.18);
    box-shadow: 0 8px 24px rgba(31, 38, 135, 0.04);
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
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.5px;

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

// Booking component structures
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;

  ${media.mobileLg} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
`;

export const StyledSelect = styled.select`
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 13px;
  font-weight: 500;
  background: ${colors.neutral.slate50};
  outline: none;
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary.default};
    background-color: white;
  }
`;

export const StyledInput = styled.input`
  padding: 11px 14px;
  border-radius: 10px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 13px;
  font-weight: 500;
  background: ${colors.neutral.slate50};
  outline: none;
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary.default};
    background-color: white;
  }
`;

export const SubmitBookingButton = styled.button`
  background: linear-gradient(135deg, ${colors.primary.default} 0%, ${colors.primary.accent} 100%);
  color: ${colors.neutral.white};
  border: none;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  margin-top: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(${colors.rgb.primary}, 0.2);

  &:hover {
    box-shadow: 0 6px 16px rgba(${colors.rgb.primary}, 0.3);
  }
`;

// Health Records Styles
export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-bottom: 10px;
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

// Admin Specific: Appointment management item
export const AdminApptItem = styled.div`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(31, 38, 135, 0.015);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.85);
    border-color: rgba(${colors.rgb.primary}, 0.18);
    box-shadow: 0 8px 24px rgba(31, 38, 135, 0.04);
  }

  ${media.mobileMd} {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const PatientInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PatientMetaText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PatientNameText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
`;

export const PatientSubText = styled.span`
  font-size: 12px;
  color: ${colors.neutral.slate500};
`;

export const AdminActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${media.mobileMd} {
    width: 100%;
    justify-content: flex-end;
  }
`;

interface ActionButtonProps {
  $variant: 'primary' | 'danger' | 'success';
}

export const AdminActionBtn = styled.button<ActionButtonProps>`
  border: none;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `background-color: ${colors.primary.light}; color: ${colors.primary.default}; &:hover { background-color: ${colors.primary.default}; color: white; }`;
      case 'success':
        return 'background-color: #d1fae5; color: #065f46; &:hover { background-color: #059669; color: white; }';
      case 'danger':
        return `background-color: ${colors.emergency.red100}; color: ${colors.emergency.red800}; &:hover { background-color: ${colors.emergency.red700}; color: white; }`;
    }
  }}
`;

export const StyledDashboardCard = styled.div`
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.03);
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.neutral.slate900};
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;
