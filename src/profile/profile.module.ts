import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.services';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), ProfileModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
  ],
  exports: [ProfileService],
})
export class ProfileModule {}