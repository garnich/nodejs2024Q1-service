import { Injectable } from '@nestjs/common';
import { IFavorites } from './favorites.interface';
import { ITracks } from 'src/tracks/tracks.interface';
import { IAlbums } from 'src/albums/albums.interface';
import { IArtists } from 'src/artists/artists.interface';

@Injectable()
export class FavoritesService {
  private static favorites: IFavorites;

  constructor() {
    FavoritesService.favorites = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  getAll(): IFavorites {
    return FavoritesService.favorites;
  }

  addTrackToFavorites(track: ITracks) {
    FavoritesService.favorites.tracks.push(track);

    return track;
  }

  removeTrackFromFavorites(id: string) {
    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter((track) => track.id !== id);
  }

  addAlbumToFavorites(album: IAlbums) {
    FavoritesService.favorites.albums.push(album);

    return album;
  }

  removeAlbumFromFavorites(id: string) {
    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter((album) => album.id !== id);

    FavoritesService.favorites.tracks = FavoritesService.favorites.tracks.map(
      (track) => ({
        ...track,
        albumId: track.albumId === id ? null : track.albumId,
      }),
    );
  }

  addArtistToFavorites(artist: IArtists) {
    FavoritesService.favorites.artists.push(artist);

    return artist;
  }

  removeArtistFromFavorites(id: string) {
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter((artist) => artist.id !== id);

    FavoritesService.favorites.tracks = FavoritesService.favorites.tracks.map(
      (track) => ({
        ...track,
        artistId: track.artistId === id ? null : track.artistId,
      }),
    );

    FavoritesService.favorites.albums = FavoritesService.favorites.albums.map(
      (album) => ({
        ...album,
        artistId: album.artistId === id ? null : album.artistId,
      }),
    );
  }

  isItemInFavorites(id: string, type: string): boolean {
    const ItemForSearch = FavoritesService.favorites[type] as Array<
      IAlbums | ITracks | IArtists
    >;
    const item = ItemForSearch.find(
      (item: IAlbums | ITracks | IArtists) => item.id === id,
    );

    return !!item;
  }
}
