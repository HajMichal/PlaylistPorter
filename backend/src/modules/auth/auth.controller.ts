import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOauthGuard } from 'src/common/guards/googleOAuth.guard';

@Controller('auth/google')
export class AuthController {
  constructor() {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async oAuth() {}

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  @Redirect('http://localhost:5173/')
  async googleAuthCallback(@Req() req: Request) {
    return req.user;
  }
}
