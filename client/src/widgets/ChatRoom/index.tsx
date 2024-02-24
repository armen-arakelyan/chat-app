import React, { useState, useEffect, useCallback, useRef } from 'react';
import { webSocketService } from '../../api/socketService';
import { SendMessage, ChatInput } from '../../features/chat/ui';
import Messages from '../../entities/messages/ui';
import './styles.scss';
import IMessage from '../../types/message';
import Sidebar from '../../entities/sidebar/ui';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [username, setUsername] = useState<string>('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const setName = useCallback((name: string) => {
    setUsername(name);
  }, []);

  useEffect(() => {
    webSocketService.subscribe('messageHistory', (history: IMessage[]) => {
      setMessages(history);
    });
  
    webSocketService.subscribe('newMessage', (message: IMessage) => {
      setMessages(prev => [...prev, message]);
    });
  
    if (username) {
      webSocketService.sendMessage('joinChat', username);
    }
  
    return () => {
      webSocketService.unsubscribe('messageHistory');
      webSocketService.unsubscribe('newMessage');
    };
  }, [username, setMessages]);

  useEffect(() => {
    webSocketService.connect();
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!username) {
    return (
      <ChatInput buttonText="Join Chat" onSubmit={setName} placeholder="Username" />
    );
  }

  return (
    <div className="chat-room">
      <Sidebar />
      <div className="chat-content">
        <div className="chat-header">Chat Room</div>
        <div className="messages-container">
          <Messages messages={messages} />
          <div ref={messagesEndRef} />
        </div>
        <div className="send-message-container">
          <SendMessage username={username} />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
