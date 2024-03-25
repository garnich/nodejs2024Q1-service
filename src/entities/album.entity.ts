import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationOptions,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ArtistEntity } from './artist.entity';
import { FavouriteEntity } from './favorite.entity';

const RELATIONS_OPTIONS: RelationOptions = {
  nullable: true,
  onDelete: 'SET NULL',
  cascade: true,
  eager: true,
};

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @Exclude()
  @ManyToOne(() => ArtistEntity, RELATIONS_OPTIONS)
  artist: ArtistEntity;

  @Exclude()
  @ManyToOne(() => FavouriteEntity, (favorites) => favorites.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  favorites: FavouriteEntity;
}
