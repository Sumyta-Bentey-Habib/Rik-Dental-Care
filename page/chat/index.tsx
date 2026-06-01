'use client';

import React from 'react';
import { ChatMessage } from '../../data/dummy-data';
import { ChatWindow } from '../../components/chatWindow';
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
        <ChatPageTitle>AI Consultation Assistant</ChatPageTitle>
        <ChatPageSubtitle>
          Ask questions about symptoms, checkup procedures, or post-operative dental care.
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
