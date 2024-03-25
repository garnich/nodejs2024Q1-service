import { Module, forwardRef } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/entities/artist.entity';

@Module({
  controllers: [ArtistsController],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => FavoritesModule),
    TypeOrmModule.forFeature([ArtistEntity])
  ],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
