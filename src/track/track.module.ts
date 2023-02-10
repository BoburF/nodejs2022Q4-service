import { Module } from '@nestjs/common';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [FavoriteModule],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
