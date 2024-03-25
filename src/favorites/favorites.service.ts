import { Injectable } from '@nestjs/common';
import { ITracks } from 'src/tracks/tracks.interface';
import { IAlbums } from 'src/albums/albums.interface';
import { IArtists } from 'src/artists/artists.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouriteEntity } from 'src/entities/favorite.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesDTO } from './dto/favorites.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavouriteEntity)
    private favoriteRepository: Repository<FavouriteEntity>,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
    private readonly trackService: TracksService,
  ) {}

  async getAll(): Promise<FavoritesDTO> {
    const favorites = await this.favoriteRepository.findOne({
      where: { id: 1 },
    });

    if (!favorites) {
      const createFavorites = this.favoriteRepository.create({
        tracks: [],
        albums: [],
        artists: [],
      });

      await this.favoriteRepository.save(createFavorites);

      return this.favoriteRepository.findOne({ where: { id: 1 } });
    }
    return favorites;
  }

  async addTrackToFavorites(id: string): Promise<void> {
    const track = await this.trackService.getTrack(id);

    const favorites = await this.getAll();

    favorites.tracks.push(track);

    await this.favoriteRepository.save(favorites);
  }

  async removeTrackFromFavorites(id: string): Promise<void> {
    const favorites = await this.getAll();

    favorites.tracks = favorites.tracks.filter((track) => track.id !== id);
    
    await this.favoriteRepository.save(favorites);  
  }

  async addAlbumToFavorites(id: string): Promise<void> {
    const album = await this.albumService.getAlbum(id);

    const favorites = await this.getAll();

    favorites.albums.push(album);

    await this.favoriteRepository.save(favorites);
  }

  async removeAlbumFromFavorites(id: string): Promise<void> {
    const favorites = await this.getAll();

    favorites.albums = favorites.albums.filter((album) => album.id !== id);
    
    await this.favoriteRepository.save(favorites); 
  }

  async addArtistToFavorites(id: string): Promise<void> {
    const artist = await this.artistService.getArtist(id);

    const favorites = await this.getAll();

    favorites.artists.push(artist);

    await this.favoriteRepository.save(favorites);
  }

  async removeArtistFromFavorites(id: string): Promise<void> {
    const favorites = await this.getAll();

    favorites.artists = favorites.artists.filter((artist) => artist.id !== id);
    
    await this.favoriteRepository.save(favorites); 
  }

  async isItemInFavorites(id: string, type: string): Promise<boolean> {
    const favorites = await this.getAll();
    const ItemForSearch = favorites[type] as Array<
      IAlbums | ITracks | IArtists
    >;
    const item = ItemForSearch.find(
      (item: IAlbums | ITracks | IArtists) => item.id === id,
    );

    return !!item;
  }
}
