import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [FavoriteModule, TypeOrmModule.forFeature([Track])],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
