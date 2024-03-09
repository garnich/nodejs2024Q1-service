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
  import {
    EXEPTION_ITEM,
    EXEPTION_TYPE,
    HEADERS,
    UUID_VERSION,
  } from '../common/constansts';
  
  @Controller('artist')
  export class ArtistsController {
    constructor(
      private readonly artistService: ArtistsService,
      private readonly trackService: TracksService,
      private readonly albumService: AlbumsService,
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
          this.artistService.deleteArtist(id);
          this.trackService.removeNotExistingArtistId(id);
          this.albumService.removeNotExistingArtistId(id);
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
  