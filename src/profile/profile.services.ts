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
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>, // private readonly authRepository: Repository<Auth>,
  ) {}

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
    const user = req['user'];
    console.log('====================================');
    console.log('user service:', user);
    console.log('====================================');

    if (!user) {
      throw new UnauthorizedException('unknown user');
    }
    const profileCreate = this.profileRepository.create({
      displayName: profileDto.displayName,
      gender: profileDto.gender,
      birthday: profileDto.birthday,
      horoscope: profileDto.horoscope,
      zodiac: profileDto.zodiac,
      height: profileDto.height,
      weight: profileDto.weight,
      image: profileDto.image,
      auths: user,
    });
    console.log('====================================');
    console.log('profileCreate service:', profileCreate);
    console.log('====================================');

    return await this.profileRepository.save(profileCreate);
  }

  async updateProfile(
    profileDto: ProfileDto,
    id: number,
    req: Request,
  ): Promise<Profile> {
    const user = req['user'];
    const paramId = id;
    console.log('====================================');
    console.log('user service:', user);
    console.log('id service:', paramId);
    console.log('====================================');
    if (!user) {
      throw new UnauthorizedException('unknown user');
    }

    const userData = await this.profileRepository.findOne({
      where: {
        id: paramId,
      },
    });

    userData.displayName = profileDto.displayName;
    userData.gender = profileDto.gender;
    userData.birthday = profileDto.birthday;
    userData.horoscope = profileDto.horoscope;
    userData.zodiac = profileDto.zodiac;
    userData.height = profileDto.height;
    userData.weight = profileDto.weight;
    userData.image = profileDto.image;
    console.log('====================================');
    console.log('userData:', userData);
    console.log('====================================');
    return await this.profileRepository.save(userData);
  }
}
