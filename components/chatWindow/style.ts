import styled, { keyframes } from 'styled-components';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(248, 250, 252, 0.6);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

export const ChatHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatHeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const ChatHeaderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
`;

const pulse = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.6;
  }
`;

export const StatusDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  animation: ${pulse} 2s infinite ease-in-out;
  display: inline-block;
`;

export const ResetChatButton = styled.button`
  background: none;
  border: 1px solid rgba(226, 232, 240, 1);
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.2);
    background: rgba(239, 68, 68, 0.05);
  }
`;

export const ChatHistoryScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fafbfc;
`;

interface MessageRowProps {
  $isAI: boolean;
}

export const MessageRow = styled.div<MessageRowProps>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.$isAI ? 'flex-start' : 'flex-end')};
`;

export const MessageContent = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
`;

interface BubbleProps {
  $isAI: boolean;
}

export const MessageBubble = styled.div<BubbleProps>`
  padding: 14px 18px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.015);
  
  ${(props) =>
    props.$isAI
      ? `
        background-color: #ffffff;
        color: #0f172a;
        border: 1px solid rgba(226, 232, 240, 0.8);
        border-top-left-radius: 4px;
      `
      : `
        background-color: #1d4ed8;
        color: #ffffff;
        border-top-right-radius: 4px;
      `}
`;

export const MessageMeta = styled.span<BubbleProps>`
  font-size: 11px;
  color: #94a3b8;
  margin-top: 6px;
  align-self: ${(props) => (props.$isAI ? 'flex-start' : 'flex-end')};
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 14px 20px;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px;
  border-top-left-radius: 4px;
  width: fit-content;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.015);
`;

export const TypingDot = styled.span<{ $delay: string }>`
  width: 6px;
  height: 6px;
  background-color: #94a3b8;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay};
`;

export const ChatInputArea = styled.div`
  padding: 20px 24px;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  background: #ffffff;
`;

export const QuickPromptsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const QuickPromptButton = styled.button`
  background: #f8fafc;
  border: 1px solid rgba(226, 232, 240, 1);
  color: #475569;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #1d4ed8;
    border-color: rgba(29, 78, 216, 0.3);
    background: rgba(29, 78, 216, 0.02);
  }
`;

export const ChatInputForm = styled.form`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ChatTextField = styled.input`
  flex: 1;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid rgba(226, 232, 240, 1);
  font-size: 14px;
  font-weight: 500;
  outline: none;
  background: #f8fafc;
  color: #0f172a;
  transition: all 0.2s ease;

  &:focus {
    border-color: #1d4ed8;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SendButton = styled.button`
  background: #1d4ed8;
  border: none;
  color: #ffffff;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(29, 78, 216, 0.2);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: #1e40af;
    box-shadow: 0 6px 14px rgba(29, 78, 216, 0.3);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: #cbd5e1;
    color: #94a3b8;
    box-shadow: none;
    cursor: not-allowed;
  }
`;
