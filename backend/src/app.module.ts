import { Module } from '@nestjs/common';
import { GoogleOauthModule } from './modules/googleOauth/googleOauth.module';
import { CourierModule } from './modules/courier/courier.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SpotifyOauthModule } from './modules/spotifyOauth/sportifyOauth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    GoogleOauthModule,
    CourierModule,
    SpotifyOauthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
