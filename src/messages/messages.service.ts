import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'adi', text: 'hello' }];
  clientToUser = {};

  identify(name: string, clientId: string, req: string) {
    this.clientToUser[req['user'].username] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string, req: string) {
    const message = {
      name: this.clientToUser[req['user'].username],
      text: createMessageDto.text,
    };
    this.messages.push(message);

    return message;
  }

  findAll() {
    return this.messages;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  remove(id: number, client: string, req: string) {
    const param = this.remove(id, client, req['user'].username);
  }
}
