import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from 'src/common/guards/googleOauth.guard';
import { googleUserSchema } from './DTO';
@Controller('auth/google')
export class GoogleOauthController {
  constructor() {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async oAuth() {}

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  @Redirect('http://localhost:5173')
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    res.cookie('googleAccessToken', req.user.accessToken, {
      secure: true,
      httpOnly: true,
    });
    return googleUserSchema.parse(req.user);
  }
}
