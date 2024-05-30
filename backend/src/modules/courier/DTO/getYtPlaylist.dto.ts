import { z } from 'zod';
import { songSchema } from './song.dto';
export const getYTPlayListSchema = z.object({
  data: z.object({
    items: songSchema.array(),
  }),
});

export type GetYTPlayListDto = z.infer<typeof getYTPlayListSchema>;
