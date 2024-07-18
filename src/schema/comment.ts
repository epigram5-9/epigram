import { z } from 'zod';

const WriterSchema = z.object({
  image: z.string().nullable(),
  nickname: z.string(),
  id: z.number(),
});

const CommentContentSchema = z.string().min(1);

const CommentSchema = z.object({
  epigramId: z.number(),
  writer: WriterSchema,
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  isPrivate: z.boolean(),
  content: CommentContentSchema,
  id: z.number(),
});

const CommentResponseSchema = z.object({
  totalCount: z.number(),
  nextCursor: z.number().nullable(),
  list: z.array(CommentSchema),
});

const CommentRequestSchema = z.object({
  id: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
  cursor: z.number().optional(),
});

export type CommentRequestType = z.infer<typeof CommentRequestSchema>;
export type CommentResponseType = z.infer<typeof CommentResponseSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
export type Writer = z.infer<typeof WriterSchema>;

export { CommentRequestSchema, CommentResponseSchema, CommentSchema, WriterSchema };
