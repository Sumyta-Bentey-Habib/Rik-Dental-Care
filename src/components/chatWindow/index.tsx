'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from '@/types';
import { CHAT_QUICK_PROMPTS, CHAT_TEXT } from '@/constants/constants';
import {
  ChatContainer,
  ChatHeader,
  ChatHeaderInfo,
  ChatHeaderTitle,
  ChatHeaderStatus,
  StatusDot,
  ResetChatButton,
  ChatHistoryScroll,
  MessageRow,
  MessageContent,
  MessageBubble,
  MessageMeta,
  TypingIndicator,
  TypingDot,
  ChatInputArea,
  QuickPromptsContainer,
  QuickPromptButton,
  ChatInputForm,
  ChatTextField,
  SendButton
} from './style';

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onSendMessage,
  onClearChat
}) => {
  const [inputText, setInputText] = useState('');
  const historyEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isLoading) return;
    onSendMessage(prompt);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatHeaderInfo>
          <ChatHeaderTitle>{CHAT_TEXT.windowTitle}</ChatHeaderTitle>
          <ChatHeaderStatus>
            <StatusDot />
            {CHAT_TEXT.onlineStatus}
          </ChatHeaderStatus>
        </ChatHeaderInfo>
        <ResetChatButton onClick={onClearChat}>{CHAT_TEXT.clearHistory}</ResetChatButton>
      </ChatHeader>

      <ChatHistoryScroll>
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <MessageRow key={msg.id} $isAI={isAI}>
              <MessageContent>
                <MessageBubble $isAI={isAI}>
                  {msg.text}
                </MessageBubble>
                <MessageMeta $isAI={isAI}>
                  {isAI ? CHAT_TEXT.botName : CHAT_TEXT.userName} • {formatTime(new Date(msg.timestamp))}
                </MessageMeta>
              </MessageContent>
            </MessageRow>
          );
        })}

        {isLoading && (
          <MessageRow $isAI={true}>
            <MessageContent>
              <TypingIndicator>
                <TypingDot $delay="0s" />
                <TypingDot $delay="0.2s" />
                <TypingDot $delay="0.4s" />
              </TypingIndicator>
            </MessageContent>
          </MessageRow>
        )}
        <div ref={historyEndRef} />
      </ChatHistoryScroll>

      <ChatInputArea>
        <QuickPromptsContainer>
          {CHAT_QUICK_PROMPTS.map((prompt, idx) => (
            <QuickPromptButton
              key={idx}
              type="button"
              onClick={() => handleQuickPrompt(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </QuickPromptButton>
          ))}
        </QuickPromptsContainer>

        <ChatInputForm onSubmit={handleSubmit}>
          <ChatTextField
            type="text"
            aria-label={CHAT_TEXT.placeholder}
            placeholder={isLoading ? CHAT_TEXT.thinking : CHAT_TEXT.placeholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={!inputText.trim() || isLoading} aria-label="Send message">
            <Send size={18} />
          </SendButton>
        </ChatInputForm>
      </ChatInputArea>
    </ChatContainer>
  );
};

export default ChatWindow;
