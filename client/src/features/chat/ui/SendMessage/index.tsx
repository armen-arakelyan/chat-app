import React, { useCallback, memo } from 'react';
import ChatInput from '../ChatInput'; 
import { webSocketService } from '../../../../api/socketService';

interface MessageInputProps {
  username: string;
}

const SendMessage: React.FC<MessageInputProps> = ({ username }) => {
  const handleSendMessage = useCallback((msg: string) => {
    webSocketService.sendMessage('sendMessage', { username, text: msg });
  }, [username]);

  return <ChatInput buttonText="Send" onSubmit={handleSendMessage} placeholder="Type your message here..." />;
};

export default memo(SendMessage);
