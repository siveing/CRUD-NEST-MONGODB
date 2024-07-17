import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private logger = new Logger('AppGateway');

  afterInit() {
    this.logger.log("Websocket Initialized");
  }

  handleConnection(socket: Socket) {
    this.logger.log(`Socket ID: ${socket.id} connected!`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket ID: ${socket.id} disconnected!`);
  }

  @SubscribeMessage('getCategories')
  onEvent(): WsResponse<any> {
    return { data: 'getCategories', event: 'getCategories' };
  }

  @SubscribeMessage("ping")
  handleMessage(client: any, data: any) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${data}`);
    return {
      event: "ping",
      data,
    };
  }

  emit(eventName: string, body: any) {
    this.server.emit(eventName, body);
  }
}
