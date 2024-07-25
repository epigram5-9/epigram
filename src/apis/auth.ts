import type { PostSignUpRequestType, PostAuthResponseType } from '@/schema/auth';
import httpClient from '.';

// TODO: signin, signup 단어가 비슷해 login, register로 바꿀 예정

const postSignup = async (request: PostSignUpRequestType): Promise<PostAuthResponseType> => {
  const response = await httpClient.post('/auth/signUp', request);
  return response.data;
};

export default postSignup;
