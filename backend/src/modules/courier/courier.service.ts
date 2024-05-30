import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable } from 'rxjs';

export interface YoutubePlaylistResponse {
  data: {
    items: SongType[];
  };
}
export interface SongType {
  id: string;
  etag: string;
  snippet: {
    title: string;
    videoOwnerChannelTitle: string;
  };
}

@Injectable()
export class CourierService {
  constructor(private readonly httpService: HttpService) {}

  async convertToSpotifyPlayList(
    playlistLink: string,
    accessToken: string,
  ): Promise<Observable<SongType[]>> {
    const playlistId = playlistLink.split('=')[1];
    return this.getYTPlayList(playlistId, accessToken).pipe(
      map(({ data }: YoutubePlaylistResponse) => {
        const songs: SongType[] = [];

        data.items.map((song) => {
          const transformedSong = {
            id: song.id,
            etag: song.etag,
            snippet: {
              title: song.snippet.title,
              videoOwnerChannelTitle: song.snippet.videoOwnerChannelTitle,
            },
          };
          songs.push(transformedSong);
        });
        return songs;
      }),
      catchError(({ response }) => {
        const error = response.data.error;
        throw new HttpException(error.message, error.code);
      }),
    );
  }

  private getYTPlayList(playlistId: string, accessToken: string) {
    return this.httpService.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
  }
}
