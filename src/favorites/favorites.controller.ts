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
import { FavoritesService } from './favorites.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
  itemNotInFavoritesExeption,
} from 'src/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import {
  EXEPTION_ITEM,
  EXEPTION_TYPE,
  HEADERS,
  UUID_VERSION,
} from 'src/constants';

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
  findAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorite(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const track = this.trackService.getTrack(id);

      if (!track) {
        throw itemNotInFavoritesExeption(EXEPTION_ITEM.TRACK);
      } else {
        return this.favoritesService.addTrackToFavorites(id);
      }
    }
  }

  @Post('artist/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorite(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const artist = this.artistService.getArtist(id);

      if (!artist) {
        throw itemNotInFavoritesExeption(EXEPTION_ITEM.ARTIST);
      } else {
        return this.favoritesService.addArtistToFavorites(id);
      }
    }
  }

  @Post('album/:id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorite(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const album = this.albumService.getAlbum(id);

      if (!album) {
        throw itemNotInFavoritesExeption(EXEPTION_ITEM.ALBUM);
      } else {
        return this.favoritesService.addAlbumToFavorites(id);
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
        const isItemInFavorites =
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
        const isItemInFavorites =
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
        const isItemInFavorites =
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
