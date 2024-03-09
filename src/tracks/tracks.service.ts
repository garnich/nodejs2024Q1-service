import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { ITracks } from "./tracks.interface";

@Injectable()
export class TracksService {
    private static tracks: ITracks[] = [];

    constructor() {
        TracksService.tracks = [];
    }

    getTracks(): ITracks[] {
        return TracksService.tracks;
    }

    createTrack(track: CreateTrackDto) {
        const albumId = track.albumId ? track.albumId : null;
        const artistId = track.artistId ? track.artistId : null;

        const newTrack: ITracks = {
          id: uuidv4(),
          name: track.name,
          albumId,
          artistId,
          duration: track.duration,
        };

        TracksService.tracks.push(newTrack);

        return newTrack;
      }

    getTrack(id: string): ITracks {
        return TracksService.tracks.find((track: ITracks) => track.id === id);
    }

    updateTrack(id: string, payload: UpdateTrackDto): ITracks {
        const idx = TracksService.tracks.findIndex((track) => track.id === id);

        const newTrackData = {
          name: payload.name ? payload.name : TracksService.tracks[idx].name,
          duration: payload.duration ? payload.duration: TracksService.tracks[idx].duration,
          albumId: payload.albumId ? payload.albumId: TracksService.tracks[idx].albumId,
          artistId: payload.artistId ? payload.artistId: TracksService.tracks[idx].artistId,
        };

        TracksService.tracks[idx] = {
          ...TracksService.tracks[idx],
          ...newTrackData
        };

        return TracksService.tracks[idx];
    }

    deleteTrack(id: string) {
      const idx = TracksService.tracks.findIndex((track: ITracks) => track.id === id);
      TracksService.tracks = [...TracksService.tracks.slice(0, idx), ...TracksService.tracks.slice(idx + 1)];
    }

    removeNotExistingAlbumId(id: string) {
        TracksService.tracks = TracksService.tracks.map((track: ITracks) => ({
          ...track,
          albumId: track.albumId === id ? null : track.albumId,
        }));
    }

    removeNotExistingArtistId(id: string) {
        TracksService.tracks = TracksService.tracks.map((track: ITracks) => ({
          ...track,
          artistId: track.artistId === id ? null : track.artistId,
        }));
      }
}
