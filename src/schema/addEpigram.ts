import { z } from 'zod';

const urlRegex = /^https?:\/\/.+/;

export const AddEpigramRequestSchema = z.object({
  tags: z.array(z.string().min(1).max(10)).max(3),
  referenceUrl: z.string().url().regex(urlRegex, { message: '올바른 URL 형식이 아닙니다.' }).optional().nullable(),
  referenceTitle: z.string().max(100).optional().nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

export type AddEpigramRequestType = z.infer<typeof AddEpigramRequestSchema>;

export const AddEpigramResponseSchema = z.object({
  likeCount: z.number(),
  tags: z.array(
    z.object({
      name: z.string().min(1).max(10),
      id: z.number().int().positive(),
    }),
  ),
  writerId: z.number().int().positive(),
  referenceUrl: z.string().url().regex(urlRegex).nullable(),
  referenceTitle: z.string().max(100).nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
  id: z.number().int().positive(),
});

export type AddEpigramResponseType = z.infer<typeof AddEpigramResponseSchema>;

// 폼 입력값을 위한 스키마 (API 요청 전 사용)
export const AddEpigramFormSchema = z.object({
  tags: z.string(),
  referenceUrl: z.string().url().regex(urlRegex, { message: '올바른 URL 형식이 아닙니다.' }).optional(),
  referenceTitle: z.string().max(100).optional(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

export type AddEpigramFormType = z.infer<typeof AddEpigramFormSchema>;
