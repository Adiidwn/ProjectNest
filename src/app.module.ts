import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile/profile.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'nest',
      entities: [Auth,Profile],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule
  ],
})
export class AppModule {}