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
    playlistLink: string,
    googleAccessToken: string,
    spotifyAccessToken: string,
  ): Promise<YtSongDto[]> {
    const playlistId = playlistLink.split('=')[1];
    const songs = await this.youtubeService.formatedYtSongs(
      playlistId,
      googleAccessToken,
    );
    this.spotifyService.searchSpotifySongs(songs, spotifyAccessToken);
    return songs;
  }
}
