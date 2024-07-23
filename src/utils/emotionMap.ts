import { EmotionType } from '@/types/EmotionTypes';

const emotionMap: Record<EmotionType, 'MOVED' | 'JOY' | 'WORRY' | 'SADNESS' | 'ANGER'> = {
  감동: 'MOVED',
  기쁨: 'JOY',
  고민: 'WORRY',
  슬픔: 'SADNESS',
  분노: 'ANGER',
};

const reverseEmotionMap: Record<'MOVED' | 'JOY' | 'WORRY' | 'SADNESS' | 'ANGER', EmotionType> = {
  MOVED: '감동',
  JOY: '기쁨',
  WORRY: '고민',
  SADNESS: '슬픔',
  ANGER: '분노',
};

const translateEmotionToEnglish = (emotion: EmotionType): 'MOVED' | 'JOY' | 'WORRY' | 'SADNESS' | 'ANGER' => emotionMap[emotion];

const translateEmotionToKorean = (emotion: 'MOVED' | 'JOY' | 'WORRY' | 'SADNESS' | 'ANGER'): EmotionType => reverseEmotionMap[emotion];

export { translateEmotionToEnglish, translateEmotionToKorean };
