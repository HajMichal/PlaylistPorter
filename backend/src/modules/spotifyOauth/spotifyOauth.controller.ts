import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SpotifyOauthGuard } from 'src/common/guards/spotifyOauth.guard';
import { spotifyUserSchema } from './DTO';
import { SpotifyOauthService } from './spotifyOauth.service';

@Controller('auth/spotify')
export class SpotifyOauthController {
  constructor(private spotifyService: SpotifyOauthService) {}

  @Get()
  @UseGuards(SpotifyOauthGuard)
  async oAuth() {}

  @Get('callback')
  @UseGuards(SpotifyOauthGuard)
  @Redirect('http://localhost:5173')
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    this.spotifyService.setSpotifyCookies(
      res,
      req.user.accessToken,
      req.user.refreshToken,
    );
    return spotifyUserSchema.parse(req.user);
  }
}
