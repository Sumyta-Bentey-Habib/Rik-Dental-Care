'use client';

import React from 'react';
import { ChatMessage } from '@/types';
import { ChatWindow } from '@/components/chatWindow';
import { CHAT_TEXT } from '@/constants/constants';
import {
  ChatPageWrapper,
  ChatPageHeader,
  ChatPageTitle,
  ChatPageSubtitle,
  ChatWindowContainer
} from './style';

interface ChatProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
}

export const Chat: React.FC<ChatProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onClearChat
}) => {
  return (
    <ChatPageWrapper>
      <ChatPageHeader>
        <ChatPageTitle>{CHAT_TEXT.pageTitle}</ChatPageTitle>
        <ChatPageSubtitle>
          {CHAT_TEXT.pageSubtitle}
        </ChatPageSubtitle>
      </ChatPageHeader>

      <ChatWindowContainer>
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={onSendMessage}
          onClearChat={onClearChat}
        />
      </ChatWindowContainer>
    </ChatPageWrapper>
  );
};

export default Chat;
