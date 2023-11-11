import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ProfileDto } from 'src/dto/create-profile.dto';
import { ProfileService } from './profile.services';
import { AuthLoginDto } from 'src/dto/create-auth.dto';
import { Auth } from '../auth/auth.entity';
import { AuthGuard } from './auth.guard';
import { Response } from 'express';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Get('/profiles/:id')
  async getProfile(@Body() authLoginDto: AuthLoginDto, @Req() req: Request, @Param("id") id: number) {
    const profile = await this.profileService.getProfile(authLoginDto, req, id);
    if (!profile) {
      return  'Unauthorized'
      }
    
    return profile
    }
  

  @UseGuards(AuthGuard)
  @Post('/create')

  async createProfile(@Body() profileDto: ProfileDto, @Req() req: Request, @Res() res: Response) {
    console.log('check');
    console.log('id controller:', req["user"]);
    const user = req['user'];
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
    const createProfile = await this.profileService.createProfile(
      profileDto,
      req,
    );
    console.log('createProfile controller:', createProfile);
    return createProfile;
  }

  @UseGuards(AuthGuard)
  @Post('/update/:id')

  async updateProfile(@Body() profileDto: ProfileDto, @Param("id") id: number, @Req() req: Request) {
    console.log('test');
    console.log('user controller:', req["user"]);
    console.log('id controller:', id);
    const user = req['user'];
    if (!user) {
      return "Unauthorized"
    }
    const updateProfile = await this.profileService.updateProfile(
      profileDto,
      id,
      req
    );
    console.log('updateProfile controller:', updateProfile);
    return updateProfile;
  }

 
}
