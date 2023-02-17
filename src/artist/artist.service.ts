import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateUpdateArtistDto } from './dto/create-update-track.dto';
import { Artist } from './entities/artist.entity';

export const artists: Artist[] = [];

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}
  async find(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async create(ArtistDTo: CreateUpdateArtistDto): Promise<Artist> {
    const createArtist = this.artistRepository.create(ArtistDTo);
    return await this.artistRepository.save(createArtist);
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist | null = await this.artistRepository.findOne({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('User not found');
    }

    return artist;
  }

  async updateOne(
    artistDto: CreateUpdateArtistDto,
    id: string,
  ): Promise<Artist> {
    let artist: Artist | null = await this.artistRepository.findOne({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException('User not found');
    }

    artist = { id: artist.id, ...artistDto };
    await this.artistRepository.save(artist);
    return artist;
  }

  async delete(id: string) {
    await this.artistRepository.delete(id);
    const favorite = (
      await this.favoriteRepository.find({ relations: { artists: true } })
    )[0];
    const indexFav = favorite.artists.findIndex((artist) => artist.id === id);
    favorite.artists.splice(indexFav, 1);
    await this.favoriteRepository.save(favorite);
    const track = (
      await this.trackRepository.find({ where: { artistId: id } })
    )[0];
    track.artistId = null;
    await this.trackRepository.save(track);
    const album = (
      await this.albumRepository.find({ where: { artistId: id } })
    )[0];
    album.artistId = null;
    await this.albumRepository.save(album);
  }
}
