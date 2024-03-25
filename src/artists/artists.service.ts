import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtists } from './artists.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async createArtist(artist: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: IArtists = {
      id: uuidv4(),
      name: artist.name,
      grammy: artist.grammy,
    };

    const createdArtist = this.artistRepository.create(newArtist);

    return this.artistRepository.save(createdArtist);
  }

  async getArtist(id: string): Promise<ArtistEntity> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async updateArtist(id: string, payload: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = await this.getArtist(id);

    Object.assign(artist, payload);

    return this.artistRepository.save(artist);
  }

  async deleteArtist(id: string) {
    await this.artistRepository.delete(id);
  }
}
