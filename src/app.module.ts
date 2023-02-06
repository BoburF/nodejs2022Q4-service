import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
