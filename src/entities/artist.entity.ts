import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FavouriteEntity } from './favorite.entity';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @Exclude()
  @ManyToOne(() => FavouriteEntity, (favorites) => favorites.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  favorites: FavouriteEntity;
}
