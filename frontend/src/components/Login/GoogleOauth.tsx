import { GoogleIcon } from "../../icons";

export function GoogleOauth() {
  const login = () => {
    window.location.href = import.meta.env.VITE_SERVER_URL + "/oauth/google";
  };

  return (
    <button
      onClick={() => login()}
      className="bg-slate-100 w-72 h-16 rounded-lg flex justify-center items-center"
    >
      <div className="flex items-center gap-4">
        <p className="font-google font-semibold text-lg">Connect with Google</p>
        <GoogleIcon />
      </div>
    </button>
  );
}
