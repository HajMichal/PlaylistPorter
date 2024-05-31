import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GetYTPlayListDto, SongDto } from './DTO';
import { songsFromYtMapper } from 'src/common/mapper/songsFromYtMapper';

@Injectable()
export class CourierService {
  constructor(private readonly httpService: HttpService) {}

  async convertToSpotifyPlayList(
    playlistLink: string,
    googleAccessToken: string,
    spotifyAccessToken: string,
  ): Promise<SongDto[]> {
    const playlistId = playlistLink.split('=')[1];
    const songs = await this.getYtPlaylistSongs(playlistId, googleAccessToken);
    const spotifySongs = this.searchSpotifySongs(songs, spotifyAccessToken);
    return songs;
  }

  private transformSongsData(songs: SongDto[]) {
    const transformedSongs: SongDto[] = [];
    songs.map((song) => {
      const transformedSong = songsFromYtMapper(song);
      transformedSongs.push(transformedSong);
    });
    return transformedSongs;
  }

  private async getYtPlaylistSongs(
    playlistId: string,
    googleAccessToken: string,
  ) {
    try {
      const ytPlaylistRequest = this.getYtPlaylistRequest(
        playlistId,
        googleAccessToken,
      );
      const { data }: GetYTPlayListDto =
        await firstValueFrom(ytPlaylistRequest);
      return this.transformSongsData(data.items);
    } catch (error) {
      const errResponse = error.response.data.error;
      throw new HttpException(errResponse.message, errResponse.code);
    }
  }
  private getYtPlaylistRequest(playlistId: string, accessToken: string) {
    return this.httpService.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.GOOGLE_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
  }

  private searchSpotifySongs(songs: SongDto[], spotifyAccessToken: string) {
    songs.map(({ snippet }) => {
      this.searchSpotifySongRequest(snippet.title, spotifyAccessToken).forEach(
        ({ data }) => {
          if (data !== undefined) console.log(data.tracks.items[0]?.name);
        },
      );
    });
  }

  private searchSpotifySongRequest(searchedSong: string, accessToken: string) {
    return this.httpService.get(
      `https://api.spotify.com/v1/search?q=track:${searchedSong}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }
}
