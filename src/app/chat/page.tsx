'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Chat } from '@/features/chat';
import { ROUTES } from '@/constants/routes';

export default function ChatPage() {
  const router = useRouter();
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (!stored) {
      router.replace(ROUTES.LOGIN);
    }
  }, [router]);

  return (
    <Chat
      messages={messages}
      isLoading={isLoading}
      onSendMessage={sendMessage}
      onClearChat={clearChat}
    />
  );
}
