export function GoogleOauth() {
  const login = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "/auth/google";
  };

  return (
    <div>
      <button onClick={() => login()}>google</button>
    </div>
  );
}
