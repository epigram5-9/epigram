/*
  여러 개의 EmotionIconCard를 관리합니다.
  사용자 인터페이스에 필요한 상호 작용 로직을 포함합니다.
 */

import React, { useState } from 'react';
import EmotionIconCard from '@/components/Emotion/EmotionCard';
import useMediaQuery from '@/hooks/useMediaQuery';
import { EmotionType, EmotionState } from '@/types/EmotionTypes';

// EmotionSelector 컴포넌트 함수 선언
function EmotionSelector() {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  // 감정 카드 상태 관리
  const [states, setStates] = useState<Record<EmotionType, EmotionState>>({
    감동: 'Default',
    기쁨: 'Default',
    고민: 'Default',
    슬픔: 'Default',
    분노: 'Default',
  });

  // 감정 카드 클릭 핸들러
  const handleCardClick = (iconType: EmotionType) => {
    setStates((prevStates) => {
      const newStates = { ...prevStates };

      if (prevStates[iconType] === 'Clicked') {
        // 현재 클릭된 카드가 다시 클릭되면 모두 Default로 설정
        Object.keys(newStates).forEach((key) => {
          newStates[key as EmotionType] = 'Default';
        });
      } else {
        // 하나의 카드가 클릭되면 그 카드만 Clicked, 나머지는 Unclicked로 설정
        Object.keys(newStates).forEach((key) => {
          newStates[key as EmotionType] = key === iconType ? 'Clicked' : 'Unclicked';
        });
      }

      return newStates;
    });
  };

  let containerClass = 'w-[544px] h-[136px] gap-4';
  let cardSize: 'lg' | 'md' | 'sm' = 'lg';

  if (isTablet) {
    containerClass = 'w-[352px] h-[96px] gap-2';
    cardSize = 'md';
  } else if (isMobile) {
    containerClass = 'w-[312px] h-[84px] gap-2';
    cardSize = 'sm';
  }

  return (
    <div className={`justify-start items-start inline-flex ${containerClass}`}>
      {(['감동', '기쁨', '고민', '슬픔', '분노'] as const).map((iconType) => (
        <EmotionIconCard key={iconType} iconType={iconType} size={cardSize} state={states[iconType]} onClick={() => handleCardClick(iconType)} />
      ))}
    </div>
  );
}

export default EmotionSelector;
