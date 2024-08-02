import type { GetUserResponseType, GetUserRequestType, PatchMeRequestType, PostPresignedUrlRequestType, PostPresignedUrlResponseType } from '@/schema/user';
import httpClient from '.';

export const getMe = async (): Promise<GetUserResponseType> => {
  const response = await httpClient.get('/users/me');
  return response.data;
};

export const getUser = async (request: GetUserRequestType): Promise<GetUserResponseType> => {
  const { id } = request;
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};

export const updateMe = async (request: PatchMeRequestType): Promise<GetUserResponseType> => {
  const response = await httpClient.patch('/users/me', { ...request });
  return response.data;
};

export const createPresignedUrl = async (request: PostPresignedUrlRequestType): Promise<PostPresignedUrlResponseType> => {
  const formData = new FormData();
  formData.append('image', request.image);
  const response = await httpClient.post('/images/upload', formData);
  return response.data;
};
