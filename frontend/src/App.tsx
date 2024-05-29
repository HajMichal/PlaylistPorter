import { useEffect } from "react";
import { GoogleOauth, SpotifyOauth } from "./components";
import axios from "axios";
const playlistId = "PLP7_sQyUavJQuSljPucGkkK78HM0mV7zP";
function App() {
  useEffect(() => {
    // getting songs from youtube
    axios.get(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    );
  }, []);

  return (
    <div>
      <GoogleOauth />
      <SpotifyOauth />
      <input type="text" placeholder="YOUTUBE playlist link" />
    </div>
  );
}

export default App;
