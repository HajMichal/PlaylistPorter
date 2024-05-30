import { z } from 'zod';
export const songSchema = z.object({
  id: z.string(),
  etag: z.string(),
  snippet: z.object({
    title: z.string(),
    videoOwnerChannelTitle: z.string(),
  }),
});

export type SongDto = z.infer<typeof songSchema>;
