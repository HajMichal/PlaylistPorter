export function SpotifyOauth() {
  const login = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "/auth/spotify";
  };

  return (
    <div>
      <button onClick={() => login()}>spotify</button>
    </div>
  );
}
