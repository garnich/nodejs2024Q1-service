import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    RelationOptions,
} from 'typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { FavouriteEntity } from './favorite.entity';

const RELATIONS_OPTIONS: RelationOptions = {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: true,
    eager: true,
  };

@Entity('tracks')
export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    name: string;

    @Column({ nullable: true })
    albumId: string;

    @Column({ nullable: true })
    artistId: string;

    @Column()
    duration: number;

    @Exclude()
    @ManyToOne(() => AlbumEntity, RELATIONS_OPTIONS)
    @JoinColumn()
    album: AlbumEntity;
    
    @Exclude()
    @ManyToOne(() => ArtistEntity, RELATIONS_OPTIONS)
    @JoinColumn()
    artist: ArtistEntity;
  
    @Exclude()
    @ManyToOne(() => FavouriteEntity, (favorites) => favorites.tracks)
    favorites: FavouriteEntity;
}
