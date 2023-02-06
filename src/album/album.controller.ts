import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateUpdateAlbumDto } from './dto/create-update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  getAlbums() {
    return this.albumService.find();
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() createAlbumtDto: CreateUpdateAlbumDto) {
    return this.albumService.create(createAlbumtDto);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Body() updateAlbumDto: CreateUpdateAlbumDto,
    @Param('id') id: string,
  ) {
    return this.albumService.updateOne(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}
