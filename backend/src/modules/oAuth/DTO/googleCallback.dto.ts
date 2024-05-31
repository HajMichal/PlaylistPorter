import { z } from 'zod';
export const googleUserSchema = z.object({
  provider: z.string(),
  providerId: z.string(),
  email: z.string(),
  name: z.string(),
  picture: z.string(),
});

export type GoogleUserDto = z.infer<typeof googleUserSchema>;
