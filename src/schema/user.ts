import * as z from 'zod';

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

// NOTE: presigned url 생성
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const PostPresignedUrlRequest = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`)
    .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type), 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
});

export const PostPresignedUrlResponse = z.object({
  url: z.string().url(),
});

export type GetUserReponseType = z.infer<typeof GetUserReponse>;
export type GetUserRequestType = z.infer<typeof GetUserRequest>;
export type PatchMeRequestType = z.infer<typeof PatchMeRequest>;

export type PostPresignedUrlRequestType = z.infer<typeof PostPresignedUrlRequest>;
export type PostPresignedUrlResponseType = z.infer<typeof PostPresignedUrlResponse>;
