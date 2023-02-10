import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { Database } from 'src/db/db';
import { FavoriteService } from 'src/favorite/favorite.service';
import { TrackService } from 'src/track/track.service';
import { v4 } from 'uuid';
import { CreateUpdateArtistDto } from './dto/create-update-track.dto';
import { Artist } from './interface/artist.interface';

export const artists: Artist[] = [];

@Injectable()
export class ArtistService {
  constructor(
    private db: Database,
    private albumService: AlbumService,
    private trackService: TrackService,
    private favsService: FavoriteService,
  ) {}
  find(): Artist[] {
    return this.db.artists;
  }

  create({ name, grammy }): Artist {
    const id: string = v4();
    const artist = {
      id,
      name,
      grammy,
    };
    this.db.artists.push(artist);
    return artist;
  }

  findOne(id: string): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  updateOne(artistDto: CreateUpdateArtistDto, id: string): Artist {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');
    this.db.artists[index] = { id, ...artistDto };
    return this.db.artists[index];
  }

  delete(id: string) {
    const index = this.db.artists.findIndex((artist) => artist.id === id);
    if (index === -1) throw new NotFoundException('Artist is not found');
    this.db.artists.splice(index, 1);
    this.albumService.updateArtistId(id);
    this.trackService.updateArtistId(id);
    if (this.db.favorites.artists.includes(id))
      this.favsService.delete('artist', id);
  }
}
