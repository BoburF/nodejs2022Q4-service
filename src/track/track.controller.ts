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
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './interface/track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  getTracks(): Track[] {
    return this.trackService.find();
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateUpdateTrackDto): Track {
    return this.trackService.create(createTrackDto);
  }

  @Get(':id')
  @HttpCode(200)
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Track {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Body() updateTrackDto: CreateUpdateTrackDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Track {
    return this.trackService.updateOne(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): void {
    return this.trackService.delete(id);
  }
}
