import { v4 as uuidv4 } from 'uuid';

export class Message {
    username: string;
    text: string;
    timestamp: Date;
    id: string;
    userId: string;

    constructor(username: string, text: string, userId: string) {
        this.username = username;
        this.text = text;
        this.timestamp = new Date();
        this.id = uuidv4();
        this.userId = userId
    }
}
