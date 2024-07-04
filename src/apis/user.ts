import type { GetUserReponseType, GetUserRequestType, PatchMeRequestType } from '@/schema/user';
import httpClient from '.';

export const getMe = async (): Promise<GetUserReponseType> => {
  const response = await httpClient.get('/users/me');
  return response.data;
};

export const getUser = async (request: GetUserRequestType): Promise<GetUserReponseType> => {
  const { id } = request;
  const response = await httpClient.get(`/users/${id}`);
  return response.data;
};

export const updateMe = async (request: PatchMeRequestType): Promise<GetUserReponseType> => {
  const response = await httpClient.patch('/users/me', { ...request });
  return response.data;
};
