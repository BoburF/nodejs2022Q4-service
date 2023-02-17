import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [
    FavoriteModule,
    TrackModule,
    AlbumModule,
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
