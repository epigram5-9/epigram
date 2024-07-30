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
