import { IAlbums } from 'src/albums/albums.interface';
import { IArtists } from 'src/artists/artists.interface';
import { ITracks } from 'src/tracks/tracks.interface';

export interface IFavorites {
  artists: IArtists[];
  albums: IAlbums[];
  tracks: ITracks[];
}
