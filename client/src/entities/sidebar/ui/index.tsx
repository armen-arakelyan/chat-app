import { useState, useEffect } from 'react';
import './styles.scss';
import { webSocketService } from '../../../api/socketService';

const Sidebar = () => {
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
      webSocketService.subscribe('onlineUsers', (users: string[]) => {
        setOnlineUsers(users);
      });

      return () => {
        webSocketService.unsubscribe('onlineUsers');
      }
    }, []);

    return (
    <aside className="sidebar">
      <h3>Online Users ({ onlineUsers.length })</h3>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </aside>
    )
};

export default Sidebar;
