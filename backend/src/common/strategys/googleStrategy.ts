import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_KEY,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [
        'openid',
        'profile',
        'email',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
      ],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, provider, displayName, emails, photos } = profile;
    const user = {
      provider: provider,
      providerId: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
      accessToken: _accessToken,
      refreshToken: _refreshToken,
    };
    done(null, user);
  }
}
