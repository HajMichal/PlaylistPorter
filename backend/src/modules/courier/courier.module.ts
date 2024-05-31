import { Module } from '@nestjs/common';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';
import { HttpModule } from '@nestjs/axios';
import { YoutubeModule } from '../youtube/youtube.module';
import { SpotifyModule } from '../spotify/spotify.module';
import { YoutubeService } from '../youtube/youtube.service';
import { SpotifyService } from '../spotify/spotify.service';

@Module({
  imports: [HttpModule, YoutubeModule, SpotifyModule],
  controllers: [CourierController],
  providers: [CourierService, YoutubeService, SpotifyService],
})
export class CourierModule {}
