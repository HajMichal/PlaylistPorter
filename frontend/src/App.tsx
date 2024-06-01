import { Footer, Oauth, YtToSpotifyForm } from "./components";

function App() {
  return (
    <div className="p-2 md:p-10">
      <Oauth />
      <YtToSpotifyForm />
      <Footer />
      <div className="purple-element" />
      <div className="blue-element" />
    </div>
  );
}

export default App;
