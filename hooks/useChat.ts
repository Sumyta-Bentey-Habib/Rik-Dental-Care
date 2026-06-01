import { useState, useCallback } from 'react';
import { ChatMessage, mockChatHistory } from '../data/dummy-data';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Return a copy of mockChatHistory
    return [...mockChatHistory];
  });
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = (userInput: string): string => {
    const text = userInput.toLowerCase();
    
    if (text.includes('pain') || text.includes('hurt') || text.includes('ache') || text.includes('sore')) {
      return "I'm sorry to hear you're experiencing pain. If it's a throbbing ache or accompanied by swelling, it could indicate an infection. Please avoid chewing on that side and contact our front desk immediately for an emergency slot. You can also review your upcoming appointments in the Dashboard.";
    }
    if (text.includes('appointment') || text.includes('book') || text.includes('schedule') || text.includes('visit')) {
      return "You can check, reschedule, or request new appointments directly from the Dashboard page of this portal. Dr. Marcus Vance and Dr. Sarah Jenkins have openings next week!";
    }
    if (text.includes('clean') || text.includes('scaling') || text.includes('checkup') || text.includes('routine')) {
      return "A standard routine checkup and cleaning takes about 45 to 60 minutes. We recommend booking one every 6 months to keep your teeth healthy. Would you like me to guide you to the booking panel?";
    }
    if (text.includes('cost') || text.includes('insurance') || text.includes('price') || text.includes('pay')) {
      return "We accept most major dental insurances, including your active Apex Dental Premium plan. Co-pays vary depending on the procedure. For detailed coverage information, please contact our billing desk.";
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      return "Hello! How can I help you today? I can answer questions about procedures, recovery, or check appointment availability.";
    }
    
    return "Thank you for sharing that. I've noted down your inquiry. For detailed diagnoses or treatment options, our specialists will discuss this with you during your next visit. Is there anything else I can assist you with in the meantime?";
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Append User Message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI thinking and response delay
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        sender: 'ai',
        text: getAIResponse(text),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: "msg_reset",
        sender: "ai",
        text: "Chat history cleared. How else can I assist you with your dental health today?",
        timestamp: new Date()
      }
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};
