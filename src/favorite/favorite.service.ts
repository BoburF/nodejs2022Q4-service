import { Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { get } from 'https';
import { Favorite } from './interface/favorit.interface';
import { Favorites } from './interface/favorites.interface';

const favorites: Favorite = {
  artists: [],
  albums: [],
  tracks: [],
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

  addId(key: string, id: string) {
    favorites[key].push(id);
    return favorites;
  }
}
