import axios, { AxiosError } from 'axios';
import { GetEpigramResponseType, GetEpigramRequestType } from '@/schema/epigram';
import httpClient from '.';

export const getEpigram = async (request: GetEpigramRequestType): Promise<GetEpigramResponseType> => {
  const { id } = request;

  if (id === undefined) {
    throw new Error('Epigram ID가 제공되지 않았습니다.');
  }

  try {
    const response = await httpClient.get(`/epigrams/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error(`API 에러: ${axiosError.response.status}`);
      } else if (axiosError.request) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      } else {
        throw new Error('요청 설정 중 오류가 발생했습니다.');
      }
    } else {
      throw new Error('예상치 못한 오류가 발생했습니다.');
    }
  }
};

export const toggleEpigramLike = async (request: GetEpigramRequestType): Promise<GetEpigramResponseType> => {
  const { id } = request;

  if (id === undefined) {
    throw new Error('Epigram ID가 제공되지 않았습니다.');
  }

  try {
    const response = await httpClient.post(`/epigrams/${id}/like`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        // 이미 좋아요를 눌렀다면, 좋아요 취소 요청을 보냅니다.
        const response = await httpClient.delete(`/epigrams/${id}/like`);
        return response.data;
      }
      // 그 외의 에러 처리
      if (axiosError.response) {
        throw new Error(`API 에러: ${axiosError.response.status}`);
      } else if (axiosError.request) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      } else {
        throw new Error('요청 설정 중 오류가 발생했습니다.');
      }
    } else {
      throw new Error('예상치 못한 오류가 발생했습니다.');
    }
  }
};
