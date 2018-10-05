import { Component, OnInit} from '@angular/core';
import {Message} from "./shared/model/message";
import {SocketService} from "./shared/services/socket.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    messages: Message[] = [];
    username: string;
    messageContent: string;

    constructor(private socketService: SocketService) {
    }

    ngOnInit() {
        this.initIoConnection();
    }

    // listen to data from server on the current socket
    private initIoConnection(): void {
        this.socketService.initSocket();

      this.socketService.onMessage()
            .subscribe((message: Message) => {
                this.messages.push(message);
            });
    }

    // send data to the server from the current socket
    sendMessage(): void {
        const test  = {
            from: this.username,
            content: this.messageContent
        };

        this.socketService.send(test);
        this.messageContent = null;
    }

}
