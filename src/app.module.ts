import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule],
  controllers: [AppController, ArtistController],
  providers: [AppService],
})
export class AppModule {}
