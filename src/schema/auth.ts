import * as z from 'zod';

const PWD_VALIDATION_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const PostSignUpRequest = z
  .object({
    email: z.string().min(1, { message: '이메일은 필수 입력입니다.' }).email({ message: '이메일 형식으로 작성해 주세요.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호는 필수 입력입니다.' })
      .min(8, { message: '비밀번호는 최소 8자 이상입니다.' })
      .regex(PWD_VALIDATION_REGEX, { message: '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.' }),
    passwordConfirmation: z.string().min(1, { message: '비밀번호 확인을 입력해주세요.' }),
    nickname: z.string().min(1, { message: '닉네임은 필수 입력입니다.' }).max(20, { message: '닉네임은 최대 20자까지 가능합니다.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
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

// TODO: 나중에 signin, signup의 response가 같아 같은 이름으로 통일 할 예정
export const PostAuthResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: User,
});

export type PostSignUpRequestType = z.infer<typeof PostSignUpRequest>;
export type PostAuthResponseType = z.infer<typeof PostAuthResponse>;
