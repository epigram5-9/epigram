import axios, { AxiosError } from 'axios';
import { GetEpigramResponseType, EpigramRequestType } from '@/schema/epigram';
import TOKEN from '@/lib/constants';
import { DeleteEpigramType } from '@/types/epigram.types';
import { AddEpigramResponseType, EditEpigramRequestType } from '@/schema/addEpigram';
import httpClient from '.';

export const getEpigram = async (request: EpigramRequestType): Promise<GetEpigramResponseType> => {
  const { id } = request;

  if (id === undefined) {
    throw new Error('Epigram ID가 제공되지 않았습니다.');
  }

  // NOTE : 임시로 테스트계정의 토큰을 변수로 선언해서 사용

  try {
    const response = await httpClient.get(`/epigrams/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
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

export const deleteEpigram = async (id: number): Promise<DeleteEpigramType> => {
  const response = await httpClient.delete(`/epigrams/${id}`);
  return response.data;
};

// NOTE: 에피그램 수정 api 함수
export const patchEpigram = async (request: EditEpigramRequestType): Promise<AddEpigramResponseType> => {
  const { id, ...data } = request;
  const response = await httpClient.patch(`/epigrams/${id}`, data);
  return response.data;
};
