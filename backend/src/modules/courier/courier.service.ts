import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map, Observable } from 'rxjs';
import { GetYTPlayListDto, SongDto } from './DTO';
import { songsFromYtMapper } from 'src/common/mapper/songsFromYtMapper';

@Injectable()
export class CourierService {
  constructor(private readonly httpService: HttpService) {}

  async convertToSpotifyPlayList(
    playlistLink: string,
    accessToken: string,
  ): Promise<Observable<SongDto[]>> {
    const playlistId = playlistLink.split('=')[1];
    return this.getYTPlayList(playlistId, accessToken).pipe(
      map(({ data }: GetYTPlayListDto) => {
        return this.transformSongsData(data.items);
      }),
      catchError(({ response }) => {
        const error = response.data.error;
        throw new HttpException(error.message, error.code);
      }),
    );
  }

  private transformSongsData(songs: SongDto[]) {
    const transformedSongs: SongDto[] = [];

    songs.map((song) => {
      const transformedSong = songsFromYtMapper(song);
      songs.push(transformedSong);
    });
    return transformedSongs;
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
