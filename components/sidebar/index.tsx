'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Home,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { User } from '../../data/dummy-data';
import {
  SidebarWrapper,
  SidebarContainer,
  CollapseToggleButton,
  SidebarNav,
  NavItemButton,
  NavIconWrapper,
  NavText,
  SidebarFooter,
  UserSummary,
  UserInitialCircle,
  UserSummaryMeta,
  UserSummaryName,
  UserSummaryEmail
} from './style';

interface SidebarProps {
  currentView: 'home' | 'auth' | 'dashboard' | 'chat';
  onViewChange: (view: 'home' | 'auth' | 'dashboard' | 'chat') => void;
  user: User | null;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  user,
  onLogout
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarWrapper $isCollapsed={isCollapsed}>
      <SidebarContainer>
        <CollapseToggleButton onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </CollapseToggleButton>

        <SidebarNav>
          <NavItemButton
            $active={currentView === 'dashboard'}
            onClick={() => onViewChange('dashboard')}
          >
            <NavIconWrapper>
              <LayoutDashboard size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>Dashboard</NavText>
          </NavItemButton>

          <NavItemButton
            $active={currentView === 'chat'}
            onClick={() => onViewChange('chat')}
          >
            <NavIconWrapper>
              <MessageSquare size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>AI Assistant</NavText>
          </NavItemButton>

          <NavItemButton
            $active={currentView === 'home'}
            onClick={() => onViewChange('home')}
          >
            <NavIconWrapper>
              <Home size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>Landing Page</NavText>
          </NavItemButton>
        </SidebarNav>

        <SidebarFooter>
          <NavItemButton $active={false} onClick={onLogout}>
            <NavIconWrapper>
              <LogOut size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>Log Out</NavText>
          </NavItemButton>

          {user && (
            <UserSummary $isCollapsed={isCollapsed}>
              <UserInitialCircle>{user.avatar}</UserInitialCircle>
              <UserSummaryMeta $isCollapsed={isCollapsed}>
                <UserSummaryName>{user.name}</UserSummaryName>
                <UserSummaryEmail>{user.email}</UserSummaryEmail>
              </UserSummaryMeta>
            </UserSummary>
          )}
        </SidebarFooter>
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;
