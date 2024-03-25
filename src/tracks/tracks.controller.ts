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
import {
  EXEPTION_ITEM,
  EXEPTION_TYPE,
  HEADERS,
  UUID_VERSION,
} from 'src/constants';
import { FavoritesService } from 'src/favorites/favorites.service';
import {
  IDValidator,
  invalidIdExeption,
  itemNotExistExeption,
} from 'src/helpers';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackDto } from './dto/track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { ITracks } from './tracks.interface';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(
    private readonly trackService: TracksService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.trackService.getTracks();
  }

  @Post()
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Body(new ValidationPipe()) createTrackDto: CreateTrackDto,
  ) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.OK)
  async updateTrack(
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isTrackExist = await this.trackService.getTrack(id);

      if (!isTrackExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.TRACK);
      } else {
        return await this.trackService.updateTrack(id, updateTrackDto);
      }
    }
  }

  @Delete(':id')
  @Header(HEADERS.ACCEPT, HEADERS.APP_JSON)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: UUID_VERSION })) id: string,
  ) {
    if (!IDValidator(id)) {
      throw invalidIdExeption();
    } else {
      const isTrackExist = await this.trackService.getTrack(id);

      if (!isTrackExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.TRACK);
      } else {
        const isItemInFavorites =
          this.favoritesService.isItemInFavorites(id, EXEPTION_TYPE.TRACKS);

        if (isItemInFavorites) {
          this.favoritesService.removeTrackFromFavorites(id);
        }

        await this.trackService.deleteTrack(id);
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
      const isTrackExist = await this.trackService.getTrack(id);

      if (!isTrackExist) {
        throw itemNotExistExeption(EXEPTION_ITEM.TRACK);
      } else {
        return await this.trackService.getTrack(id);
      }
    }
  }
}
