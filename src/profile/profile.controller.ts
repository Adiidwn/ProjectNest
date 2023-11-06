import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ProfileDto } from 'src/dto/create-profile.dto';
import { ProfileService } from './profile.services';
import { AuthLoginDto } from 'src/dto/create-auth.dto';
import { Auth } from '../auth/auth.entity';
import { AuthGuard } from './auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @UseGuards(AuthGuard)
  // @Get('/profiles')
  // async login(@Body() authLoginDto: AuthLoginDto, @Res() res: Response) {
  //   const login = await this.authService.login(authLoginDto);
  //   if (!login) {
  //     return res.status(HttpStatus.UNAUTHORIZED).json({
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       message: 'Unauthorized',
  //     });
  //   }
  //   return res.status(HttpStatus.OK).json({
  //     statusCode: HttpStatus.OK,
  //     data: login,
  //   });
  // }

  @UseGuards(AuthGuard)
  @Post('/create')

  async createProfile(@Body() profileDto: ProfileDto, @Req() req: Request) {
    console.log('asdasdsad');
    console.log('id controller:', req["user"]);
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
    console.log('asdasdsad');
    console.log('user controller:', req["user"]);
    console.log('id controller:', id);
    const updateProfile = await this.profileService.updateProfile(
      profileDto,
      id,
      req
    );
    console.log('updateProfile controller:', updateProfile);
    return updateProfile;
  }

 
}
