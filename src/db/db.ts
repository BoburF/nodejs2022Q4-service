import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interface/artist.interface';
import { Favorite } from 'src/favorite/interface/favorit.interface';
import { Track } from 'src/track/interface/track.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class Database {
  users: User[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  favorites: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
