import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter  } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // await app.listen(3000);
  const app = await NestFactory.create(AppModule);

  // Set up Socket.IO
  const io = new socketio.Server(app.getHttpServer(), {
    cors: {
      origin: 'http://localhost:3000', // replace with your client app URL
      methods: ['GET', 'POST'],
    },
  });

  app.useWebSocketAdapter(new IoAdapter (io));

  // Set up RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'chat_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
