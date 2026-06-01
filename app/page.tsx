'use client';

import React, { useState } from 'react';
import { User } from '../data/dummy-data';
import { useChat } from '../hooks/useChat';
import { useAppointments } from '../hooks/useAppointments';

// Layout components
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

// Page components
import { Home } from '../page/home';
import { Auth } from '../page/auth';
import { Dashboard } from '../page/dashboard';
import { Chat } from '../page/chat';

// Styles
import { PageContainer, AppBodyLayout, ContentWrapper } from './style';

type ViewState = 'home' | 'auth' | 'dashboard' | 'chat';

export default function AppEntry() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [user, setUser] = useState<User | null>(null);

  // Hook states
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const {
    filteredAppointments,
    filter,
    setFilter,
    cancelAppointment,
    addAppointment
  } = useAppointments();

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
  };

  const showSidebar = user !== null && (currentView === 'dashboard' || currentView === 'chat');

  const renderActivePage = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home
            onNavigateToAuth={() => setCurrentView('auth')}
            onNavigateToChat={() => setCurrentView('chat')}
            isLoggedIn={user !== null}
          />
        );
      case 'auth':
        return <Auth onLoginSuccess={handleLoginSuccess} />;
      case 'dashboard':
        if (!user) {
          setCurrentView('auth');
          return null;
        }
        return (
          <Dashboard
            user={user}
            appointments={filteredAppointments}
            filter={filter}
            setFilter={setFilter}
            onCancelAppointment={cancelAppointment}
            onAddAppointment={addAppointment}
            onNavigateToChat={() => setCurrentView('chat')}
          />
        );
      case 'chat':
        if (!user) {
          setCurrentView('auth');
          return null;
        }
        return (
          <Chat
            messages={messages}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            onClearChat={clearChat}
          />
        );
      default:
        return <Home onNavigateToAuth={() => setCurrentView('auth')} onNavigateToChat={() => setCurrentView('chat')} isLoggedIn={user !== null} />;
    }
  };

  return (
    <PageContainer>
      <Navbar
        currentView={currentView}
        onViewChange={(view) => {
          // Prevent navigating to dashboard/chat if not logged in
          if (!user && (view === 'dashboard' || view === 'chat')) {
            setCurrentView('auth');
          } else {
            setCurrentView(view);
          }
        }}
        user={user}
        onLogout={handleLogout}
      />

      <AppBodyLayout>
        {showSidebar && (
          <Sidebar
            currentView={currentView}
            onViewChange={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
        )}
        <ContentWrapper>{renderActivePage()}</ContentWrapper>
      </AppBodyLayout>
    </PageContainer>
  );
}
