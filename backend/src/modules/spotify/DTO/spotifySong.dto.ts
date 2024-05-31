import { z } from 'zod';
export const spotifySongSchema = z.object({
  id: z.string(),
  name: z.string(),

  album: z.object({
    id: z.string(),
    album_type: z.string(),
    name: z.string(),
  }),
  artists: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
});

export type SpotifySongDto = z.infer<typeof spotifySongSchema>;
