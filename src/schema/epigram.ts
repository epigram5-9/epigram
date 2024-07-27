import { z } from 'zod';

// Tag 스키마
const TagSchema = z.object({
  name: z.string().min(1).max(10),
  id: z.number().int().positive(),
});

// GetEpigramResponseType 스키마
const GetEpigramResponseSchema = z.object({
  id: z.number().int().positive(),
  content: z.string().min(1).max(500),
  author: z.string().min(1).max(30),
  referenceTitle: z.string().max(100).nullable().optional(),
  referenceUrl: z.string().url().nullable().optional(),
  writerId: z.number().int().positive(),
  tags: z.array(TagSchema),
  likeCount: z.number(),
  isLiked: z.boolean().optional(),
});

const EpigramRequestSchema = z.object({
  id: z.union([z.string(), z.number(), z.undefined()]),
});

export type Tag = z.infer<typeof TagSchema>;
export type GetEpigramResponseType = z.infer<typeof GetEpigramResponseSchema>;
export type EpigramRequestType = z.infer<typeof EpigramRequestSchema>;

export { TagSchema, GetEpigramResponseSchema, EpigramRequestSchema };