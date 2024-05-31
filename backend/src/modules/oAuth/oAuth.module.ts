import { Module } from '@nestjs/common';
import { OAuthController } from './oAuth.controller';
import { OAuthService } from './oAuth.service';
import { SpotifyStrategy } from 'src/common/strategys/spotifyStrategy';
import { GoogleStrategy } from 'src/common/strategys/googleStrategy';

@Module({
  controllers: [OAuthController],
  providers: [OAuthService, SpotifyStrategy, GoogleStrategy],
})
export class OAuthModule {}
