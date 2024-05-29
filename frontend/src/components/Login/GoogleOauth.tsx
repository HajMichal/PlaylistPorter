function GoogleOauth() {
  const login = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div>
      <button onClick={() => login()}>test</button>
    </div>
  );
}

export default GoogleOauth;
