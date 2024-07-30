import * as z from 'zod';

const TagSchema = z.object({
  name: z.string(),
  id: z.number(),
});

const RecentEpigramSchema = z.object({
  likeCount: z.number(),
  tags: z.array(TagSchema),
  writerId: z.number(),
  referenceUrl: z.string().url(),
  referenceTitle: z.string(),
  author: z.string(),
  content: z.string(),
  id: z.number(),
});

export const GetRecentEpigramsResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number(),
  list: z.array(RecentEpigramSchema),
});

export type TagType = z.infer<typeof TagSchema>;
export type RecentEpigramType = z.infer<typeof RecentEpigramSchema>;
export type GetRecentEpigramsResponseType = z.infer<typeof GetRecentEpigramsResponseSchema>;
