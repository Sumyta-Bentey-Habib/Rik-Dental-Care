import styled from 'styled-components';

interface SidebarProps {
  $isCollapsed: boolean;
}

export const SidebarWrapper = styled.aside<SidebarProps>`
  width: ${(props) => (props.$isCollapsed ? '80px' : '260px')};
  height: calc(100vh - 72px);
  position: sticky;
  top: 72px;
  background: #ffffff;
  border-right: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  z-index: 50;

  @media (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 72px);
    width: ${(props) => (props.$isCollapsed ? '0px' : '260px')};
    border-right: ${(props) => (props.$isCollapsed ? 'none' : '1px solid rgba(226, 232, 240, 0.8)')};
  }
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 24px 16px;
  position: relative;
`;

export const CollapseToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: -12px;
  width: 24px;
  height: 24px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    color: #1d4ed8;
    background: #f8fafc;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    right: 16px;
    top: auto;
    bottom: 24px;
  }
`;

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

interface NavItemProps {
  $active: boolean;
}

export const NavItemButton = styled.button<NavItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: ${(props) => (props.$active ? 'rgba(29, 78, 216, 0.08)' : 'transparent')};
  color: ${(props) => (props.$active ? '#1d4ed8' : '#64748b')};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #1d4ed8;
    background: ${(props) => (props.$active ? 'rgba(29, 78, 216, 0.08)' : 'rgba(241, 245, 249, 0.8)')};
  }
`;

export const NavIconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
`;

export const NavText = styled.span<SidebarProps>`
  opacity: ${(props) => (props.$isCollapsed ? 0 : 1)};
  transition: opacity 0.2s ease;
  font-size: 14px;
  font-weight: 600;
`;

export const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UserSummary = styled.div<SidebarProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 8px;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
  margin-top: 16px;
  overflow: hidden;
  justify-content: ${(props) => (props.$isCollapsed ? 'center' : 'flex-start')};
`;

export const UserInitialCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #eff6ff;
  color: #1d4ed8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(29, 78, 216, 0.15);
  flex-shrink: 0;
`;

export const UserSummaryMeta = styled.div<SidebarProps>`
  display: ${(props) => (props.$isCollapsed ? 'none' : 'flex')};
  flex-direction: column;
  overflow: hidden;
`;

export const UserSummaryName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const UserSummaryEmail = styled.span`
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
