import * as z from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/user/utill/constants';

export const PatchMeRequest = z.object({
  image: z.string().url(),
  nickname: z.string(),
});

export const GetUserRequest = z.object({
  id: z.number(),
});

export const GetUserReponse = z.object({
  image: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  nickname: z.string(),
  teamId: z.string(),
  id: z.number(),
});

const PostPresignedURlRequest = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `최대 파일 크기 용량은 ${MAX_FILE_SIZE / (1024 * 1024)}MB 입니다.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg, .png 확장자만 업로드 가능합니다.'),
});

export const PostPresignedURlResponse = z.object({
  url: z.string().url(),
});

export type GetUserReponseType = z.infer<typeof GetUserReponse>;
export type GetUserRequestType = z.infer<typeof GetUserRequest>;
export type PatchMeRequestType = z.infer<typeof PatchMeRequest>;

export type PostPresignedURlRequestType = z.infer<typeof PostPresignedURlRequest>;
export type PostPresignedURlResponseType = z.infer<typeof PostPresignedURlResponse>;
