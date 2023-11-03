import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/create-auth.dto';
import { Repository } from 'typeorm';
import { Auth } from '../auth/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Profile } from './profile.entity';
import { ProfileDto } from 'src/dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) {}

  // async login(authLoginDto: AuthLoginDto): Promise<LoginResponse> {
  //   try {
  //     const user = await this.authRepository.findOne({
  //       where: {
  //         username: authLoginDto.username,
  //       },
  //     });
  //     const isMatch = await bcrypt.compare(
  //       authLoginDto.password,
  //       user.password,
  //     );
  //     if (!isMatch) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user.id, username: user.username };

  //     return {
  //       user,
  //       access_token: await this.jwtService.signAsync(payload),
  //     };
  //   } catch (err) {
  //     return null;
  //   }
  // }

  async createProfile(profileDto: ProfileDto, req: Request): Promise<Profile> {
    const id = req["user"].sub
    const user = await this.profileRepository.findOneBy({ id });
    console.log('====================================');
    console.log("user service:", user);
    console.log("id service:", id);
    console.log('====================================');
    if (!user) {
      throw new UnauthorizedException("unknown user");
    }
    // if (!profileDto.) {
    //   throw new UnauthorizedException("unknown user");
    // }
    const profileCreate = this.profileRepository.create(profileDto);

    return await this.profileRepository.save(profileCreate);
  }
}
