import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  controllers: [AlbumsController],
  imports: [
    forwardRef(() => TracksModule), 
    forwardRef(() => FavoritesModule),
    forwardRef(() => ArtistsModule),
    TypeOrmModule.forFeature([AlbumEntity])
  ],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
