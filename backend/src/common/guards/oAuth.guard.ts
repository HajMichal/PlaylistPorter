import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import axios from 'axios';

@Injectable()
export class OauthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { googleAccessToken, spotifyAccessToken } = request.cookies;

    if (!googleAccessToken || !spotifyAccessToken)
      throw new UnauthorizedException();

    return this.validateGoogleAccessToken(googleAccessToken)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async validateGoogleAccessToken(googleAccessToken: string) {
    try {
      await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${googleAccessToken}`,
      );
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
