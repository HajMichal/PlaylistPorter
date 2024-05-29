import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

export interface YoutubePlaylistResponse {
  data: {
    items: {
      id: string;
      etag: string;
      snippet: {
        title: string;
        videoOwnerChannelTitle: string;
      };
    };
  };
}

@Injectable()
export class CourierService {
  constructor(private readonly httpService: HttpService) {}

  convertToSpotifyPlayList(playlistLink: string) {
    const playlistId = playlistLink.split('=')[1];
    return this.getYTPlayList(playlistId).pipe(
      map(({ data }: YoutubePlaylistResponse) => {
        console.log(data.items);
        return data.items;
      }),
    );
  }

  private getYTPlayList(playlistId) {
    return this.httpService.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${process.env.GOOGLE_API_KEY}`,
    );
  }
}
