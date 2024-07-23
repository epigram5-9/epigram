import { AxiosError } from 'axios';
import { EmotionType } from '@/types/emotion';
import type { GetEmotionResponseType } from '@/schema/emotion';
import { translateEmotionToKorean } from '@/utils/emotionMap';
import httpClient from '.';
import { getMe } from './user';

const getEmotion = async (): Promise<EmotionType | null> => {
  try {
    const user = await getMe();
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const response = await httpClient.get<GetEmotionResponseType>('/emotionLogs/today', {
      params: { userId: user.id },
    });

    if (response.status === 204) {
      return null; // No content
    }

    const koreanEmotion = translateEmotionToKorean(response.data.emotion);
    return koreanEmotion;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error('감정 조회 요청 처리 중 문제가 발생했습니다.');
      } else if (error.request) {
        throw new Error('서버 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        throw new Error('감정 조회 요청을 처리하는 동안 문제가 발생했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default getEmotion;
