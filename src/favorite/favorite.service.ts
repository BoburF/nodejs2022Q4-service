import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Database } from 'src/db/db';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';

export const favorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
  id: '',
};

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
  find() {
    return favorites;
  }

  async addId(key: string, id: string) {
    let resStatus: any | null;

    if (key === 'track') {
      resStatus = this.db.tracks.find((track) => track.id === id);
    } else if (key === 'artist') {
      resStatus = this.db.artists.find((artis) => artis.id === id);
    } else if (key === 'album') {
      resStatus = this.db.albums.find((album) => album.id === id);
    } else {
      throw new BadRequestException('Id is not valid');
    }

    if (resStatus) {
      this.db.favorites[key + 's'].push(resStatus.id);
      return favorites;
    } else {
      throw new UnprocessableEntityException('Id doesn"t exist');
    }
  }

  delete(key: string, id: string) {
    const index: number = this.db.favorites[key + 's'].indexOf(id);
    if (index !== -1) {
      const deletedId = this.db.favorites[key + 's'].splice(index, 1);
      return deletedId;
    } else {
      throw new BadRequestException('Favorite is not defined');
    }
  }
}
