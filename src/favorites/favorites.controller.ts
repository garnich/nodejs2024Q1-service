import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { IFavorites } from './favorites.interface';
import { FavoritesService } from './favorites.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
  itemNotInFavoritesExeption,
} from '../common/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { ITracks } from 'src/tracks/tracks.interface';
import { IArtists } from 'src/artists/artists.interface';
import { IAlbums } from 'src/albums/albums.interface';
import {
  EXEPTION_ITEM,
  EXEPTION_TYPE,
  HEADERS,
  UUID_VERSION,
} from '../common/constants';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  findAll(): IFavorites {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorite(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ): ITracks {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const track: ITracks = this.trackService.getTrack(id);

      if (!track) {
        throw itemNotInFavoritesExeption(EXEPTION_ITEM.TRACK);
      } else {
        return this.favoritesService.addTrackToFavorites(track);
      }
    }
  }

  @Post('artist/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorite(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ): IArtists {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const artist: IArtists = this.artistService.getArtist(id);

      if (!artist) {
        throw itemNotInFavoritesExeption(EXEPTION_ITEM.ARTIST);
      } else {
        return this.favoritesService.addArtistToFavorites(artist);
      }
    }
  }

  @Post('album/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorite(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ): IAlbums {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const album: IAlbums = this.albumService.getAlbum(id);

      if (!album) {
        throw itemNotInFavoritesExeption(EXEPTION_ITEM.ALBUM);
      } else {
        return this.favoritesService.addAlbumToFavorites(album);
      }
    }
  }

  @Delete('track/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isTrackExist = !!this.trackService.getTrack(id);

      if (!isTrackExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.TRACK);
      } else {
        const isItemInFavorites: boolean =
          this.favoritesService.isItemInFavorites(id, EXEPTION_TYPE.TRACKS);

        if (!isItemInFavorites) {
          throw itemNotInFavoritesExeption(EXEPTION_ITEM.TRACK);
        } else {
          return this.favoritesService.removeTrackFromFavorites(id);
        }
      }
    }
  }

  @Delete('artist/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isArtistExist = !!this.artistService.getArtist(id);

      if (!isArtistExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ARTIST);
      } else {
        const isItemInFavorites: boolean =
          this.favoritesService.isItemInFavorites(id, EXEPTION_TYPE.ARTISTS);

        if (!isItemInFavorites) {
          throw itemNotInFavoritesExeption(EXEPTION_ITEM.ARTIST);
        } else {
          return this.favoritesService.removeArtistFromFavorites(id);
        }
      }
    }
  }

  @Delete('album/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isAlbumtExist = !!this.albumService.getAlbum(id);

      if (!isAlbumtExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
      } else {
        const isItemInFavorites: boolean =
          this.favoritesService.isItemInFavorites(id, EXEPTION_TYPE.ALBUMS);

        if (!isItemInFavorites) {
          throw itemNotInFavoritesExeption(EXEPTION_ITEM.ALBUM);
        } else {
          return this.favoritesService.removeAlbumFromFavorites(id);
        }
      }
    }
  }
}
