import { axiosBaseInstance } from "./axiosBase";

export const sendLinks = async (
  youtubePlaylistLink: string,
  spotifyPlaylistLink: string
) => {
  return await axiosBaseInstance.get("courier/youtube/spotify", {
    params: {
      youtubePlaylistLink,
      spotifyPlaylistLink,
    },
    withCredentials: true,
  });
};
