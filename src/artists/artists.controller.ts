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
import { UpdateArtistDto } from './dto/update-artist.dto';

import { ArtistsService } from './artists.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
} from 'src/helpers';
import {
  EXEPTION_ITEM,
  HEADERS,
  UUID_VERSION,
} from 'src/constants';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistService: ArtistsService,
  ) {}

  @Get()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.artistService.getArtists();
  }

  @Post()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
  ) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async updateArtist(
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isArtistExist = await this.artistService.getArtist(id);

      if (!isArtistExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ARTIST);
      } else {
        return await this.artistService.updateArtist(id, updateArtistDto);
      }
    }
  }

  @Delete(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isArtistExist = await this.artistService.getArtist(id);

      if (!isArtistExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ARTIST);
      } else {
        await this.artistService.deleteArtist(id);
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
      const isArtistExist = await this.artistService.getArtist(id);

      if (!isArtistExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.ARTIST);
      } else {
        return await this.artistService.getArtist(id);
      }
    }
  }
}
