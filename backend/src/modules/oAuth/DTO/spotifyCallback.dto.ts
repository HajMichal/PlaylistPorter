import { z } from 'zod';
export const spotifyUserSchema = z.object({
  provider: z.string(),
  providerId: z.string(),
  email: z.string(),
  name: z.string(),
  picture: z.string(),
  profileUrl: z.string(),
});

export type SpotifyUserDto = z.infer<typeof spotifyUserSchema>;
