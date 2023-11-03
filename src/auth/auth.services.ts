import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/create-auth.dto';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface LoginResponse {
  user: Auth;
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<LoginResponse> {
    try {
      const user = await this.authRepository.findOne({
        where: {
          username: authLoginDto.username,
        },
        select: ['id', 'username', 'password', 'email', 'description', 'profiles'],
      });
      console.log('====================================');
      console.log("user service: ", user);
      console.log('====================================');
      if (!user) {
        return {
          user,
          access_token: ("Error Email / password is wrong"),
        };
      }
      const isMatch = await bcrypt.compare(
        authLoginDto.password,
        user.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };

      return {
        user,
        access_token: await this.jwtService.signAsync(payload),
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
}
