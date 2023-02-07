import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albums } from 'src/album/album.service';
import { artists } from 'src/artist/artist.service';
import { tracks } from 'src/track/track.service';
import { validate } from 'uuid';
import { Favorite } from './interface/favorit.interface';
import { Favorites } from './interface/favorites.interface';

export const favorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class FavoriteService {
  find(): Favorites {
    const favoritesAll: Favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
    Object.keys(favorites).forEach((key) => {
      const allId = [...favorites[key]];
      for (let i = 0; i < allId.length; i++) {
        if (key === 'tracks') {
          tracks.find((track) => {
            if (track.id === allId[i]) {
              favoritesAll.tracks.push(track);
            }
          });
        } else if (key === 'artists') {
          artists.find((artist) => {
            if (artist.id === allId[i]) {
              favoritesAll.artists.push(artist);
            }
          });
        } else if (key === 'albums') {
          albums.find((album) => {
            if (album.id === allId[i]) {
              favoritesAll.albums.push(album);
            }
          });
        }
      }
    });

    return favoritesAll;
  }

  async addId(key: string, id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    let resStatus = false;

    if (key === 'track') {
      tracks.find((track) => {
        if (track.id === id) {
          resStatus = true;
        }
      });
    } else if (key === 'artist') {
      artists.find((artist) => {
        if (artist.id === id) {
          resStatus = true;
        }
      });
    } else if (key === 'album') {
      albums.find((album) => {
        if (album.id === id) {
          resStatus = true;
        }
      });
    } else {
      throw new BadRequestException('Id is not valid');
    }

    if (resStatus) {
      favorites[key + 's'].push(id);
      return favorites;
    } else {
      throw new UnprocessableEntityException('Id doesn"t exist');
    }
  }

  delete(key: string, id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    let resStatus = false;
    let index: number | null;
    favorites[key + 's'].find((element, idx) => {
      if (element === id) {
        index = idx;
        resStatus = true;
      }
    });

    if (resStatus) {
      const deletedId = favorites[key + 's'].splice(index, 1);
      return { message: `${deletedId} is deleted` };
    } else {
      throw new BadRequestException('Track is not defined');
    }
  }
}
