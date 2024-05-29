import { useEffect } from "react";
import { GoogleOauth } from "./components";

function App() {
  useEffect(() => {
    // getting songs from youtube
    // axios.get(
    //   `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${GOOGLE_API_KEY}`
    // );
  }, []);

  return (
    <div>
      <GoogleOauth />
    </div>
  );
}

export default App;
