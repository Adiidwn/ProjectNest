import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileService } from './profile.services';
import { Auth } from 'src/auth/auth.entity';
import { AuthService } from 'src/auth/auth.services';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Auth]), AuthModule],
  controllers: [ProfileController],
  providers: [ProfileService,AuthService],
  exports: [ProfileService],
})
export class ProfileModule {}
