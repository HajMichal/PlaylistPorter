import { SpotifyIcon } from "../../icons";

export function SpotifyOauth() {
  const login = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "/oauth/spotify";
  };

  return (
    <button
      onClick={() => login()}
      className="bg-gradient-to-tr from-[#2ab456] to-[#27b855] w-72 h-16 rounded-lg flex justify-center items-center"
    >
      <div className="flex items-center gap-4">
        <p className="font-bold text-white text-lg">Connect with Spotify</p>
        <SpotifyIcon />
      </div>
    </button>
  );
}
