export interface Emotion {
  userId: number;
  year: number;
  month: number;
}

// 감정 로그 타입 지정
export type EmotionType = 'MOVED' | 'HAPPY' | 'WORRIED' | 'SAD' | 'ANGRY';

export interface EmotionLog {
  id: number;
  userId: number;
  emotion: EmotionType;
  createdAt: Date;
}
