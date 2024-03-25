import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumEntity } from './entities/album.entity';
import { TrackEntity } from './entities/track.entity';
import { FavouriteEntity } from './entities/favorite.entity';
import 'dotenv/config';

const myDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +(process.env.POSTGRES_PORT as string) as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity, ArtistEntity, AlbumEntity, TrackEntity, FavouriteEntity],
  migrations: ['dist/migration/*{.ts,.js}'],
  logging: true,
  synchronize: false,
});
export default myDataSource;