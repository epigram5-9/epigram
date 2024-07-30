export interface Emotion {
  userId: number;
  year: number;
  month: number;
}

// 감정 로그 타입 지정
export type EmotionTypeEN = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface EmotionLog {
  id: number;
  userId: number;
  emotion: EmotionTypeEN;
  createdAt: Date;
}

export type EmotionType = '감동' | '기쁨' | '고민' | '슬픔' | '분노';
export type EmotionState = 'Default' | 'Unclicked' | 'Clicked';

export interface EmotionIconCardProps {
  iconType: EmotionType; // 아이콘 종류
  state: EmotionState; // 상태
  size: 'sm' | 'md' | 'lg'; // 크기
  onClick?: () => void; // 클릭 이벤트 핸들러
}

export interface InteractiveEmotionIconCardProps extends Omit<EmotionIconCardProps, 'state'> {
  state: EmotionState;
  onClick: () => void;
}
