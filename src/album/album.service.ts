import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateUpdateAlbumDto } from './dto/create-update-album.dto';
import { Album } from './entities/album.entity';

export const albums: Album[] = [];

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}
  async find(): Promise<Album[]> {
    return await this.albumRepository.find();
  }

  async create(AlbumDto: CreateUpdateAlbumDto): Promise<Album> {
    const createAlbum = await this.albumRepository.create(AlbumDto);
    return await this.albumRepository.save(createAlbum);
  }

  async findOne(id: string): Promise<Album> {
    const album: Album | null = await this.albumRepository.findOne({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('User not found');
    }

    return album;
  }

  async updateOne(albumDto: CreateUpdateAlbumDto, id: string): Promise<Album> {
    let album: Album | null = await this.albumRepository.findOne({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException('User not found');
    }

    album = { id: album.id, ...albumDto };
    await this.albumRepository.save(album);
    return album;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async updateArtistId(id: string) {}

  async delete(id: string) {
    await this.albumRepository.delete(id);
    const track = (
      await this.trackRepository.find({ where: { albumId: id } })
    )[0];
    track.albumId = null;
    await this.trackRepository.save(track);
    const favorite = (
      await this.favoriteRepository.find({ relations: { albums: true } })
    )[0];
    const indexFav = favorite.albums.findIndex((album) => album.id === id);
    favorite.albums.splice(indexFav, 1);
    await this.favoriteRepository.save(favorite);
  }
}
