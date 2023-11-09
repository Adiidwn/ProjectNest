import { Module } from '@nestjs/common';
import { Auth } from './auth/auth.entity';
import { AuthModule } from './auth/auth.module';
import { Profile } from './profile/profile.entity';
import { ProfileModule } from './profile/profile.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'nest',
      entities: [Auth, Profile],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    MessagesModule,
  ],
})
export class AppModule {}
