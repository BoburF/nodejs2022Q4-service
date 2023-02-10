import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AlbumModule } from './album/album.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [
    UserModule,
    DBModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
  ],
})
export class AppModule {}
