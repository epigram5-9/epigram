import * as z from 'zod';

export const PostSigninRequest = z.object({
  email: z.string().min(1, { message: '이메일은 필수 입력입니다.' }).email({ message: '올바른 이메일 주소가 아닙니다.' }),
  password: z.string().min(1, { message: '비밀번호는 필수 입력입니다.' }),
});

const User = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  teamId: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  image: z.string(),
});

export const PostSigninResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: User,
});

export type PostSigninRequestType = z.infer<typeof PostSigninRequest>;
export type PostSigninResponseType = z.infer<typeof PostSigninResponse>;
