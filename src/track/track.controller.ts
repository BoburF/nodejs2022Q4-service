import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  getTracks() {
    return this.trackService.find();
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateUpdateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Body() updateTrackDto: CreateUpdateTrackDto,
    @Param('id') id: string,
  ) {
    return this.trackService.updateOne(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.trackService.delete(id);
  }
}
