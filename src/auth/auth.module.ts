import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstant';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.services';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
// export class AuthModule {
//   constructor(private authRepository: Repository<Auth>) {}
// }
export class AuthModule {}
