import { Module } from '@nestjs/common';
import { GoogleOauthController } from './googleOauth.controller';
import { GoogleOauthService } from './googleOauth.service';
import { GoogleStrategy } from 'src/common/strategys/googleStrategy';

@Module({
  controllers: [GoogleOauthController],
  providers: [GoogleOauthService, GoogleStrategy],
})
export class GoogleOauthModule {}
