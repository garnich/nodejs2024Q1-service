import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TrackEntity } from 'src/entities/track.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITracks } from './tracks.interface';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  async getTracks(): Promise<TrackEntity[]> {
    return this.trackRepository.find();
  }

  async createTrack(track: CreateTrackDto): Promise<TrackEntity> {
    const artistId = this.artistService.getArtist(track.artistId ) ? track.artistId : null;
    const albumId = this.albumService.getAlbum(track.albumId) ? track.albumId  : null;

    const newTrack: ITracks = {
      id: uuidv4(),
      name: track.name,
      albumId,
      artistId,
      duration: track.duration,
    };

    const createTrack = this.trackRepository.create(newTrack);

    return await this.trackRepository.save(createTrack);
  }

  async getTrack(id: string): Promise<TrackEntity> {
    return await this.trackRepository.findOne({ where: { id } });
  }

  async updateTrack(id: string, payload: UpdateTrackDto): Promise<TrackEntity> {
    payload.artistId =  this.artistService.getArtist(payload.artistId) ? payload.artistId : null;
    payload.albumId = this.albumService.getAlbum(payload.albumId) ? payload.albumId : null;
    const track = await this.getTrack(id);

    Object.assign(track, payload);
    await this.trackRepository.save(track);

    return this.getTrack(id);
  }

  async deleteTrack(id: string) {
    await this.trackRepository.delete(id);
  }
}
