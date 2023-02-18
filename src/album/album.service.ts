import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Track } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';
import { validate } from 'uuid';
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
    const createAlbum = this.albumRepository.create(AlbumDto);
    return await this.albumRepository.save(createAlbum);
  }

  async findOne(id: string): Promise<Album> {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }

    const album: Album | null = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async updateOne(albumDto: CreateUpdateAlbumDto, id: string): Promise<Album> {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
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

  async delete(id: string) {
    const compareId = validate(id);

    if (!compareId) {
      throw new BadRequestException('Id is not valid');
    }
    const album = await this.albumRepository.delete(id);
    if (album.affected === 0) throw new NotFoundException('Album is not found');
    const track = await this.trackRepository.findOne({
      where: { albumId: id },
    });

    if (track) {
      track.albumId = null;
      await this.trackRepository.save(track);
    }
    const favorite = (
      await this.favoriteRepository.find({ relations: { albums: true } })
    )[0];
    const indexFav = favorite.albums.findIndex((album) => album.id === id);
    favorite.albums.splice(indexFav, 1);
    await this.favoriteRepository.save(favorite);
  }
}
