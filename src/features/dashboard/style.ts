import styled, { keyframes } from 'styled-components';
import { colors } from '@/constants/colors';
import { media, breakpoints } from '@/constants/breakpoints';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const modalScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${colors.neutral.slate50};
  font-family: inherit;
  position: relative;
`;

// ==========================================
// 1. MOBILE BACKDROP & SIDEBAR
// ==========================================
interface SidebarBackdropProps {
  $isOpen?: boolean;
}

export const SidebarBackdrop = styled.div<SidebarBackdropProps>`
  display: none;

  @media (max-width: ${breakpoints.desktop}) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(${colors.rgb.slate900}, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 95;
  }
`;

interface SidebarProps {
  $isOpen?: boolean;
}

export const SidebarContainer = styled.aside<SidebarProps>`
  width: 270px;
  background-color: ${colors.primary.dark};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.28s ease, width 0.28s ease;
  flex-shrink: 0;
  z-index: 100;
  height: 100%;

  @media (max-width: ${breakpoints.desktop}) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.$isOpen ? '0 0 30px rgba(0, 0, 0, 0.3)' : 'none'};
  }
`;

export const SidebarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 20px 20px;
  color: ${colors.primary.default};

  h2 {
    font-size: 19px;
    font-weight: 800;
    color: ${colors.neutral.white};
    margin: 0;
    letter-spacing: -0.4px;

    span {
      color: ${colors.secondary.surface};
    }
  }

  .mobile-close-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 4px;
    display: none;
    border-radius: 6px;

    &:hover {
      color: ${colors.neutral.white};
    }

    @media (max-width: ${breakpoints.desktop}) {
      display: flex;
    }
  }
`;

export const SidebarProfile = styled.div`
  padding: 16px 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

export const SidebarAvatar = styled.div`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px solid ${colors.secondary.surface};
  background-color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: ${colors.neutral.white};
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 14px rgba(${colors.rgb.primary}, 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SidebarName = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.neutral.white};
  margin: 0;
  letter-spacing: -0.2px;
`;

export const SidebarRole = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.secondary.surface};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 10px;
  border-radius: 9999px;
`;

export const SidebarNav = styled.nav`
  padding: 20px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

interface NavItemProps {
  $active: boolean;
}

export const SidebarNavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: ${props => props.$active ? `linear-gradient(90deg, rgba(${colors.rgb.primary}, 0.35) 0%, rgba(${colors.rgb.primary}, 0.15) 100%)` : 'transparent'};
  color: ${props => props.$active ? colors.secondary.surface : 'rgba(255, 255, 255, 0.75)'};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;

  ${props => props.$active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      height: 60%;
      width: 4px;
      border-radius: 0 4px 4px 0;
      background-color: ${colors.secondary.surface};
    }
  `}

  &:hover {
    color: ${colors.neutral.white};
    background: rgba(255, 255, 255, 0.08);
  }

  &:focus-visible {
    outline: 2px solid ${colors.secondary.surface};
    outline-offset: 1px;
  }

  svg {
    flex-shrink: 0;
    color: ${props => props.$active ? colors.secondary.surface : 'rgba(255, 255, 255, 0.65)'};
  }
`;

export const SidebarBadge = styled.span`
  margin-left: auto;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 9999px;
  background-color: ${colors.primary.default};
  color: ${colors.neutral.white};
`;

export const SidebarFooter = styled.div`
  padding: 16px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

// ==========================================
// 2. MAIN WORKSPACE & TOP BAR
// ==========================================
export const MainLayout = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: ${colors.neutral.slate50};
`;

export const WorkspaceHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  background: ${colors.neutral.white};
  border-bottom: 1px solid ${colors.neutral.slate200};
  gap: 16px;
  flex-shrink: 0;
  z-index: 10;

  ${media.mobile} {
    padding: 14px 18px;
  }
`;

export const HeaderTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 800;
  color: ${colors.headings};
  letter-spacing: -0.5px;
  margin: 0;

  ${media.mobile} {
    font-size: 17px;
  }
`;

export const HeaderSubtitle = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 14px;
    color: ${colors.neutral.slate400};
    pointer-events: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

export const SearchInput = styled.input`
  padding: 9px 14px 9px 38px;
  border-radius: 10px;
  border: 1px solid ${colors.neutral.slate200};
  font-size: 13px;
  background: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
  outline: none;
  width: 220px;
  transition: all 0.2s ease;

  &:focus {
    width: 260px;
    border-color: ${colors.primary.default};
    background: ${colors.neutral.white};
    box-shadow: 0 0 0 3px rgba(${colors.rgb.primary}, 0.12);
  }

  &::placeholder {
    color: ${colors.neutral.slate400};
  }
`;

export const QuickBookBtn = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(${colors.rgb.primary}, 0.2);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${colors.primary.hover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(${colors.rgb.primary}, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
  }

  ${media.mobile} {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

export const MobileToggle = styled.button`
  background: none;
  border: none;
  color: ${colors.neutral.slate700};
  cursor: pointer;
  display: none;
  padding: 6px;
  border-radius: 8px;
  margin-right: 8px;

  @media (max-width: ${breakpoints.desktop}) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background: ${colors.neutral.slate100};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
  }
`;

// ==========================================
// 3. WORKSPACE SPLIT (CONTENT + ASIDE)
// ==========================================
export const SplitWorkspace = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 73px);

  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
  }
`;

export const MiddleContentScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px 64px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.25s ease-out;

  ${media.mobile} {
    padding: 18px 16px 48px;
    gap: 20px;
  }
`;

export const RightSidebarScroll = styled.aside`
  width: 330px;
  background: ${colors.neutral.white};
  border-left: 1px solid ${colors.neutral.slate200};
  overflow-y: auto;
  padding: 28px 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;

// ==========================================
// 4. HERO UPCOMING APPOINTMENT CARD
// ==========================================
export const HeroUpcomingCard = styled.div`
  background: linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.default} 100%);
  border-radius: 20px;
  padding: 28px 32px;
  color: ${colors.neutral.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  box-shadow: 0 10px 24px rgba(${colors.rgb.primary}, 0.2);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    right: -40px;
    top: -40px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
  }
`;

export const HeroUpcomingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 620px;
  position: relative;
  z-index: 2;
`;

export const HeroUpcomingBadge = styled.span`
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${colors.secondary.surface};
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  letter-spacing: 0.8px;
  width: fit-content;
`;

export const HeroUpcomingTitle = styled.h2`
  font-size: 22px;
  font-weight: 800;
  color: ${colors.neutral.white};
  margin: 0;
  letter-spacing: -0.4px;
`;

export const HeroUpcomingDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

export const HeroUpcomingItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);

  svg {
    color: ${colors.secondary.surface};
    flex-shrink: 0;
  }
`;

export const HeroUpcomingActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 2;

  ${media.tablet} {
    width: 100%;
    justify-content: flex-start;
  }
`;

// ==========================================
// 5. METRICS GRID & CARDS
// ==========================================
export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  &:hover {
    transform: translateY(-2px);
    border-color: ${colors.secondary.surfaceBorder};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MetricTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate600};
`;

interface MetricIconProps {
  $colorType: 'primary' | 'success' | 'warning' | 'info';
}

export const MetricIcon = styled.div<MetricIconProps>`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => {
    switch (props.$colorType) {
      case 'success':
        return `background: ${colors.status.successSurface}; color: ${colors.status.successText};`;
      case 'warning':
        return `background: ${colors.status.warningSurface}; color: ${colors.status.warningText};`;
      case 'info':
        return `background: ${colors.secondary.surface}; color: ${colors.secondary.text};`;
      case 'primary':
      default:
        return `background: ${colors.primary.light}; color: ${colors.primary.default};`;
    }
  }}
`;

export const MetricValue = styled.h3`
  font-size: 22px;
  font-weight: 800;
  color: ${colors.headings};
  margin: 0;
  letter-spacing: -0.4px;
`;

export const MetricSub = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.neutral.slate500};
`;

// ==========================================
// 6. APPOINTMENTS TABLE & CARDS
// ==========================================
export const TableWrapper = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

export const TableHeaderBar = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${colors.neutral.slate200};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const TableTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${colors.primary.default};
  }
`;

export const FilterTabGroup = styled.div`
  display: flex;
  background: ${colors.neutral.slate100};
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
`;

interface FilterTabItemProps {
  $active: boolean;
}

export const FilterTabItem = styled.button<FilterTabItemProps>`
  background: ${props => props.$active ? colors.neutral.white : 'transparent'};
  color: ${props => props.$active ? colors.primary.default : colors.neutral.slate600};
  border: none;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: ${props => props.$active ? '0 2px 6px rgba(0, 0, 0, 0.04)' : 'none'};

  &:hover {
    color: ${colors.primary.default};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
  }
`;

export const FilterCountBadge = styled.span`
  background: ${colors.neutral.slate200};
  color: ${colors.neutral.slate700};
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 9999px;
`;

export const ResponsiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  ${media.mobile} {
    display: none;
  }
`;

export const TableHead = styled.thead`
  background: ${colors.neutral.slate50};
  border-bottom: 1px solid ${colors.neutral.slate200};
`;

export const TableHeaderCell = styled.th`
  padding: 14px 20px;
  font-size: 12px;
  font-weight: 700;
  color: ${colors.neutral.slate600};
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.neutral.slate100};
  transition: background 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${colors.neutral.slate50};
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 13px;
  color: ${colors.neutral.slate800};
  vertical-align: middle;
`;

// Mobile Card List alternative for small screens
export const MobileCardsList = styled.div`
  display: none;
  flex-direction: column;
  gap: 12px;
  padding: 16px;

  ${media.mobile} {
    display: flex;
  }
`;

export const MobileAppointmentCard = styled.div`
  background: ${colors.neutral.slate50};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// ==========================================
// 7. STANDARDIZED STATUS BADGES & BUTTONS
// ==========================================
interface StatusBadgeProps {
  $status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 9999px;
  letter-spacing: 0.3px;
  text-transform: capitalize;
  width: fit-content;

  ${props => {
    switch (props.$status) {
      case 'confirmed':
        return `
          background: ${colors.status.successSurface};
          color: ${colors.status.successText};
          border: 1px solid ${colors.status.successBorder};
        `;
      case 'pending':
        return `
          background: ${colors.status.warningSurface};
          color: ${colors.status.warningText};
          border: 1px solid ${colors.status.warningBorder};
        `;
      case 'completed':
        return `
          background: ${colors.neutral.slate100};
          color: ${colors.neutral.slate600};
          border: 1px solid ${colors.neutral.slate200};
        `;
      case 'cancelled':
        return `
          background: ${colors.status.errorSurface};
          color: ${colors.status.errorText};
          border: 1px solid ${colors.status.errorBorder};
        `;
      default:
        return `
          background: ${colors.neutral.slate100};
          color: ${colors.neutral.slate600};
          border: 1px solid ${colors.neutral.slate200};
        `;
    }
  }}

  svg {
    flex-shrink: 0;
  }
`;

interface ActionBtnProps {
  $variant?: 'primary' | 'danger' | 'secondary';
}

export const ActionBtn = styled.button<ActionBtnProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;

  ${props => {
    switch (props.$variant) {
      case 'danger':
        return `
          background: ${colors.status.errorSurface};
          color: ${colors.status.errorText};
          border-color: ${colors.status.errorBorder};
          &:hover {
            background: ${colors.status.error};
            color: ${colors.neutral.white};
          }
        `;
      case 'secondary':
        return `
          background: ${colors.neutral.white};
          color: ${colors.neutral.slate700};
          border-color: ${colors.neutral.slate200};
          &:hover {
            background: ${colors.neutral.slate100};
            border-color: ${colors.neutral.slate300};
          }
        `;
      case 'primary':
      default:
        return `
          background: ${colors.primary.default};
          color: ${colors.neutral.white};
          &:hover {
            background: ${colors.primary.hover};
          }
        `;
    }
  }}

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 1px;
  }
`;

// ==========================================
// 8. EMPTY STATES & CONFIRMATION MODALS
// ==========================================
export const EmptyStateContainer = styled.div`
  padding: 48px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const EmptyStateIconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${colors.secondary.surfaceLight};
  color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

export const EmptyStateTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
`;

export const EmptyStateDesc = styled.p`
  font-size: 13px;
  color: ${colors.neutral.slate500};
  max-width: 360px;
  margin: 0;
  line-height: 1.5;
`;

// Modal Components
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(${colors.rgb.slate900}, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContainer = styled.div`
  background: ${colors.neutral.white};
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.16);
  border: 1px solid ${colors.neutral.slate200};
  animation: ${modalScale} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${colors.neutral.slate200};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: ${colors.headings};
  margin: 0;
  letter-spacing: -0.3px;
`;

export const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: ${colors.neutral.slate400};
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;

  &:hover {
    color: ${colors.neutral.slate700};
    background: ${colors.neutral.slate100};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 14px;
  color: ${colors.neutral.slate600};
  line-height: 1.5;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${colors.neutral.slate200};
  background: ${colors.neutral.slate50};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

// ==========================================
// 9. DASHBOARD CARDS & BANNER
// ==========================================
export const DashboardCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

export const DashboardCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${colors.secondary.surfaceBorder};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 140px;
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
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background-color: ${colors.secondary.surfaceLight};
  border: 1px solid ${colors.secondary.surfaceBorder};
  padding: 3px 8px;
  border-radius: 9999px;
  letter-spacing: 0.4px;
`;

export const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: ${colors.status.warningText};

  svg {
    color: ${colors.status.warning};
  }
`;

export const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
`;

export const CardDoctor = styled.p`
  font-size: 12px;
  color: ${colors.neutral.slate500};
  margin: 0;
`;

export const CardLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: ${colors.neutral.slate400};
`;

export const CardPriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid ${colors.neutral.slate100};
`;

export const CardPriceVal = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: ${colors.primary.default};
`;

export const CardActionBtn = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.primary.hover};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 1px;
  }
`;

export const HorizontalBanner = styled.div`
  background: linear-gradient(135deg, ${colors.primary.dark} 0%, ${colors.primary.default} 100%);
  border-radius: 18px;
  padding: 24px 28px;
  color: ${colors.neutral.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 6px 20px rgba(${colors.rgb.primary}, 0.16);

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BannerTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  margin: 0;
`;

export const BannerSubtitle = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.5;
`;

export const BannerAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${media.tablet} {
    align-items: flex-start;
  }
`;

export const BannerMetric = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: ${colors.secondary.surface};
`;

export const BannerMetricLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
`;

// ==========================================
// 10. RIGHT SIDEBAR WIDGETS
// ==========================================
export const PanelTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0 0 14px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MessageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${colors.neutral.slate50};
  }
`;

export const MessageAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.primary.light};
  color: ${colors.primary.default};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

export const MessageSender = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${colors.headings};
`;

export const MessageText = styled.span`
  font-size: 12px;
  color: ${colors.neutral.slate500};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MessageBadge = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${colors.primary.default};
  flex-shrink: 0;
`;

export const MapViewContainer = styled.div`
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${colors.neutral.slate200};
  position: relative;
  height: 180px;
`;

export const MapOverlayCard = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    font-size: 12px;
    font-weight: 700;
    color: ${colors.headings};
  }

  span:last-child {
    font-size: 11px;
    color: ${colors.neutral.slate500};
  }
`;

// ==========================================
// 11. FORM & RECORDS CARD
// ==========================================
export const StyledDashboardCard = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 18px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${media.mobile} {
    padding: 20px 16px;
  }
`;

export const StyledCardTitle = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: ${colors.headings};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${colors.primary.default};
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 700;
    color: ${colors.neutral.slate700};
  }
`;

export const StyledSelect = styled.select`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${colors.neutral.slate200};
  font-size: 13px;
  font-weight: 500;
  background: ${colors.neutral.white};
  outline: none;
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;
  min-height: 44px;

  &:focus {
    border-color: ${colors.primary.default};
    box-shadow: 0 0 0 3px rgba(${colors.rgb.primary}, 0.12);
  }
`;

export const StyledInput = styled.input`
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid ${colors.neutral.slate200};
  font-size: 13px;
  font-weight: 500;
  background: ${colors.neutral.white};
  outline: none;
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;
  min-height: 44px;

  &:focus {
    border-color: ${colors.primary.default};
    box-shadow: 0 0 0 3px rgba(${colors.rgb.primary}, 0.12);
  }

  &:disabled {
    background: ${colors.neutral.slate100};
    color: ${colors.neutral.slate500};
  }
`;

export const SubmitBookingButton = styled.button`
  background: ${colors.primary.default};
  color: ${colors.neutral.white};
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(${colors.rgb.primary}, 0.22);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 8px;

  &:hover {
    background: ${colors.primary.hover};
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(${colors.rgb.primary}, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 2px;
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
  padding: 10px 0;
  border-bottom: 1px dashed ${colors.neutral.slate200};
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 4px;
  }
`;

export const InfoLabel = styled.span`
  color: ${colors.neutral.slate500};
  font-weight: 600;
`;

export const InfoValue = styled.span`
  color: ${colors.headings};
  font-weight: 700;
`;

// ==========================================
// 12. ADMIN QUEUE STYLES
// ==========================================
export const AdminApptItem = styled.div`
  background: ${colors.neutral.white};
  border: 1px solid ${colors.neutral.slate200};
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${colors.secondary.surfaceBorder};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }

  ${media.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PatientInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const PatientMetaText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PatientNameText = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.headings};
`;

export const PatientSubText = styled.span`
  font-size: 12px;
  color: ${colors.neutral.slate600};
`;

export const AdminActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

interface AdminActionBtnProps {
  $variant: 'primary' | 'success' | 'danger';
}

export const AdminActionBtn = styled.button<AdminActionBtnProps>`
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  ${props => {
    switch (props.$variant) {
      case 'primary':
        return `
          background-color: ${colors.primary.light};
          color: ${colors.primary.default};
          &:hover {
            background-color: ${colors.primary.default};
            color: ${colors.neutral.white};
          }
        `;
      case 'success':
        return `
          background-color: ${colors.status.successSurface};
          color: ${colors.status.successText};
          &:hover {
            background-color: ${colors.status.success};
            color: ${colors.neutral.white};
          }
        `;
      case 'danger':
        return `
          background-color: ${colors.status.errorSurface};
          color: ${colors.status.errorText};
          &:hover {
            background-color: ${colors.status.error};
            color: ${colors.neutral.white};
          }
        `;
    }
  }}

  &:focus-visible {
    outline: 2px solid ${colors.primary.default};
    outline-offset: 1px;
  }
`;

export const ClinicMapSvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.neutral.slate100};
  display: block;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  .map-grid-stroke {
    stroke: ${colors.neutral.slate200};
  }
  .map-river {
    fill: ${colors.secondary.surface};
    opacity: 0.7;
  }
  .map-river-text {
    fill: ${colors.primary.default};
  }
  .map-park {
    fill: ${colors.status.successSurface};
    opacity: 0.7;
  }
  .map-park-text {
    fill: ${colors.status.successText};
  }
  .map-street-base {
    stroke: ${colors.neutral.white};
  }
  .map-street-dash {
    stroke: ${colors.neutral.slate300};
  }
  .map-street-label {
    fill: ${colors.neutral.slate400};
  }
  .map-building {
    fill: ${colors.neutral.slate300};
    opacity: 0.8;
  }
  .map-pin-pulse {
    fill: rgba(${colors.rgb.primary}, 0.25);
  }
  .map-pin-center {
    fill: ${colors.primary.default};
    stroke: ${colors.neutral.white};
  }
`;

interface ProgressBarProps {
  $width: string;
  $color?: string;
}

export const ProgressTrack = styled.div`
  height: 10px;
  background: ${colors.neutral.slate100};
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${props => props.$width};
  background-color: ${props => props.$color || colors.primary.default};
  border-radius: 6px;
  transition: width 0.3s ease;
`;

export const ProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  color: ${colors.neutral.slate700};
  margin-bottom: 6px;
`;

export const NotificationCheckGroup = styled.div`
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: ${colors.neutral.slate700};
  margin-top: 4px;

  label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    font-weight: 500;
  }
`;

export const DiagnosesList = styled.ul`
  padding-left: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: ${colors.neutral.slate700};

  strong {
    color: ${colors.headings};
  }
`;

