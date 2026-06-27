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
    const stored = sessionStorage.getItem('user');
    setUser(stored ? JSON.parse(stored) : null);
  }, [pathname]);

  // Only show sidebar on dashboard and chat routes when logged in
  const showSidebar = user && (pathname === ROUTES.DASHBOARD || pathname === ROUTES.CHAT);
  if (!showSidebar) return null;

  const handleLogout = () => {
    sessionStorage.removeItem('user');
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
            <NavText $isCollapsed={isCollapsed}>Dashboard</NavText>
          </NavItemButton>

          <NavItemButton
            $active={pathname === ROUTES.CHAT}
            onClick={() => router.push(ROUTES.CHAT)}
          >
            <NavIconWrapper>
              <MessageSquare size={20} />
            </NavIconWrapper>
            <NavText $isCollapsed={isCollapsed}>AI Assistant</NavText>
          </NavItemButton>


        </SidebarNav>

        <SidebarFooter>
          <NavItemButton $active={false} onClick={handleLogout}>
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
