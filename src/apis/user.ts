import type { GetUserResponseType, GetUserRequestType, PatchMeRequestType, PostPresignedUrlRequestType, PostPresignedUrlResponseType, GetMyContentCountType } from '@/schema/user';
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

export const getMyContentCount = async (request: GetUserRequestType): Promise<GetMyContentCountType> => {
  const { id } = request;

  // Promise.all을 사용하여 병렬 요청 실행
  const [epigramResponse, commentResponse] = await Promise.all([
    httpClient.get(`/epigrams`, { params: { limit: 1, cursor: 0, writerId: id } }),
    httpClient.get(`/users/${id}/comments`, { params: { limit: 1, cursor: 0 } }),
  ]);

  // 결과
  const epigramCount = epigramResponse.data.totalCount;
  const commentCount = commentResponse.data.totalCount;

  return { epigramCount, commentCount };
};
