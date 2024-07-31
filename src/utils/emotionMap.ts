import { EmotionType } from '@/types/emotion';

const emotionMap: Record<EmotionType, 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY'> = {
  감동: 'MOVED',
  기쁨: 'HAPPY',
  고민: 'WORRIED',
  슬픔: 'SAD',
  분노: 'ANGRY',
};

const reverseEmotionMap: Record<'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY', EmotionType> = {
  MOVED: '감동',
  HAPPY: '기쁨',
  WORRIED: '고민',
  SAD: '슬픔',
  ANGRY: '분노',
};

const translateEmotionToEnglish = (emotion: EmotionType): 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY' => emotionMap[emotion];

const translateEmotionToKorean = (emotion: 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY'): EmotionType => reverseEmotionMap[emotion];

export { translateEmotionToEnglish, translateEmotionToKorean };
