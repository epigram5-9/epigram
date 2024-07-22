import type { PostSigninRequestType, PostSigninResponseType } from '@/schema/auth';
import httpClient from '.';

const postSignin = async (request: PostSigninRequestType): Promise<PostSigninResponseType> => {
  const response = await httpClient.post('/auth/signIn', request);
  return response.data;
};

export default postSignin;
