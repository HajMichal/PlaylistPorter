import { YtSongDto } from 'src/modules/youtube/DTO';

const pattern = /\s-\sTopic/;
export const songsFromYtMapper = (song: YtSongDto) => {
  return {
    id: song.id,
    etag: song.etag,
    snippet: {
      title: song.snippet.title.split('-').reverse()[0],
      videoOwnerChannelTitle: song.snippet.videoOwnerChannelTitle.replace(
        pattern,
        '',
      ),
    },
  };
};
