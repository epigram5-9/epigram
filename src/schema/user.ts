import * as z from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from '@/user/utill/constants';

export const PatchMeRequest = z.object({
  image: z.string().url(),
  nickname: z.string(),
});

export const GetUserRequest = z.object({
  id: z.number(),
});

export const GetUserResponse = z.object({
  image: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  nickname: z.string(),
  teamId: z.string(),
  id: z.number(),
});

const PostPresignedUrlRequest = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `업로드 파일의 용량은 최대 ${MAX_FILE_SIZE / (1024 * 1024)}MB 입니다.`)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg, .png 확장자만 업로드 가능합니다.'),
});

export const PostPresignedUrlResponse = z.object({
  url: z.string().url(),
});


export const GetMyContentCount = z.object({
  epigramCount: z.number(),
  commentCount: z.number(),
});

export type GetUserResponseType = z.infer<typeof GetUserResponse>;
export type GetUserRequestType = z.infer<typeof GetUserRequest>;
export type PatchMeRequestType = z.infer<typeof PatchMeRequest>;

export type PostPresignedUrlRequestType = z.infer<typeof PostPresignedUrlRequest>;
export type PostPresignedUrlResponseType = z.infer<typeof PostPresignedUrlResponse>;

export type GetMyContentCountType = z.infer<typeof GetMyContentCount>;
