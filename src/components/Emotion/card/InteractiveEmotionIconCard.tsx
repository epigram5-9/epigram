import React from 'react';
import EmotionIconCard from '@/components/Emotion/card/EmotionIconCard';
import { InteractiveEmotionIconCardProps } from '@/types/EmotionTypes';

// InteractiveEmotionIconCard 컴포넌트 함수 선언
function InteractiveEmotionIconCard(props: InteractiveEmotionIconCardProps) {
  return <EmotionIconCard {...props} />;
}

InteractiveEmotionIconCard.displayName = 'InteractiveEmotionIconCard';

export default InteractiveEmotionIconCard;
