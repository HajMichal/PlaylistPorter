import { HttpException, Injectable } from '@nestjs/common';
import { YtSongDto } from '../youtube/DTO';
import { GetSpotifySongDto } from './DTO';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SpotifyService {
  constructor(private readonly httpService: HttpService) {}

  searchSpotifySongs(songs: YtSongDto[], spotifyAccessToken: string) {
    try {
      songs.map(async ({ snippet }) => {
        const songFromSpotifyRequest = this.getSongFromSpotifyRequest(
          snippet.title,
          spotifyAccessToken,
        );
        const { data } = await songFromSpotifyRequest;
        console.log(data.tracks.items[0]?.name);
      });
    } catch (error) {
      const errResponse = error.response.data.error;
      throw new HttpException(errResponse.message, errResponse.code);
    }
  }

  private getSongFromSpotifyRequest(
    searchedSong: string,
    accessToken: string,
  ): Promise<GetSpotifySongDto> {
    // firstValueFrom is converting Observable to Promise
    return firstValueFrom(
      this.baseHttpService(`search?q=${searchedSong}&type=track`, accessToken),
    );
  }
  private baseHttpService(queryParamsUrl: string, accessToken: string) {
    return this.httpService.get(
      `https://api.spotify.com/v1/${queryParamsUrl}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}
