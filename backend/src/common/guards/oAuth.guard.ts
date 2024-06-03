import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { OAuthService } from 'src/modules/oAuth/oAuth.service';
import { Response } from 'express';

@Injectable()
export class OauthGuard implements CanActivate {
  constructor(private oAuthService: OAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const { googleAccessToken, spotifyAccessToken } = request.cookies;

    if (!googleAccessToken || !spotifyAccessToken)
      throw new UnauthorizedException();

    const isGoogleValid = await this.isGoogleTokenValid(googleAccessToken);
    const isSpotifyValid = await this.isSpotifyTokenValid(
      spotifyAccessToken,
      response,
    );

    if (isGoogleValid && isSpotifyValid) return true;
    else return false;
  }

  private async isGoogleTokenValid(
    googleAccessToken: string,
  ): Promise<boolean> {
    try {
      await this.checkGoogleTokenReq(googleAccessToken);
      return true;
    } catch {
      return false;
    }
  }

  private async isSpotifyTokenValid(
    spotifyAccessToken: string,
    response: Response,
  ): Promise<boolean> {
    try {
      await this.checkSpotifyTokenReq(spotifyAccessToken);
      return true;
    } catch {
      return !!this.oAuthService.refreshSpotifyToken(
        spotifyAccessToken,
        response,
      );
    }
  }

  async checkGoogleTokenReq(googleAccessToken: string) {
    try {
      await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${googleAccessToken}`,
      );
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
  async checkSpotifyTokenReq(spotifyAccessToken: string) {
    try {
      await axios.get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
        },
      });
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
