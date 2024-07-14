import type { GetUserResponseType, GetUserRequestType, PatchMeRequestType } from '@/schema/user';
import httpClient from '.';
import TOKEN from '@/lib/constants';

export const getMe = async (): Promise<GetUserResponseType> => {
  const response = await httpClient.get('/users/me', {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
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
