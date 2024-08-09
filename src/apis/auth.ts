import type { PostRefreshTokenRequestType, PostRefreshTokenResponseType, PostSigninRequestType, PostSigninResponseType, PostSignUpRequestType, PostSignUpResponseType } from '@/schema/auth';
import httpClient from '.';

export const postSignin = async (request: PostSigninRequestType): Promise<PostSigninResponseType> => {
  const response = await httpClient.post('/auth/signIn', request);
  return response.data;
};

export const postSignup = async (request: PostSignUpRequestType): Promise<PostSignUpResponseType> => {
  const response = await httpClient.post('/auth/signUp', request);
  return response.data;
};

export const postRefreshToken = async (request: PostRefreshTokenRequestType): Promise<PostRefreshTokenResponseType> => {
  const response = await httpClient.post('/auth/refresh-token', request);
  return response.data;
};
