'use client';

import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '../../utils/routes';
import { USER_SESSION_KEY, SIDEBAR_TEXT } from '../../utils/constants';
import {
  CollapseToggleButton,
  NavIconWrapper,
  NavItemButton,
  NavText,
  SidebarContainer,
  SidebarFooter,
  SidebarNav,
  SidebarWrapper,
  UserInitialCircle,
  UserSummary,
  UserSummaryEmail,
  UserSummaryMeta,
  UserSummaryName
} from './style';

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(USER_SESSION_KEY);
    setUser(stored ? JSON.parse(stored) : null);
  }, [pathname]);

  // Only show sidebar on dashboard and chat routes when logged in
  const showSidebar = user && (pathname === ROUTES.DASHBOARD || pathname === ROUTES.CHAT);
  if (showSidebar || !showSidebar) return null; // Hide global sidebar in favor of new fullscreen layout

  const handleLogout = () => {
    sessionStorage.removeItem(USER_SESSION_KEY);
    setUser(null);
    router.push(ROUTES.HOME);
  };

  return (
    <SidebarWrapper $isCollapsed={isCollapsed}>
      <SidebarContainer>
        <CollapseToggleButton onClick={() => setIsCollapsed((p) => !p)}>
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </CollapseToggleButton>

        <SidebarNav>
          <NavItemButton
            $active={pathname === ROUTES.DASHBOARD}
            onClick={() => router.push(ROUTES.DASHBOARD)}
          >
            <NavIconWrapper>
              <LayoutDashboard size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>{SIDEBAR_TEXT.dashboard}</NavText>
          </NavItemButton>

          <NavItemButton
            $active={pathname === ROUTES.CHAT}
            onClick={() => router.push(ROUTES.CHAT)}
          >
            <NavIconWrapper>
              <MessageSquare size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>{SIDEBAR_TEXT.aiAssistant}</NavText>
          </NavItemButton>


        </SidebarNav>

        <SidebarFooter>
          <NavItemButton $active={false} onClick={handleLogout}>
            <NavIconWrapper>
              <LogOut size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>{SIDEBAR_TEXT.logOut}</NavText>
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
