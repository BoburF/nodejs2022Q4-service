import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/favorite/entities/favorite.entity';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { Track } from 'src/track/entities/track.entity';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';

@Module({
  imports: [
    FavoriteModule,
    TrackModule,
    TypeOrmModule.forFeature([Album, Favorite, Track]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
