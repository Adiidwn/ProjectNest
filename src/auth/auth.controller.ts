import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto, AuthRegisterDto } from 'src/dto/create-auth.dto';
import { AuthService } from './auth.services';
import { AuthGuard } from 'src/profile/auth.guard';

@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
    console.log('AuthLoginDto controller:', authLoginDto);
    const login = await this.authService.login(authLoginDto);
    if (!login) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    console.log('====================================');
    console.log('login controller:', login);
    console.log('====================================');
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: login,
    });
  }

  @Post('/register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
    @Res() res: Response,
  ) {
    try {
      const register = await this.authService.register(authRegisterDto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: register,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    try {
      const authCheck = await this.authService.authCheck(req);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: authCheck,
      });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: error.message,
      });
    }
  }
}
