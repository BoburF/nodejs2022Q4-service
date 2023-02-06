import { Injectable } from '@nestjs/common';
import { Artist } from './interface/artist.interface';

const artists: Artist[] = [];

@Injectable()
export class ArtistService {
  getHello(): Artist[] {
    return artists;
  }
}
