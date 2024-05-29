import { Module } from '@nestjs/common';
import { SpotifyOauthController } from './spotifyOauth.controller';
import { SpotifyOauthService } from './spotifyOauth.service';
import { SpotifyStrategy } from 'src/common/strategys/spotifyStrategy';

@Module({
  controllers: [SpotifyOauthController],
  providers: [SpotifyOauthService, SpotifyStrategy],
})
export class SpotifyOauthModule {}
