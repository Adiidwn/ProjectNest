import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.services';
import { AuthModule } from 'src/auth/auth.module';
import { Auth } from 'src/auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile,Auth])],
  controllers: [ProfileController],
  providers: [
    ProfileService,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}
