'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Chat } from '@/features/chat';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/context';

export default function ChatPage() {
  const router = useRouter();
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated && !sessionStorage.getItem('user')) {
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthLoading, isAuthenticated, router]);

  return (
    <Chat
      messages={messages}
      isLoading={isLoading}
      onSendMessage={sendMessage}
      onClearChat={clearChat}
    />
  );
}
