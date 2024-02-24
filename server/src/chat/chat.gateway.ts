import { WebSocketGateway, SubscribeMessage, WebSocketServer, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from './user.entity';
import { Message } from './message.entity';

@WebSocketGateway(5002, { cors: '*' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  private messageHistory: Message[] = [];
  private onlineUsers: Map<string, User> = new Map();

  handleDisconnect(client: Socket) {
    this.onlineUsers.delete(client.id);
    this.server.emit('onlineUsers', Array.from(this.onlineUsers.values()).map(user => user.username));
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(@MessageBody() username: string, @ConnectedSocket() client: Socket) {
    const newUser = new User(username);
    this.onlineUsers.set(client.id, newUser);
    this.server.emit('onlineUsers', Array.from(this.onlineUsers.values()).map(user => user.username));
    client.emit('messageHistory', this.messageHistory);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() messageBody: { username: string; text: string }, @ConnectedSocket() client: Socket): void {
    const newMessage = new Message(messageBody.username, messageBody.text, client.id);
    this.messageHistory.push(newMessage);
    this.server.emit('newMessage', newMessage);
  }
}
