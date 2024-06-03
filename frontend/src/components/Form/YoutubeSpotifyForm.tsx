import { Button } from "@mantine/core";
import { CustomInput } from "../CustomInput";
import { useState } from "react";
import { sendLinks } from "../../fetch/sendLinks";
import toast, { Toaster } from "react-hot-toast";

export const YtToSpotifyForm = () => {
  const [youtubeLink, setYoutubeLink] = useState<string>();
  const [spotifyLink, setSpotifyLink] = useState<string>();

  const handleSendLink = async () => {
    if (youtubeLink && spotifyLink) {
      toast.promise(sendLinks(youtubeLink, spotifyLink), {
        loading: "Transporting",
        success: <b>Songs transported!</b>,
        error: <b>Songs cannot be transported. Try again!</b>,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      <CustomInput label="YouTube playlist link" setter={setYoutubeLink} />
      <CustomInput label="Spotify playlist link" setter={setSpotifyLink} />
      <Button onClick={handleSendLink} variant="filled" size="md" color="dark">
        Transport
      </Button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
