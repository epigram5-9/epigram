import * as z from 'zod';

export const GetEpigramsParams = z.object({
  teamId: z.string(),
  limit: z.number().optional(),
  cursor: z.number().optional(),
  keyword: z.string().optional(),
  writerId: z.number().optional(),
});

export const GetEpigramsResponse = z.object({
  totalCount: z.number(),
  nextCursor: z.number(),
  list: z.array(
    z.object({
      likeCount: z.number(),
      tags: z.array(
        z.object({
          name: z.string(),
          id: z.number(),
        }),
      ),
      writerId: z.number(),
      referenceUrl: z.string(),
      referenceTitle: z.string(),
      author: z.string(),
      content: z.string(),
      id: z.number(),
    }),
  ),
});

export type GetEpigramsParamsType = z.infer<typeof GetEpigramsParams>;
export type GetEpigramsResponseType = z.infer<typeof GetEpigramsResponse>;
