import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GetYTPlayListDto, YtSongDto } from './DTO';
import { songsFromYtMapper } from 'src/common/mapper/songsFromYtMapper';

@Injectable()
export class YoutubeService {
  constructor(private readonly httpService: HttpService) {}

  async formatedYtSongs(playlistId: string, googleAccessToken: string) {
    try {
      const { data } = await this.getPlaylistRequest(
        playlistId,
        googleAccessToken,
      );
      return this.formatSongsData(data.items);
    } catch (error) {
      const { message, code } = error.response.data.error;
      throw new HttpException(message, code);
    }
  }

  private getPlaylistRequest(
    playlistId: string,
    accessToken: string,
  ): Promise<GetYTPlayListDto> {
    // firstValueFrom is converting Observable to Promise
    return firstValueFrom(
      this.baseHttpService(
        `playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}`,
        accessToken,
      ),
    );
  }

  private formatSongsData(songs: YtSongDto[]) {
    const transformedSongs: YtSongDto[] = [];
    songs.map((song) => transformedSongs.push(songsFromYtMapper(song)));
    return transformedSongs;
  }

  private baseHttpService(queryParamsUrl: string, accessToken: string) {
    return this.httpService.get(
      `https://youtube.googleapis.com/youtube/v3/${queryParamsUrl}&key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
  }
}
