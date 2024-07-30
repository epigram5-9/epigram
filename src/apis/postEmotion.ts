import { EmotionType } from '@/types/emotion';
import type { PostEmotionRequestType, PostEmotionResponseType } from '@/schema/emotion';
import { translateEmotionToEnglish } from '@/utils/emotionMap';
import httpClient from '.';
import { getMe } from './user';

const postEmotion = async (emotion: EmotionType): Promise<PostEmotionResponseType> => {
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
};

export default postEmotion;
