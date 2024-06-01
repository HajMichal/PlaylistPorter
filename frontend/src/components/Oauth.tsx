import { GoogleOauth, SpotifyOauth } from "./";

export const Oauth = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center items-center">
      <GoogleOauth />
      <SpotifyOauth />
    </div>
  );
};
