import { Footer, Oauth, PlatformInfo, YtToSpotifyForm } from "./components";

function App() {
  return (
    <div className="p-2 md:p-10">
      <Oauth />
      <PlatformInfo />
      <YtToSpotifyForm />
      <Footer />
      <div className="purpleElement" />
      <div className="blueElement" />
    </div>
  );
}

export default App;
