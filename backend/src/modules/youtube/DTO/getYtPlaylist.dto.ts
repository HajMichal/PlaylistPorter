import { z } from 'zod';
import { ytSongSchema } from './ytSong.dto';
export const getYTPlayListSchema = z.object({
  data: z.object({
    items: ytSongSchema.array(),
  }),
});

export type GetYTPlayListDto = z.infer<typeof getYTPlayListSchema>;
