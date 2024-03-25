import { AlbumEntity } from "src/entities/album.entity";
import { ArtistEntity } from "src/entities/artist.entity";
import { TrackEntity } from "src/entities/track.entity";

export interface FavoritesDTO {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}