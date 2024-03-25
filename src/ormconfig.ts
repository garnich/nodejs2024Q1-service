import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from './entities/artist.entity';
import { TrackEntity } from './entities/track.entity';
import { UserEntity } from './entities/user.entity';

export const ormConfig: TypeOrmModuleAsyncOptions = {
  useFactory:async ():Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: 'postgres',
      port: +(process.env.POSTGRES_PORT as string) as number,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      retryAttempts: 3,
      entities: [UserEntity, ArtistEntity, AlbumEntity, TrackEntity],
      migrations: ['dist/migration/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: false,
    }
  }
}
