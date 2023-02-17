import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Database } from 'src/db/db';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    private db: Database,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}
  async find() {
    return await this.favoriteRepository.find({
      relations: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });
  }

  async create() {
    const favorite = await this.favoriteRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });
    return favorite;
  }

  async addId(key: string, id: string) {
    const favorites = (await this.find())[0];

    const checkedId: Album | Track | Artist = await this[
      key + 'Repository'
    ].findOneBy({ id });
    if (!checkedId) {
      throw new UnprocessableEntityException(`${key}.id is not founded`);
    }
    favorites[key + 's'].push(checkedId);

    return await this.favoriteRepository.save(favorites);
  }

  async delete(key: string, id: string) {
    const favorites = (
      await this.favoriteRepository.find({
        relations: [key + 's'],
      })
    )[0];
    favorites[key + 's'] = favorites[key + 's'].filter((fav) => fav.id !== id);
    await this.favoriteRepository.save(favorites);
  }
}
