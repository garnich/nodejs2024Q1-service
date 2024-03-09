import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistDto } from './dto/artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { IArtists } from './artists.interface';
import { ArtistsService } from './artists.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
} from '../common/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';

import {
  EXEPTION_ITEM,
  EXEPTION_TYPE,
  HEADERS,
  UUID_VERSION,
} from '../common/constants';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  findAll(): IArtists[] {
    return this.artistService.getArtists();
  }

  @Post()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  createArtist(
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
  ): IArtists {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  updateArtist(
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ): ArtistDto {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isArtistExist = !!this.artistService.getArtist(id);

      if (!isArtistExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ARTIST);
      } else {
        return this.artistService.updateArtist(id, updateArtistDto);
      }
    }
  }

  @Delete(':id')
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

        if (isItemInFavorites) {
          this.favoritesService.removeArtistFromFavorites(id);
        }

        this.artistService.deleteArtist(id);
        this.trackService.removeNotExistingArtistId(id);
        this.albumService.removeNotExistingArtistId(id);
        this.favoritesService.removeArtistFromFavorites(id);
      }
    }
  }

  @Get(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  findById(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isArtistExist = !!this.artistService.getArtist(id);

      if (!isArtistExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ARTIST);
      } else {
        return this.artistService.getArtist(id);
      }
    }
  }
}
