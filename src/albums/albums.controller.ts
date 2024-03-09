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
  } from '../common/helpers';
  import { TracksService } from 'src/tracks/tracks.service';
  
  import {
    EXEPTION_ITEM,
    HEADERS,
    UUID_VERSION,
  } from '../common/constansts';
  
  @Controller('album')
  export class AlbumsController {
    constructor(
      private readonly albumService: AlbumsService,
      private readonly trackService: TracksService,
    ) {}
  
    @Get()
    @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
    @HttpCode(HttpStatus.OK)
    findAll(): IAlbums[] {
      return this.albumService.getAlbums();
    }
  
    @Post()
    @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
    @HttpCode(HttpStatus.CREATED)
    createAlbum(
      @Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto,
    ): IAlbums {
      return this.albumService.createAlbum(createAlbumDto);
    }
  
    @Put(':id')
    @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
    @HttpCode(HttpStatus.OK)
    updateAlbum(
      @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
      @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    ): AlbumDto {
      if (!IDValidator(id)) {
        throw invalidIdExeption();
      } else {
        const isAlbumExist = !!this.albumService.getAlbum(id);
  
        if (!isAlbumExist) {
          throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
        } else {
          return this.albumService.updateAlbum(id, updateAlbumDto);
        }
      }
    }
  
    @Delete(':id')
    @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteAlbum(
      @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    ) {
      if (!IDValidator(id)) {
        throw invalidIdExeption();
      } else {
        const isAlbumExist = !!this.albumService.getAlbum(id);
  
        if (!isAlbumExist) {
          throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
        } 

        this.albumService.deleteAlbum(id);
        this.trackService.removeNotExistingAlbumId(id);
      }
    }
  
    @Get(':id')
    @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
    @HttpCode(HttpStatus.OK)
    findById(
      @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
    ): IAlbums {
      if (!IDValidator(id)) {
        throw invalidIdExeption();
      } else {
        const album = this.albumService.getAlbum(id);
  
        if (!album) {
          throw itemNotExistExeption(EXEPTION_ITEM.ALBUM);
        } else {
          return album;
        }
      }
    }
  }
  