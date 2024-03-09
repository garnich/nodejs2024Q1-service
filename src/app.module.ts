import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.modeule';

@Module({
  imports: [TracksModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
