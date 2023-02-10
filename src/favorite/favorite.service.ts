import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interface/artist.interface';
import { Database } from 'src/db/db';
import { Track } from 'src/track/interface/track.interface';
import { Favorite } from './interface/favorit.interface';

export const favorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavoriteService {
  constructor(private db: Database) {}
  find() {
    const artists: Artist[] = this.db.artists.filter((artist) =>
      this.db.favorites.artists.includes(artist.id),
    );
    const albums: Album[] = this.db.albums.filter((artist) =>
      this.db.favorites.albums.includes(artist.id),
    );
    const tracks: Track[] = this.db.tracks.filter((artist) =>
      this.db.favorites.tracks.includes(artist.id),
    );
    return {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
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
