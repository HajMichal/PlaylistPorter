import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SpotifyOauthService {
  constructor() {}
  setSpotifyCookies(res: Response, accessToken, refreshToken) {
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
