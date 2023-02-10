import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { v4 } from 'uuid';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { Track } from './interface/track.interface';

export const tracks: Track[] = [];

@Injectable()
export class TrackService {
  constructor(private db: Database, private favService: FavoriteService) {}
  find(): Track[] {
    return this.db.tracks;
  }

  create({ name, artistId, albumId, duration }): Track {
    const id: string = v4();
    const track = {
      id,
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    };
    this.db.tracks.push(track);
    return track;
  }

  findOne(id: string): Track {
    const track: Track | null = this.db.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track is not found');
    return track;
  }

  updateOne(trackDto: CreateUpdateTrackDto, id: string): Track {
    const index = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Track is not found');
    this.db.tracks[index] = { id, ...trackDto };
    return this.db.tracks[index];
  }

  updateArtistId(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
  }

  updateAlbumId(id: string) {
    this.db.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }

  delete(id: string) {
    const index = this.db.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException('Track not founded');
    this.db.tracks.splice(index, 1);
    if (this.db.favorites.tracks.includes(id)) {
      this.favService.delete('track', id);
    }
  }
}
