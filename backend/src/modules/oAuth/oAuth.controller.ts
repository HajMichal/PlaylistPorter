import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { OAuthService } from './oAuth.service';
import { GoogleOauthGuard } from 'src/common/guards/googleOauth.guard';
import { googleUserSchema, spotifyUserSchema } from './DTO';
import { Request, Response } from 'express';
import { SpotifyOauthGuard } from 'src/common/guards/spotifyOauth.guard';

@Controller('oauth/')
export class OAuthController {
  constructor(private oAuthService: OAuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleOauth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  @Redirect('http://localhost:5173')
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    this.oAuthService.setGoogleCookies(res, req.user.accessToken);
    return googleUserSchema.parse(req.user);
  }

  @Get('spotify')
  @UseGuards(SpotifyOauthGuard)
  async spotifyOauth() {}

  @Get('spotify/callback')
  @UseGuards(SpotifyOauthGuard)
  @Redirect('http://localhost:5173')
  async spotifyAuthCallback(@Req() req: Request, @Res() res: Response) {
    this.oAuthService.setSpotifyCookies(
      res,
      req.user.accessToken,
      req.user.refreshToken,
    );
    return spotifyUserSchema.parse(req.user);
  }
}
