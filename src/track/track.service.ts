import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './entities/track.entity';

export const tracks: Track[] = [];

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
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

  async delete(id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    const track = await this.trackRepository.delete(id);
    if (track.affected === 0)
      throw new NotFoundException('Track is not founded');
    const favorite = (
      await this.favoriteRepository.find({ relations: { tracks: true } })
    )[0];
    const indexFav = favorite.tracks.findIndex((track) => track.id === id);
    favorite.tracks.splice(indexFav, 1);
    await this.favoriteRepository.save(favorite);
  }
}
