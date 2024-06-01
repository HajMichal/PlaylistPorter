import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

interface GoogleProfile {
  id: string;
  provider: string;
  displayName: string;
  email: string;
  photos: {
    value: string;
    type: string;
  }[];
}
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_KEY,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: [
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
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, provider, displayName, email, photos } = profile;
    const user = {
      provider: provider,
      providerId: id,
      email: email,
      name: displayName,
      picture: photos[0].value,
      accessToken: _accessToken,
    };
    done(null, user);
  }
}
