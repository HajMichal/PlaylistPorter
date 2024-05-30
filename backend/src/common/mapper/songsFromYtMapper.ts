import { SongDto } from 'src/modules/courier/DTO';

export const songsFromYtMapper = (song: SongDto) => {
  return {
    id: song.id,
    etag: song.etag,
    snippet: {
      title: song.snippet.title,
      videoOwnerChannelTitle: song.snippet.videoOwnerChannelTitle,
    },
  };
};
