import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbums } from './albums.interface';

@Injectable()
export class AlbumsService {
  private static albums: IAlbums[] = [];

  constructor() {
    AlbumsService.albums = [];
  }

  getAlbums(): IAlbums[] {
    return AlbumsService.albums;
  }

  createAlbum(album: CreateAlbumDto) {
    const artistId = album.artistId ? album.artistId : null;

    const newAlbum: IAlbums = {
      id: uuidv4(),
      name: album.name,
      artistId,
      year: album.year,
    };

    AlbumsService.albums.push(newAlbum);

    return newAlbum;
  }

  getAlbum(id: string): IAlbums {
    return AlbumsService.albums.find((album: IAlbums) => album.id === id);
  }

  updateAlbum(id: string, payload: UpdateAlbumDto): IAlbums {
    const idx = AlbumsService.albums.findIndex((album) => album.id === id);

    const newAlbumData = {
      name: payload.name ? payload.name : AlbumsService.albums[idx].name,
      year: payload.year ? payload.year : AlbumsService.albums[idx].year,
      artistId: payload.artistId
        ? payload.artistId
        : AlbumsService.albums[idx].artistId,
    };

    AlbumsService.albums[idx] = {
      ...AlbumsService.albums[idx],
      ...newAlbumData,
    };

    return AlbumsService.albums[idx];
  }

  deleteAlbum(id: string) {
    const idx = AlbumsService.albums.findIndex(
      (album: IAlbums) => album.id === id,
    );
    AlbumsService.albums = [
      ...AlbumsService.albums.slice(0, idx),
      ...AlbumsService.albums.slice(idx + 1),
    ];
  }

  removeNotExistingArtistId(id: string) {
    AlbumsService.albums = AlbumsService.albums.map((album: IAlbums) => ({
      ...album,
      artistId: album.artistId === id ? null : album.artistId,
    }));
  }
}
