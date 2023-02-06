import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { IncomingMessage, get, request } from 'http';
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

const ckeckObj = {
  track: tracks,
  artist: artists,
  album: albums,
};

@Injectable()
export class FavoriteService {
  private async getBody(req: IncomingMessage) {
    try {
      const buffers = [] as any;
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      return Buffer.concat(buffers).toString();
    } catch (error) {
      return error;
    }
  }

  find(): Favorites {
    const favoritesAll: Favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
    Object.keys(favorites).forEach((key) => {
      const allId = favorites[key];
      for (let i = 0; i < allId.length; i++) {
        get(
          `/${key.slice(0, key.length - 1)}/${allId[i]}`,
          async (res: IncomingMessage) => {
            const data = await this.getBody(res);
            favoritesAll[key].push(data);
          },
        );
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

    const clas = ckeckObj[key];
    if (clas) {
      clas.find((element) => {
        if (element.id === id) {
          resStatus = true;
        }
      });
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

    const clas = ckeckObj[key];
    if (clas) {
      clas.find((element) => {
        if (element.id === id) {
          resStatus = true;
        }
      });
    }

    if (resStatus) {
      const deletedId = favorites[key].splice(
        favorites[key + 's'].findIndex((element: string) => element === id),
        1,
      );
      return { message: `${deletedId} is deleted` };
    } else {
      throw new BadRequestException('Track is not defined');
    }
  }
}
