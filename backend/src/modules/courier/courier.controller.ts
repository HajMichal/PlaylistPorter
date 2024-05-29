import { Body, Controller, Post } from '@nestjs/common';
import { CourierService } from './courier.service';

@Controller('courier')
export class CourierController {
  constructor(private courierService: CourierService) {}

  // [TODO]: check is user authorized by youtube and spotify
  @Post('youtube/spotify')
  convertToSpotifyPlayList(@Body() body: { playlistLink: string }) {
    console.log(body);
    return this.courierService.convertToSpotifyPlayList(body.playlistLink);
  }
}
