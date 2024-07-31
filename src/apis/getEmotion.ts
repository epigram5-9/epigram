import { EmotionType } from '@/types/emotion';
import type { GetEmotionResponseType } from '@/schema/emotion';
import { translateEmotionToKorean } from '@/utils/emotionMap';
import httpClient from '.';
import { getMe } from './user';

const getEmotion = async (): Promise<EmotionType | null> => {
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
};

export default getEmotion;
