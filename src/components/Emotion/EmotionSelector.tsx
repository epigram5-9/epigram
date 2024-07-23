/*
  여러 개의 EmotionIconCard를 관리합니다.
  오늘의 감정 조회 함수를 통해 감정 카드의 상태를 변경합니다.
  감정 카드 클릭 핸들러를 통해 오늘의 감정을 저장합니다.
  */

import React, { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import EmotionIconCard from '@/components/Emotion/EmotionCard';
import { EmotionType, EmotionState } from '@/types/emotion';
import usePostEmotion from '@/hooks/usePostEmotion';
import useGetEmotion from '@/hooks/useGetEmotion';
import EmotionSaveToast from './EmotionSaveToast';

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

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const getEmotionMutation = useGetEmotion();
  const postEmotionMutation = usePostEmotion();

  // 오늘의 감정 조회
  useEffect(() => {
    getEmotionMutation.mutate(undefined, {
      onSuccess: (emotion) => {
        if (emotion) {
          setStates((prevStates) => ({
            ...prevStates,
            [emotion]: 'Clicked',
          }));
        }
      },
      onError: (error: unknown) => {
        // eslint-disable-next-line
        console.error(error);
      },
    });
  }, [getEmotionMutation]);

  // 감정 카드 클릭 핸들러
  const handleCardClick = async (iconType: EmotionType) => {
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

    // 오늘의 감정 저장
    postEmotionMutation.mutate(iconType, {
      onSuccess: (_, clickedIconType) => {
        setSelectedEmotion(clickedIconType);
      },
      onError: (error: unknown) => {
        // eslint-disable-next-line
        console.error(error);
      },
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
    <>
      <div className={`justify-start items-start inline-flex ${containerClass}`}>
        {(['감동', '기쁨', '고민', '슬픔', '분노'] as const).map((iconType) => (
          <EmotionIconCard key={iconType} iconType={iconType} size={cardSize} state={states[iconType]} onClick={() => handleCardClick(iconType)} />
        ))}
      </div>
      {selectedEmotion && <EmotionSaveToast iconType={selectedEmotion} />}
    </>
  );
}

export default EmotionSelector;
