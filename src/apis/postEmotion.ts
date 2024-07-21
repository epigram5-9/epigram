import type { PostEmotionRequestType, PostEmotionResponseType } from '@/schema/emotion';
import { AxiosError } from 'axios';
import httpClient from '.';

const postEmotion = async (request: PostEmotionRequestType): Promise<PostEmotionResponseType> => {
  try {
    const response = await httpClient.post('/api/emotions', request);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error('감정 저장 요청 처리 중 문제가 발생했습니다.');
      } else if (axiosError.request) {
        throw new Error('서버 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        throw new Error('감정 저장 요청을 처리하는 동안 문제가 발생했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }
};

export default postEmotion;
