import { Module } from '@nestjs/common';
import { CourierModule } from './modules/courier/courier.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { OAuthModule } from './modules/oAuth/oAuth.module';
import { SpotifyModule } from './modules/spotify/spotify.module';
import { YoutubeModule } from './modules/youtube/youtube.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    CourierModule,
    PassportModule.register({ session: true }),
    OAuthModule,
    SpotifyModule,
    YoutubeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
