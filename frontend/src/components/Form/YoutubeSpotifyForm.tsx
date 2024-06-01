import { Button } from "@mantine/core";
import { CustomInput } from "../CustomInput";
import { useState } from "react";
import { sendLinks } from "../../fetch/courier/sendLinks";

export const YtToSpotifyForm = () => {
  const [youtubeLink, setYoutubeLink] = useState<string>();
  const [spotifyLink, setSpotifyLink] = useState<string>();

  const handleSendLink = async () => {
    if (youtubeLink && spotifyLink) {
      const response = await sendLinks(youtubeLink, spotifyLink);
      console.log(response);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 p-10">
      <CustomInput label="YouTube playlist link" setter={setYoutubeLink} />
      <CustomInput label="Spotify playlist link" setter={setSpotifyLink} />
      <Button onClick={handleSendLink} variant="filled" size="md">
        Transform
      </Button>
    </div>
  );
};
