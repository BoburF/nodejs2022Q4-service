import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Database } from 'src/db/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './entities/track.entity';

export const tracks: Track[] = [];

@Injectable()
export class TrackService {
  constructor(
    private db: Database,
    private favService: FavoriteService,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}
  async find(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async create(TrackDto: CreateUpdateTrackDto): Promise<Track> {
    const createTrack = this.trackRepository.create(TrackDto);
    return await this.trackRepository.save(createTrack);
  }

  async findOne(id: string): Promise<Track> {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const track: Track | null = await this.trackRepository.findOne({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('User not found');
    }

    return track;
  }

  async updateOne(trackDto: CreateUpdateTrackDto, id: string): Promise<Track> {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let track: Track | null = await this.trackRepository.findOne({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('User not found');
    }

    track = { id: track.id, ...trackDto };
    await this.trackRepository.save(track);
    return track;
  }

  async updateArtistId(id: string) {
    const track: Track | null = await this.trackRepository.findOne({
      where: { artistId: id },
    });
    await this.trackRepository.save(track);
  }

  async updateAlbumId(id: string) {
    const track: Track | null = await this.trackRepository.findOne({
      where: { albumId: id },
    });
    await this.trackRepository.save(track);
  }

  delete(id: string) {
    const index = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Track not founded');
    this.db.tracks.splice(index, 1);
    if (this.db.favorites.tracks.includes(id)) {
      this.favService.delete('track', id);
    }
  }
}
