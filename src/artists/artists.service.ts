import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtists } from './artists.interface';

@Injectable()
export class ArtistsService {
  private static atrists: IArtists[] = [];

  constructor() {
    ArtistsService.atrists = [];
  }

  getArtists(): IArtists[] {
    return ArtistsService.atrists;
  }

  createArtist(artist: CreateArtistDto) {
    const newArtist: IArtists = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    ArtistsService.atrists.push(newArtist);

    return newArtist;
  }

  getArtist(id: string): IArtists {
    return ArtistsService.atrists.find((artist: IArtists) => artist.id === id);
  }

  updateArtist(id: string, payload: UpdateArtistDto): IArtists {
    const idx = ArtistsService.atrists.findIndex((artist) => artist.id === id);

    const newArtistData = {
      name: payload.name ? payload.name : ArtistsService.atrists[idx].name,
      grammy:
        payload.grammy !== ArtistsService.atrists[idx].grammy
          ? payload.grammy
          : ArtistsService.atrists[idx].grammy,
    };

    ArtistsService.atrists[idx] = {
      ...ArtistsService.atrists[idx],
      ...newArtistData,
    };

    return ArtistsService.atrists[idx];
  }

  deleteArtist(id: string) {
    const idx = ArtistsService.atrists.findIndex(
      (track: IArtists) => track.id === id,
    );
    ArtistsService.atrists = [
      ...ArtistsService.atrists.slice(0, idx),
      ...ArtistsService.atrists.slice(idx + 1),
    ];
  }
}
