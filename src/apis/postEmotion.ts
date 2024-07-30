import { EmotionType } from '@/types/emotion';
import type { PostEmotionRequestType, PostEmotionResponseType } from '@/schema/emotion';
import { translateEmotionToEnglish } from '@/utils/emotionMap';
import httpClient from '.';

const postEmotion = async (emotion: EmotionType): Promise<PostEmotionResponseType> => {
  const englishEmotion = translateEmotionToEnglish(emotion);
  const request: PostEmotionRequestType = { emotion: englishEmotion };

  const response = await httpClient.post<PostEmotionResponseType>('/emotionLogs/today', request);

  return response.data;
};

export default postEmotion;
