import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SpotifyOauthGuard } from 'src/common/guards/spotifyOauth.guard';
import { spotifyUserSchema } from './DTO';

@Controller('auth/spotify')
export class SpotifyOauthController {
  constructor() {}

  @Get()
  @UseGuards(SpotifyOauthGuard)
  async oAuth() {}

  @Get('callback')
  @UseGuards(SpotifyOauthGuard)
  @Redirect('http://localhost:5173')
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    console.log(req.cookies);
    res.cookie('spotifyAccessToken', req.user.accessToken, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('spotifyRefreshToken', req.user.refreshToken, {
      secure: true,
      httpOnly: true,
    });
    return spotifyUserSchema.parse(req.user);
  }
}
