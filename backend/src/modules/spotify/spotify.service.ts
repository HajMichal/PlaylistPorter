import { HttpException, Injectable } from '@nestjs/common';
import { YtSongDto } from '../youtube/DTO';
import { GetSpotifySongDto } from './DTO';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { songsFromSpotifyMapper } from 'src/common/mapper/songsFromSpotifyMapper';

@Injectable()
export class SpotifyService {
  constructor(private readonly httpService: HttpService) {}

  async searchSpotifySongs(
    songs: YtSongDto[],
    accessToken: string,
    playlistId: string,
  ) {
    try {
      const spotifySongsUris = await this.mapSongsToSpotifyFormat(
        songs,
        accessToken,
      );
      await this.addSongsToPlaylist(playlistId, spotifySongsUris, accessToken);
    } catch (error) {
      const errResponse = error.response.data.error;
      throw new HttpException(errResponse.message, errResponse.code);
    }
  }

  private async mapSongsToSpotifyFormat(
    songs: YtSongDto[],
    accessToken: string,
  ) {
    return Promise.all(
      songs.map(async ({ snippet }) => {
        const { data } = await this.getSongRequest(snippet.title, accessToken);
        return songsFromSpotifyMapper(data.tracks.items[0].id);
      }),
    );
  }

  private getSongRequest(
    searchedSong: string,
    accessToken: string,
  ): Promise<GetSpotifySongDto> {
    // firstValueFrom is converting Observable to Promise
    return firstValueFrom(
      this.baseHttpGetService(
        `search?q=${searchedSong}&type=track`,
        accessToken,
      ),
    );
  }

  private async addSongsToPlaylist(
    playlistId: string,
    spotifySongsUris: string[],
    accessToken: string,
  ) {
    return await firstValueFrom(
      this.baseHttpPostService(
        `playlists/${playlistId}/tracks`,
        spotifySongsUris,
        accessToken,
      ),
    );
  }

  private baseHttpGetService(queryParamsUrl: string, accessToken: string) {
    return this.httpService.get(
      `https://api.spotify.com/v1/${queryParamsUrl}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
  private baseHttpPostService(
    queryParamsUrl: string,
    body: string[],
    accessToken: string,
  ) {
    return this.httpService.post(
      `https://api.spotify.com/v1/${queryParamsUrl}`,
      {
        uris: body,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
  }
}
