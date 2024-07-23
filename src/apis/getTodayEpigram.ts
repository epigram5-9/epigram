import { EpigramType } from '@/schema/todayepigram';
import { AxiosError } from 'axios';
import httpClient from './index';

const getTodayEpigram = async (): Promise<EpigramType> => {
  try {
    const response = await httpClient.get<EpigramType>('/epigrams/today');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error('에피그램 조회 요청 처리 중 문제가 발생했습니다.');
      } else if (error.request) {
        throw new Error('서버 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        throw new Error('에피그램 조회 요청을 처리하는 동안 문제가 발생했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default getTodayEpigram;
