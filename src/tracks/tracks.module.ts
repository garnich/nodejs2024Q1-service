import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  controllers: [TracksController],
  imports: [
    forwardRef(() => AlbumsModule),
  ],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
