import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from 'src/common/guards/googleOauth.guard';
import { googleUserSchema } from './DTO';
import { GoogleOauthService } from './googleOauth.service';
@Controller('auth/google')
export class GoogleOauthController {
  constructor(private googleService: GoogleOauthService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async oAuth() {}

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  @Redirect('http://localhost:5173')
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    this.googleService.setGoogleCookies(res, req.user.accessToken);
    return googleUserSchema.parse(req.user);
  }
}
