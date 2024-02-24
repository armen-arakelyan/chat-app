import { webSocketService } from '../../../api/socketService';
import { Message } from '../../../shared/ui';
import IMessage from '../../../types/message';

const Messages = ({ messages }: { messages: IMessage[] }) => (
    messages.map(itm => <Message
     key={itm.id} 
     text={itm.text}
     timestamp={itm.timestamp}
     username={itm.username}
     isCurrentUser={itm.userId === webSocketService.getSocketId()}
    />)
);

export default Messages;
