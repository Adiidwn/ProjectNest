import { Body, Controller, Delete, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCatDto } from '../dto/create-cat.dto';
import { CatsService } from './cats.services';
import { Cat } from '../interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Get()
  // findAll(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   res.status(HttpStatus.OK).json([])
  //   return []
  // }
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }


  // @Post()
  // create(@Req() req: Request, @Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send()
  // }
  @Post()
  async create(@Body() dto: CreateCatDto) {
    this.catsService.create(dto)
  }

  @Delete(':id')
  delete(@Req() req: Request, @Res() res: Response) {
    return 'This action delete a cat';
  }

  @Post()
  update(@Req() req: Request, @Res() res: Response) {
    return 'This action update a cat';
  }
}