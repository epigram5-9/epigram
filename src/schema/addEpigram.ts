import { z } from 'zod';

const urlRegex = /^https?:\/\/.+/;

export const AddEpigramRequestSchema = z.object({
  tags: z.array(z.string().min(1).max(10)).max(3),
  referenceUrl: z.string().url().regex(urlRegex).optional().nullable(),
  referenceTitle: z.string().max(100).optional().nullable(),
  author: z.string().min(1).max(30),
  content: z.string().min(1).max(500),
});

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

export const AddEpigramFormSchema = z
  .object({
    tags: z.array(z.string().min(1).max(10)).min(1, { message: '최소 1개의 태그를 추가해주세요.' }).max(3),
    author: z.string().min(1, { message: '저자의 이름을 입력해주세요' }).max(30, { message: '30자 이내로 입력해주세요.' }),
    content: z.string().min(1, { message: '내용을 입력해주세요.' }).max(500, { message: '500자 이내로 입력해주세요.' }),
    referenceUrl: z.union([z.string().regex(urlRegex, { message: '올바른 URL 형식이 아닙니다.' }), z.literal('')]).optional(),
    referenceTitle: z.union([z.string().max(100, { message: '100자 이내로 입력해주세요.' }), z.literal('')]).optional(),
  })
  .refine((data) => (data.referenceUrl === '' && data.referenceTitle === '') || (data.referenceUrl !== '' && data.referenceTitle !== ''), {
    message: 'URL과 제목을 모두 입력하거나 모두 비워주세요.',
    path: ['referenceUrl', 'referenceTitle'],
  });

export const EditEpigramRequestSchema = AddEpigramRequestSchema.partial().extend({
  id: z.number().int().positive(),
});

export type AddEpigramRequestType = z.infer<typeof AddEpigramRequestSchema>;
export type AddEpigramResponseType = z.infer<typeof AddEpigramResponseSchema>;
export type AddEpigramFormType = z.infer<typeof AddEpigramFormSchema>;
export type EditEpigramRequestType = z.infer<typeof EditEpigramRequestSchema>;
