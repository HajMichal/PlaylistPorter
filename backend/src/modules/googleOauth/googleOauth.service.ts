import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class GoogleOauthService {
  constructor() {}
  setGoogleCookies(res: Response, accessToken) {
    res.cookie('googleAccessToken', accessToken, {
      secure: true,
      httpOnly: true,
    });
  }
}
