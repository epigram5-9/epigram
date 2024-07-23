import { EmotionType } from '@/types/EmotionTypes';

const emotionMap: Record<EmotionType, 'MOVED' | 'JOY' | 'WORRY' | 'SADNESS' | 'ANGER'> = {
  감동: 'MOVED',
  기쁨: 'JOY',
  고민: 'WORRY',
  슬픔: 'SADNESS',
  분노: 'ANGER',
};

const translateEmotion = (emotion: EmotionType): 'MOVED' | 'JOY' | 'WORRY' | 'SADNESS' | 'ANGER' => emotionMap[emotion];

export default translateEmotion;
