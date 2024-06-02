import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class OAuthService {
  setGoogleCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('googleAccessToken', accessToken, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('googleRefreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
    });
  }

  setSpotifyCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('spotifyAccessToken', accessToken, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('spotifyRefreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
    });
  }
}
