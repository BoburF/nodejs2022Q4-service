import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  Put,
  Param,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getFavorites() {
    return this.favoriteService.find();
  }
}
