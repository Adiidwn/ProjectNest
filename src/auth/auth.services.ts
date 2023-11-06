import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/create-auth.dto';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Profile } from 'src/profile/profile.entity';

interface LoginResponse {
  user: userLogin;
  access_token: string;
}

interface userLogin {
  id: number;
  username: string;
  email: string;
  description: string;
  profiles: Profile;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<LoginResponse> {
    try {
      const checkUser = await this.authRepository.findOne({
        where: {
          username: authLoginDto.username,
        },
        relations: ['profiles'],
        select: [
          'id',
          'username',
          'password',
          'email',
          'description',
          'profiles',
        ],
      });
      console.log('====================================');
      console.log('user service: ', checkUser);
      console.log('====================================');
      if (!checkUser) {
        return {
          user: null,
          access_token: 'Error Email / password is wrong',
        };
      }
      const isMatch = await bcrypt.compare(
        authLoginDto.password,
        checkUser.password,
      );
      console.log('====================================');
      console.log('isMatch: ', isMatch);
      console.log('====================================');
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = {
        id: checkUser.id,
        username: checkUser.username,
        email: checkUser.email,
        description: checkUser.description,
        profiles: checkUser.profiles,
      };
      const user = {
        id: checkUser.id,
        username: checkUser.username,
        email: checkUser.email,
        description: checkUser.description,
        profiles: checkUser.profiles,
      };

      return {
        user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      return null;
    }
  }

  async register(authRegisterDto: AuthRegisterDto): Promise<Auth> {
    const saltOrRounds = 10;
    authRegisterDto.password = await bcrypt.hash(
      authRegisterDto.password,
      saltOrRounds,
    );
    const regist = this.authRepository.create(authRegisterDto);

    return await this.authRepository.save(regist);
  }

  async authCheck(req: Request) {
    try {
      const loginSession = req['user'];
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.id,
        },
        select: ['id', 'username', 'email', 'description', 'profiles'],
      });

      return user
    } catch (error) {
      return null
    }
  }
}
