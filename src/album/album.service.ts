import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { favorites } from 'src/favorite/favorite.service';
import { tracks } from 'src/track/track.service';
import { v4, validate } from 'uuid';
import { Album } from './interface/album.interface';

export const albums: Album[] = [];

@Injectable()
export class AlbumService {
  find(): Album[] {
    return albums;
  }

  create({ name, year, artistId }): Album {
    const id: string = v4();
    const album = {
      id,
      name,
      year,
      artistId,
    };
    albums.push(album);
    return album;
  }

  findOne(id: string): Album {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const album: Album | null = albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  updateOne({ name, year, artistId }, id: string): Album {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const album: Album | null = albums.find((album, idx) => {
      if (album.id === id) {
        index = idx;
        return album;
      }
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    album.name = name;
    album.year = year;
    album.artistId = artistId;
    albums[index] = album;

    return album;
  }

  delete(id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const album: Album | null = albums.find((album, idx) => {
      if (album.id === id) {
        index = idx;
        return album;
      }
    });

    if (!album) {
      throw new NotFoundException('Track not found');
    }

    albums.splice(index, 1);
    const idx = favorites.albums.indexOf(id);
    favorites.albums.splice(idx, 1);
    const idxTraxks = tracks.findIndex((element) => element.albumId === id);
    tracks[idxTraxks].albumId = null;

    return album;
  }
}
