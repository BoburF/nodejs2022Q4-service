import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [FavoriteModule, TrackModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
