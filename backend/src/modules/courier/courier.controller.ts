import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CourierService } from './courier.service';
import { Cookies } from 'src/common/decorators/cookies.decorator';
import { OauthGuard } from 'src/common/guards/oAuth.guard';

@Controller('courier')
export class CourierController {
  constructor(private courierService: CourierService) {}

  @Get('youtube/spotify')
  @UseGuards(OauthGuard)
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
