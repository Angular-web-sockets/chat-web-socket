import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

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

    // listen to upcoming data from the server
    onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }
}
