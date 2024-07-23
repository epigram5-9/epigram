import { AxiosError } from 'axios';
import { EmotionType } from '@/types/emotion';
import type { PostEmotionRequestType, PostEmotionResponseType } from '@/schema/emotion';
import { translateEmotionToEnglish } from '@/utils/emotionMap';
import httpClient from '.';
import { getMe } from './user';

const postEmotion = async (emotion: EmotionType): Promise<PostEmotionResponseType> => {
  try {
    const user = await getMe();
    if (!user) {
      throw new Error('로그인이 필요합니다.');
    }

    const englishEmotion = translateEmotionToEnglish(emotion);
    const request: PostEmotionRequestType = { emotion: englishEmotion };

    const response = await httpClient.post<PostEmotionResponseType>('/emotionLogs/today', {
      ...request,
      userId: user.id,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error('감정 저장 요청 처리 중 문제가 발생했습니다.');
      } else if (error.request) {
        throw new Error('서버 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        throw new Error('감정 저장 요청을 처리하는 동안 문제가 발생했습니다.');
      }
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
};

export default postEmotion;
