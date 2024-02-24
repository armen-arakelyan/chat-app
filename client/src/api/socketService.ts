import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5002';

class WebSocketService {
    private socket: Socket | undefined;
    private eventHandlers: Map<string, (...args: any[]) => void> = new Map();

    public connect() {
        this.socket = io(SERVER_URL);
    
        this.socket.on('connect', () => {
            console.log('WebSocket connected:', this.socket?.id);
        });
    
        this.socket.on('connect_error', (error) => {
            console.error('Failed to connect to real-time messaging:', error);
        });
    
        this.socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
        });
    }
    public subscribe(event: string, messageHandler: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.on(event, messageHandler);
            this.eventHandlers.set(event, messageHandler);
        }
    }

    public unsubscribe(event: string): void {
        const handler = this.eventHandlers.get(event);
        if (this.socket && handler) {
            this.socket.off(event, handler);
            this.eventHandlers.delete(event);
        }
    }

    public sendMessage<TData>(event: string, data: TData) {
        this.socket?.emit(event, data);
    }

    public disconnect() {
        if (this.socket) {
            this.eventHandlers.forEach((handler, event) => {
                this.socket?.off(event, handler);
            });
            this.eventHandlers.clear();
            this.socket.disconnect();
        }
    }

    public getSocketId(): string | undefined {
        return this.socket?.id;
    }
}

export const webSocketService = new WebSocketService();
