import { z } from 'zod';
export const ytSongSchema = z.object({
  id: z.string(),
  etag: z.string(),
  snippet: z.object({
    title: z.string(),
    videoOwnerChannelTitle: z.string(),
  }),
});

export type YtSongDto = z.infer<typeof ytSongSchema>;
