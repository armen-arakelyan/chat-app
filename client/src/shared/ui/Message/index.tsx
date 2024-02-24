import React from 'react';
import './styles.scss';
import IMessage from '../../../types/message';

interface IProps extends Omit<IMessage, "userId" | "id"> {
    isCurrentUser: boolean
}

const Message: React.FC<IProps> = ({ username, text, timestamp, isCurrentUser }) => {
  return (
    <div className={isCurrentUser ? 'message current-user' : 'message'}>
      <div className="message-content">
        <div className="username">{username}</div>
        <div className="text">{text}</div>
        <div className="timestamp">{new Date(timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default Message;
