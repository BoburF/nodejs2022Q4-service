import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import { Track } from './interface/track.interface';

const tracks: Track[] = [];

@Injectable()
export class TrackService {
  find(): Track[] {
    return tracks;
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
    tracks.push(track);
    return track;
  }

  findOne(id: string): Track {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const track: Track | null = tracks.find((track) => id === track.id);

    if (!track) {
      throw new NotFoundException('User not found');
    }

    return track;
  }

  updateOne({ name, artistId, albumId, duration }, id: string): Track {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    let index: number | null;
    const track: Track | null = tracks.find((track, idx) => {
      if (track.id === id) {
        index = idx;
        return track;
      }
    });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    track.name = name;
    track.albumId = albumId;
    track.artistId = artistId;
    track.duration = duration;
    tracks[index] = track;

    return track;
  }
}
