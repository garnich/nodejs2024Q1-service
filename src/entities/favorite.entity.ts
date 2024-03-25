import { Entity, OneToMany, PrimaryColumn, RelationOptions } from "typeorm";
import { AlbumEntity } from "./album.entity";
import { ArtistEntity } from "./artist.entity";
import { TrackEntity } from "./track.entity";

const RELATIONS_OPTIONS: RelationOptions = {
  nullable: true,
  onDelete: 'SET NULL',
  cascade: true,
  eager: true,
};

@Entity('favourites')
export class FavouriteEntity {
    @PrimaryColumn({default:1})
    id: number;

    @OneToMany(() => AlbumEntity, (album) => album.favorites, RELATIONS_OPTIONS)
    albums: AlbumEntity[];

    @OneToMany(() => TrackEntity, (track) => track.favorites, RELATIONS_OPTIONS)
    tracks: TrackEntity[];

    @OneToMany(() => ArtistEntity, (album) => album.favorites, RELATIONS_OPTIONS)
    artists: ArtistEntity[];
}
