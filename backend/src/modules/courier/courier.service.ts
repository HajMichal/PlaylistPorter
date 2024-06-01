import { Injectable } from '@nestjs/common';
import { YtSongDto } from '../youtube/DTO';
import { YoutubeService } from '../youtube/youtube.service';
import { SpotifyService } from '../spotify/spotify.service';

@Injectable()
export class CourierService {
  constructor(
    private youtubeService: YoutubeService,
    private spotifyService: SpotifyService,
  ) {}

  async convertToSpotifyPlayList(
    youtubePlaylistLink: string,
    spotifyPlaylistLink: string,
    googleAccessToken: string,
    spotifyAccessToken: string,
  ): Promise<YtSongDto[]> {
    const youtubePlaylistId = youtubePlaylistLink.split('=')[1];
    const spotifyPlaylistId = spotifyPlaylistLink.split('/').reverse()[0];

    const songs = await this.youtubeService.formatedYtSongs(
      youtubePlaylistId,
      googleAccessToken,
    );
    await this.spotifyService.searchSpotifySongs(
      songs,
      spotifyAccessToken,
      spotifyPlaylistId,
    );
    return songs;
  }
}
