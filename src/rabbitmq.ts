import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:3000'],
      queue: 'chat_queue',
      queueOptions: {
        durable: false,
      },
    },
  })
  private client: ClientProxy;

  sendMessage(message: string): void {
    this.client.emit('chatMessage', { message });
  }
}
