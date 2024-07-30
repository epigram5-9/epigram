import * as z from 'zod';

const WriterSchema = z.object({
  image: z.string().url(),
  nickname: z.string(),
  id: z.number(),
});

const CommentSchema = z.object({
  epigramId: z.number(),
  writer: WriterSchema,
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  isPrivate: z.boolean(),
  content: z.string(),
  id: z.number(),
});

export const GetRecentCommentsResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number(),
  list: z.array(CommentSchema),
});

export type WriterType = z.infer<typeof WriterSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
export type GetRecentCommentsResponseType = z.infer<typeof GetRecentCommentsResponseSchema>;
