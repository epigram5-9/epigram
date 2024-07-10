import React from 'react';
import { EmotionIconCard, EmotionIconCardProps } from '@/components/Emotion/card/EmotionIconCard';

// InteractiveEmotionIconCardProps 인터페이스 정의
interface InteractiveEmotionIconCardProps extends Omit<EmotionIconCardProps, 'state'> {
  state: 'Default' | 'Unclicked' | 'Clicked';
  onClick: () => void;
}

// InteractiveEmotionIconCard 컴포넌트 함수 선언
function InteractiveEmotionIconCard(props: InteractiveEmotionIconCardProps) {
  return <EmotionIconCard {...props} />;
}

InteractiveEmotionIconCard.displayName = 'InteractiveEmotionIconCard';

export default InteractiveEmotionIconCard;
