import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { CreateUpdateAlbumDto } from './dto/create-update-album.dto';
import { Album } from './interface/album.interface';

export const albums: Album[] = [];

@Injectable()
export class AlbumService {
  constructor(
    private db: Database,
    private trackService: TrackService,
    private favsService: FavoriteService,
  ) {}
  find(): Album[] {
    return this.db.albums;
  }

  create({ name, year, artistId }): Album {
    const id: string = v4();
    const album = {
      id,
      name,
      year,
      artistId,
    };
    this.db.albums.push(album);
    return album;
  }

  findOne(id: string): Album {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  updateOne(albumDto: CreateUpdateAlbumDto, id: string): Album {
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('Album not founded');
    this.db.albums[index] = { id, ...albumDto };
    return this.db.albums[index];
  }

  updateArtistId(id: string) {
    this.db.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }

  delete(id: string) {
    const index = this.db.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('Album is not found');
    this.db.albums.splice(index, 1);
    this.trackService.updateAlbumId(id);
    if (this.db.favorites.albums.includes(id)) {
      this.favsService.delete('album', id);
    }
  }
}
