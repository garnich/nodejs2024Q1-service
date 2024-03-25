import { Module, forwardRef } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistsModule } from 'src/artists/artists.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteEntity } from 'src/entities/favorite.entity';

@Module({
  providers: [FavoritesService],
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    TypeOrmModule.forFeature([FavouriteEntity]),
  ],
  controllers: [FavoritesController],
  exports: [FavoritesService],
})
export class FavoritesModule {}
