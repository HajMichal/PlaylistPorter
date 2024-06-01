/** This mapping function changes song data to `spotify:track:song.id`, because this format is necessary to add the song to a Spotify playlist.*/
export const songsFromSpotifyMapper = (songId: string) => {
  return `spotify:track:${songId}`;
};
