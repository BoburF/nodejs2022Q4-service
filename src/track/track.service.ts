import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Repository } from 'typeorm';
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
    const track: Track | null = await this.trackRepository.findOne({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException('User not found');
    }

    return track;
  }

  async updateOne(trackDto: CreateUpdateTrackDto, id: string): Promise<Track> {
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

  async delete(id: string) {
    await this.trackRepository.delete(id);
    const favorite = (
      await this.favoriteRepository.find({ relations: { tracks: true } })
    )[0];
    const indexFav = favorite.tracks.findIndex((track) => track.id === id);
    favorite.tracks.splice(indexFav, 1);
    await this.favoriteRepository.save(favorite);
  }
}
