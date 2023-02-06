import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { Album } from './interface/album.interface';

const albums: Album[] = [];

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
}
