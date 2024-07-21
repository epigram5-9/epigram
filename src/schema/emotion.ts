import * as z from 'zod';

// Request schema
export const PostEmotionRequest = z.object({
  emotion: z.enum(['MOVED', 'JOY', 'WORRY', 'SADNESS', 'ANGER']),
});

// Response schema
export const PostEmotionResponse = z.object({
  createdAt: z.coerce.date(),
  emotion: z.enum(['MOVED', 'JOY', 'WORRY', 'SADNESS', 'ANGER']),
  userId: z.number(),
  id: z.number(),
});

export type PostEmotionRequestType = z.infer<typeof PostEmotionRequest>;
export type PostEmotionResponseType = z.infer<typeof PostEmotionResponse>;
