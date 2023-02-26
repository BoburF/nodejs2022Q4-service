import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AlbumModule } from './album/album.module';
import { DBModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configService),
    UserModule,
    DBModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    AuthModule
  ],
})
export class AppModule {}
