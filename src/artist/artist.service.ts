import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { favorites } from 'src/favorite/favorite.service';
import { tracks } from 'src/track/track.service';
import { v4, validate } from 'uuid';
import { Artist } from './interface/artist.interface';

export const artists: Artist[] = [];

@Injectable()
export class ArtistService {
  find(): Artist[] {
    return artists;
  }

  create({ name, grammy }): Artist {
    const id: string = v4();
    const artist = {
      id,
      name,
      grammy,
    };
    artists.push(artist);
    return artist;
  }

  findOne(id: string): Artist {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const artist: Artist | null = artists.find((artist) => artist.id === id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  updateOne({ name, grammy }, id: string): Artist {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const artist: Artist | null = artists.find((artist, idx) => {
      if (artist.id === id) {
        index = idx;
        return artist;
      }
    });

    if (!artist) {
      return null;
    }

    artist.name = name;
    artist.grammy = grammy;
    artists[index] = artist;

    return artist;
  }

  delete(id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const artist: Artist | null = artists.find((artist, idx) => {
      if (artist.id === id) {
        index = idx;
        return artist;
      }
    });

    if (!artist) {
      throw new NotFoundException('Track not found');
    }

    artists.splice(index, 1);
    const idx = favorites.artists.indexOf(id);
    favorites.artists.splice(idx, 1);
    const idxTraxks = tracks.findIndex((element) => element.artistId === id);
    tracks[idxTraxks].artistId = null;

    return artist;
  }
}
