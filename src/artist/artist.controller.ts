import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateUpdateArtistDto } from './dto/create-update-track.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @HttpCode(200)
  getArtists() {
    return this.artistService.find();
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() createArtistDto: CreateUpdateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Body() updateArtistDto: CreateUpdateArtistDto,
    @Param('id') id: string,
  ) {
    return this.artistService.updateOne(updateArtistDto, id);
  }
}
