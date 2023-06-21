import { Controller, Get, Post, HttpCode, Delete, Param } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
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
  addId(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('key') key: string,
  ) {
    return this.favoriteService.addId(key, id);
  }

  @Delete('/:key/:id')
  @HttpCode(204)
  deleteId(
    @Param('key') key: string,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.delete(key, id);
  }
}
