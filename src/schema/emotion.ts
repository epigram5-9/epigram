import * as z from 'zod';

export const PostEmotionRequest = z.object({
  emotion: z.enum(['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY']),
});

export const PostEmotionResponse = z.object({
  createdAt: z.coerce.date(),
  emotion: z.enum(['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY']),
  userId: z.number(),
  id: z.number(),
});

export const GetEmotionResponse = z.object({
  createdAt: z.coerce.date(),
  emotion: z.enum(['MOVED', 'HAPPY', 'WORRIED', 'SAD', 'ANGRY']),
  userId: z.number(),
  id: z.number(),
});

export type PostEmotionRequestType = z.infer<typeof PostEmotionRequest>;
export type PostEmotionResponseType = z.infer<typeof PostEmotionResponse>;
export type GetEmotionResponseType = z.infer<typeof GetEmotionResponse>;
