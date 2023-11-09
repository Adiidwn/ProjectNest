import { Server, Socket } from 'socket.io';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @Req() req: Request,
  ) {
    const user = req['user'];
    if (!user) {
      return null;
    }
    const message = await this.messagesService.create(
      createMessageDto,
      client.id,
      req['user'],
    );
    this.server.emit('message', message);

    return message;
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
    @Req() req: Request,
  ) {
    return this.messagesService.identify(name, client.id, req['user']);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
    @Req() req: Request,
  ) {
    const name = await this.messagesService.getClientName(req['user'].username);

    client.broadcast.emit('typing', { name, isTyping });
  }

  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: number, @ConnectedSocket() client: Socket, @Req() req: Request) {
    return this.messagesService.remove(id, client.id, req['user']);
  }
}
