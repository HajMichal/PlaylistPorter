import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { SpotifyOauthGuard } from 'src/common/guards/spotifyOauth.guard';

@Controller('auth/spotify')
export class SpotifyOauthController {
  constructor() {}

  @Get()
  @UseGuards(SpotifyOauthGuard)
  async oAuth() {}

  @Get('callback')
  @UseGuards(SpotifyOauthGuard)
  @Redirect('http://localhost:5173')
  async googleAuthCallback(@Req() req: Request) {
    return req.user;
  }
}
