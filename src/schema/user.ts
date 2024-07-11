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

export const PostImageRequest = z.object({
  image: z.string().url(),
});

export const PostImageResponse = z.object({
  url: z.string().url(),
});

export type GetUserReponseType = z.infer<typeof GetUserReponse>;
export type GetUserRequestType = z.infer<typeof GetUserRequest>;
export type PatchMeRequestType = z.infer<typeof PatchMeRequest>;

export type PostImageRequestType = z.infer<typeof PostImageRequest>;
export type PostImageResponseType = z.infer<typeof PostImageResponse>;
