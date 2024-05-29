import { axiosBaseInstance } from "../axiosBase";

async function googleOauth() {
  const oauth = await axiosBaseInstance.get("auth/google");
  console.log(oauth);
}

export default googleOauth;
