import { SpotifySongDto } from 'src/modules/spotify/DTO';

export const songsFromSpotifyMapper = (song: SpotifySongDto) => {
  return `spotify:track:${song.id}`;
};
