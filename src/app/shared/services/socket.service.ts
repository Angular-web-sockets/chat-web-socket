import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:4000';

@Injectable()
export class SocketService {
    private socket;

    constructor() {
    }

    // connect to a socket on the server
    initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    // send data to server
    send(message: Message): void {
        this.socket.emit('message', message);
    }

    sendUser(user: string): void {
        this.socket.emit('typing', user);
    }

    // listen to upcoming data from the server
    onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    onTyping(): Observable<string> {
        return new Observable<string>(observer => {
            this.socket.on('typing', (data: string) => observer.next(data));
        });
    }
}
