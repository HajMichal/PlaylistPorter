import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OAuthService {
  constructor(private httpService: HttpService) {}

  setGoogleCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('googleAccessToken', accessToken, {
      secure: true,
      httpOnly: true,
    });
    res.cookie('googleRefreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
    });
    // I can't use @Redirect in controller module because it's not working correctly with env variables
    res.redirect(process.env.CLIENT_URL);
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
    res.redirect(process.env.CLIENT_URL);
  }

  async refreshSpotifyToken(refreshToken: string, res: Response) {
    const accessToken = await this.refreshTokenRequest(refreshToken);
    res.cookie('spotifyAccessToken', accessToken);
    return { status: 200, message: 'Spotify token has been refreshed' };
  }

  private async refreshTokenRequest(refreshToken: string) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientKey = process.env.SPOTIFY_CLIENT_KEY;
    const buffer = Buffer.from(clientId + ':' + clientKey).toString('base64');

    const refreshTokenParams = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://accounts.spotify.com/api/token',
          refreshTokenParams,
          {
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
              Authorization: 'Basic ' + buffer,
            },
          },
        ),
      );
      return response.data.access_token;
    } catch ({ data }) {
      return data;
    }
  }
}
