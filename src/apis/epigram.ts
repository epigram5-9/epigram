import axios, { AxiosError } from 'axios';
import { GetEpigramResponseType, GetEpigramRequestType } from '@/schema/epigram';
import httpClient from '.';

const getEpigram = async (request: GetEpigramRequestType): Promise<GetEpigramResponseType> => {
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

export default getEpigram;
