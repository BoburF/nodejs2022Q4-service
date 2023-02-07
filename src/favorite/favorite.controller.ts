import {
  Controller,
  Get,
  Post,
  HttpCode,
  Delete,
  Param,
  Req,
  Request,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(200)
  getFavorites() {
    return this.favoriteService.find();
  }

  @Post('/:key/:id')
  @HttpCode(201)
  addId(@Param('id') id: string, @Param('key') key: string) {
    return this.favoriteService.addId(key, id);
  }

  @Delete('/:key/:id')
  @HttpCode(204)
  deleteId(@Param('key') key: string, @Param('id') id: string) {
    return this.favoriteService.delete(key, id);
  }
}
