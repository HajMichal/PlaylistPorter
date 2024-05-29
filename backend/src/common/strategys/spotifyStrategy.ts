import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-spotify';

interface SpotifyProfile {
  id: string;
  provider: string;
  displayName: string;
  email: string;
  photos: {
    value: string;
  }[];
  profileUrl: string;
}
@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor() {
    super({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_KEY,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL,
      scope:
        'user-read-private user-read-email playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public',
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: SpotifyProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const { provider, id, displayName, email, photos, profileUrl } = profile;
    const user = {
      provider: provider,
      providerId: id,
      email: email,
      name: displayName,
      picture: photos[0].value,
      profileUrl: profileUrl,
    };
    done(null, user);
  }
}
