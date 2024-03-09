import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TracksModule } from 'src/tracks/tracks.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  controllers: [AlbumsController],
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
