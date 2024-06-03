import { ArrowIcon, SpotifyIcon, YoutubeIcon } from "../icons";

export const PlatformInfo = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center p-10">
      <YoutubeIcon />
      <ArrowIcon />
      <SpotifyIcon color="#27b855" />
    </div>
  );
};
