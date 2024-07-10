import React, { useState } from 'react';
import { EmotionIconCard, EmotionIconCardProps } from '@/components/Emotion/card/EmotionIconCard';

// EmotionIconCardContainerProps 인터페이스 정의
interface EmotionIconCardContainerProps extends Omit<EmotionIconCardProps, 'state'> {}

// EmotionIconCardContainer 컴포넌트 함수 선언
function EmotionIconCardContainer(props: EmotionIconCardContainerProps) {
  const [state, setState] = useState<'Default' | 'Unclicked' | 'Clicked'>('Unclicked');

  const handleClick = () => {
    setState((prevState) => (prevState === 'Unclicked' ? 'Clicked' : 'Unclicked'));
  };

  return <EmotionIconCard {...props} state={state} onClick={handleClick} />;
}

EmotionIconCardContainer.displayName = 'EmotionIconCardContainer';

export default EmotionIconCardContainer;
