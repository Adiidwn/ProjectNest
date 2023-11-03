import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from 'src/dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  async create(dto: CreateCatDto): Promise<Cat> {
    
    return dto;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}