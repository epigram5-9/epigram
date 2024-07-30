import * as z from 'zod';

const TagSchema = z.object({
  name: z.string(),
  id: z.number(),
});

export const EpigramSchema = z.object({
  likeCount: z.number(),
  tags: z.array(TagSchema),
  writerId: z.number(),
  referenceUrl: z.string().url(),
  referenceTitle: z.string(),
  author: z.string(),
  content: z.string(),
  id: z.number(),
  isLiked: z.boolean(),
});

export type TagType = z.infer<typeof TagSchema>;
export type EpigramType = z.infer<typeof EpigramSchema>;
