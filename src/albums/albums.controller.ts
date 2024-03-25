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
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumDto } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { IAlbums } from './albums.interface';
import { AlbumsService } from './albums.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
} from 'src/helpers';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

import {
  EXEPTION_ITEM,
  EXEPTION_TYPE,
  HEADERS,
  UUID_VERSION,
} from 'src/constants';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumService: AlbumsService,
    private readonly trackService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async findAll(){
    return await this.albumService.getAlbums();
  }

  @Post()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async updateAlbum(
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isAlbumExist = await this.albumService.getAlbum(id);

      if (!isAlbumExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
      } else {
        return await this.albumService.updateAlbum(id, updateAlbumDto);
      }
    }
  }

  @Delete(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isAlbumExist = await this.albumService.getAlbum(id);

      if (!isAlbumExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
      } else {
        const isItemInFavorites =
          await this.favoritesService.isItemInFavorites(id, EXEPTION_TYPE.ALBUMS);

        if (isItemInFavorites) {
          await this.favoritesService.removeAlbumFromFavorites(id);
        }

        await this.albumService.deleteAlbum(id);
      }
    }
  }

  @Get(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const album = await this.albumService.getAlbum(id);

      if (!album) {
        throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
      } else {
        return album;
      }
    }
  }
}
