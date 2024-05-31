import { z } from 'zod';
import { spotifySongSchema } from './spotifySong.dto';
export const getSpotifySongSchema = z.object({
  data: z.object({
    tracks: z.object({
      items: spotifySongSchema.array(),
    }),
  }),
});

export type GetSpotifySongDto = z.infer<typeof getSpotifySongSchema>;
