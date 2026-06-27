import styled, { keyframes } from 'styled-components';
import { colors } from '../../utils/colors';

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${colors.neutral.white};
  border-radius: 20px;
  border: 1px solid rgba(${colors.rgb.slate200}, 0.8);
  box-shadow: 0 10px 30px rgba(${colors.rgb.black}, 0.04);
  overflow: hidden;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: rgba(${colors.rgb.slate50}, 0.6);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(${colors.rgb.slate200}, 0.8);
`;

export const ChatHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatHeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.neutral.slate900};
  margin: 0;
`;

export const ChatHeaderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${colors.neutral.slate500};
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
  background-color: ${colors.status.success};
  animation: ${pulse} 2s infinite ease-in-out;
  display: inline-block;
`;

export const ResetChatButton = styled.button`
  background: none;
  border: 1px solid rgba(${colors.rgb.slate200}, 1);
  color: ${colors.neutral.slate500};
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.status.error};
    border-color: rgba(${colors.rgb.red500}, 0.2);
    background: rgba(${colors.rgb.red500}, 0.05);
  }
`;

export const ChatHistoryScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${colors.neutral.slate50};
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
  box-shadow: 0 2px 6px rgba(${colors.rgb.black}, 0.015);
  
  ${(props) =>
    props.$isAI
      ? `
        background-color: ${colors.neutral.white};
        color: ${colors.neutral.slate900};
        border: 1px solid rgba(${colors.rgb.slate200}, 0.8);
        border-top-left-radius: 4px;
      `
      : `
        background-color: ${colors.primary.default};
        color: ${colors.neutral.white};
        border-top-right-radius: 4px;
      `}
`;

export const MessageMeta = styled.span<BubbleProps>`
  font-size: 11px;
  color: ${colors.neutral.slate400};
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
  background: ${colors.neutral.white};
  border: 1px solid rgba(${colors.rgb.slate200}, 0.8);
  border-radius: 16px;
  border-top-left-radius: 4px;
  width: fit-content;
  align-items: center;
  box-shadow: 0 2px 6px rgba(${colors.rgb.black}, 0.015);
`;

export const TypingDot = styled.span<{ $delay: string }>`
  width: 6px;
  height: 6px;
  background-color: ${colors.neutral.slate400};
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay};
`;

export const ChatInputArea = styled.div`
  padding: 20px 24px;
  border-top: 1px solid rgba(${colors.rgb.slate200}, 0.8);
  background: ${colors.neutral.white};
`;

export const QuickPromptsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const QuickPromptButton = styled.button`
  background: ${colors.neutral.slate50};
  border: 1px solid rgba(${colors.rgb.slate200}, 1);
  color: ${colors.neutral.slate600};
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${colors.primary.default};
    border-color: rgba(${colors.rgb.primary}, 0.3);
    background: rgba(${colors.rgb.primary}, 0.02);
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
  border: 1px solid rgba(${colors.rgb.slate200}, 1);
  font-size: 14px;
  font-weight: 500;
  outline: none;
  background: ${colors.neutral.slate50};
  color: ${colors.neutral.slate900};
  transition: all 0.2s ease;

  &:focus {
    border-color: ${colors.primary.default};
    background: ${colors.neutral.white};
    box-shadow: 0 0 0 3px rgba(${colors.rgb.primary}, 0.15);
  }

  &::placeholder {
    color: ${colors.neutral.slate400};
  }
`;

export const SendButton = styled.button`
  background: ${colors.primary.default};
  border: none;
  color: ${colors.neutral.white};
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(${colors.rgb.primary}, 0.2);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    background: ${colors.primary.hover};
    box-shadow: 0 6px 14px rgba(${colors.rgb.primary}, 0.3);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.neutral.slate300};
    color: ${colors.neutral.slate400};
    box-shadow: none;
    cursor: not-allowed;
  }
`;
