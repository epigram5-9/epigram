import React, { useState } from 'react';
import InteractiveEmotionIconCard from '@/components/Emotion/card/InteractiveEmotionIconCard';

// EmotionSelector 컴포넌트 함수 선언
function EmotionSelector() {
  // 감정 카드 상태 관리
  const [states, setStates] = useState({
    감동: 'Default' as 'Default' | 'Unclicked' | 'Clicked',
    기쁨: 'Default' as 'Default' | 'Unclicked' | 'Clicked',
    고민: 'Default' as 'Default' | 'Unclicked' | 'Clicked',
    슬픔: 'Default' as 'Default' | 'Unclicked' | 'Clicked',
    분노: 'Default' as 'Default' | 'Unclicked' | 'Clicked',
  });

  // 감정 카드 클릭 핸들러
  const handleCardClick = (iconType: '감동' | '기쁨' | '고민' | '슬픔' | '분노') => {
    setStates((prevStates) => {
      const newStates = { ...prevStates };

      if (prevStates[iconType] === 'Clicked') {
        // 현재 클릭된 카드가 다시 클릭되면 모두 Default로 설정
        Object.keys(newStates).forEach((key) => {
          newStates[key as '감동' | '기쁨' | '고민' | '슬픔' | '분노'] = 'Default';
        });
      } else {
        // 하나의 카드가 클릭되면 그 카드만 Clicked, 나머지는 Unclicked로 설정
        Object.keys(newStates).forEach((key) => {
          newStates[key as '감동' | '기쁨' | '고민' | '슬픔' | '분노'] = key === iconType ? 'Clicked' : 'Unclicked';
        });
      }

      return newStates;
    });
  };

  return (
    <div className='w-[544px] h-[136px] justify-start items-start gap-4 inline-flex'>
      {(['감동', '기쁨', '고민', '슬픔', '분노'] as const).map((iconType) => (
        <InteractiveEmotionIconCard key={iconType} iconType={iconType} size='lg' state={states[iconType]} onClick={() => handleCardClick(iconType)} />
      ))}
    </div>
  );
}

export default EmotionSelector;
