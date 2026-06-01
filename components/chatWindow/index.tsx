'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Send, Bot } from 'lucide-react';
import { ChatMessage } from '../../data/dummy-data';
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

const QUICK_PROMPTS = [
  'I have a toothache, what should I do?',
  'When is my next appointment?',
  'How much does a routine cleaning cost?',
  'Do you accept Apex Dental insurance?'
];

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
          <ChatHeaderTitle>AI Dental Assistant</ChatHeaderTitle>
          <ChatHeaderStatus>
            <StatusDot />
            Online & Ready to Help
          </ChatHeaderStatus>
        </ChatHeaderInfo>
        <ResetChatButton onClick={onClearChat}>Clear History</ResetChatButton>
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
                  {isAI ? 'Rik Bot' : 'You'} • {formatTime(new Date(msg.timestamp))}
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
          {QUICK_PROMPTS.map((prompt, idx) => (
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
            placeholder={isLoading ? 'Rik Bot is thinking...' : 'Type your message here...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={!inputText.trim() || isLoading}>
            <Send size={18} />
          </SendButton>
        </ChatInputForm>
      </ChatInputArea>
    </ChatContainer>
  );
};

export default ChatWindow;
