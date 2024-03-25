import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TrackEntity } from 'src/entities/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TracksController],
  imports: [
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
