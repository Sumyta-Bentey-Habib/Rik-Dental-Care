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
import { About } from '../page/about';
import { Specialists } from '../page/specialists';
import { Emergency } from '../page/emergency';

// Styles
import { PageContainer, AppBodyLayout, ContentWrapper } from './style';

type ViewState = 'home' | 'auth' | 'dashboard' | 'chat' | 'about' | 'specialists' | 'emergency';

export default function AppEntry() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
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
            onNavigateToAuth={(mode = 'register') => {
              setAuthMode(mode);
              setCurrentView('auth');
            }}
            onNavigateToChat={() => setCurrentView('chat')}
            isLoggedIn={user !== null}
          />
        );
      case 'auth':
        return (
          <Auth
            onLoginSuccess={handleLoginSuccess}
            onBack={() => setCurrentView('home')}
            initialMode={authMode}
          />
        );
      case 'about':
        return <About />;
      case 'specialists':
        return (
          <Specialists
            onNavigateToAuth={() => {
              setAuthMode('register');
              setCurrentView('auth');
            }}
            onNavigateToDashboard={() => setCurrentView('dashboard')}
            isLoggedIn={user !== null}
          />
        );
      case 'emergency':
        return <Emergency />;
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
      {currentView !== 'auth' && (
        <Navbar
          currentView={currentView}
          onViewChange={(view, mode = 'login') => {
            // Prevent navigating to dashboard/chat if not logged in
            if (!user && (view === 'dashboard' || view === 'chat')) {
              setAuthMode('login');
              setCurrentView('auth');
            } else {
              if (view === 'auth') {
                setAuthMode(mode);
              }
              setCurrentView(view);
            }
          }}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <AppBodyLayout>
        {showSidebar && (
          <Sidebar
            currentView={currentView}
            onViewChange={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
        )}
        <ContentWrapper style={currentView === 'auth' ? { height: '100vh' } : {}}>
          {renderActivePage()}
        </ContentWrapper>
      </AppBodyLayout>
    </PageContainer>
  );
}
