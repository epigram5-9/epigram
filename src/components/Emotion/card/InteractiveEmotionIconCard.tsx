import React, { useState } from 'react';
import { EmotionIconCard, EmotionIconCardProps } from '@/components/Emotion/card/EmotionIconCard';

// InteractiveEmotionIconCardProps 인터페이스 정의
interface InteractiveEmotionIconCardProps extends Omit<EmotionIconCardProps, 'state'> {}

// InteractiveEmotionIconCard 컴포넌트 함수 선언
function InteractiveEmotionIconCard(props: InteractiveEmotionIconCardProps) {
  const [state, setState] = useState<'Default' | 'Unclicked' | 'Clicked'>('Unclicked');

  const handleClick = () => {
    setState((prevState) => (prevState === 'Unclicked' ? 'Clicked' : 'Unclicked'));
  };

  return <EmotionIconCard {...props} state={state} onClick={handleClick} />;
}

InteractiveEmotionIconCard.displayName = 'InteractiveEmotionIconCard';

export default InteractiveEmotionIconCard;
