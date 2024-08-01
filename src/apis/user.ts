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

  // 에피그램 카운트
  const epigram = await httpClient.get(`/epigrams`, { params: { limit: 1, cursor: 0, writerId: id } });

  // 댓글 카운트
  const comment = await httpClient.get(`/users/${id}/comments`, { params: { limit: 1, cursor: 0 } });

  const response = { epigramCount: epigram.data.totalCount, commentCount: comment.data.totalCount };

  return response;
};
