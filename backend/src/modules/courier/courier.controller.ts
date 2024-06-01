import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CourierService } from './courier.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Cookies } from 'src/common/decorators/cookies.decorator';

@Controller('courier')
export class CourierController {
  constructor(private courierService: CourierService) {}

  // [TODO]: check is user authorized by youtube and spotify
  @Get('youtube/spotify')
  @UseGuards(AuthGuard)
  convertToSpotifyPlayList(
    @Query()
    query: { youtubePlaylistLink: string; spotifyPlaylistLink: string },
    @Cookies('googleAccessToken') googleAccessToken: string,
    @Cookies('spotifyAccessToken') spotifyAccessToken: string,
  ) {
    return this.courierService.convertToSpotifyPlayList(
      query.youtubePlaylistLink,
      query.spotifyPlaylistLink,
      googleAccessToken,
      spotifyAccessToken,
    );
  }
}
