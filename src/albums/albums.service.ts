import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbums } from './albums.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';
import { Repository } from 'typeorm';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    private readonly artistService: ArtistsService,
  ) {}

  async getAlbums(): Promise<AlbumEntity[]> {
    return this.albumRepository.find();
  }

  async createAlbum(album: CreateAlbumDto) {
    const artistId = this.artistService.getArtist(album.artistId ) ? album.artistId : null;
    

    const newAlbum: IAlbums = {
      id: uuidv4(),
      name: album.name,
      artistId,
      year: album.year,
    };

    const createAlbum = this.albumRepository.create(newAlbum);

    return await this.albumRepository.save(createAlbum);
  }

  async getAlbum(id: string): Promise<AlbumEntity> {
    return await this.albumRepository.findOne({ where: { id } });

  }

  async updateAlbum(id: string, payload: UpdateAlbumDto): Promise<AlbumEntity> {    
    payload.artistId =  this.artistService.getArtist(payload.artistId) ? payload.artistId : null;
    const album = await this.getAlbum(id);

    Object.assign(album, payload);
    await this.albumRepository.save(album);

    return this.getAlbum(id);
  }

  async deleteAlbum(id: string) {
    return await this.albumRepository.delete(id);

  }
}
