import React, { useState, useEffect } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import EmotionIconCard from '@/components/Emotion/EmotionCard';
import { EmotionType, EmotionState } from '@/types/emotion';
import usePostEmotion from '@/hooks/usePostEmotion';
import useGetEmotion from '@/hooks/useGetEmotion';
import EmotionSaveToast from './EmotionSaveToast';

/**
 * EmotionSelector 컴포넌트는 여러 개의 EmotionIconCard를 관리하고
 * 사용자의 오늘의 감정을 선택하고 저장하고 출력합니다.
 */
function EmotionSelector() {
  // 반응형 디자인을 위한 미디어 쿼리 훅
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  // 감정 카드 상태 관리를 위한 useState 훅
  const [states, setStates] = useState<Record<EmotionType, EmotionState>>({
    감동: 'Default',
    기쁨: 'Default',
    고민: 'Default',
    슬픔: 'Default',
    분노: 'Default',
  });

  // 현재 선택된 감정을 관리하는 useState 훅
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  // 오늘의 감정을 조회하기 위한 훅
  const getEmotionMutation = useGetEmotion();
  // 감정을 저장하기 위한 훅
  const postEmotionMutation = usePostEmotion();

  // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect 훅
  // 오늘의 감정을 조회하고 상태를 업데이트합니다.
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

  /**
   * 감정 카드 클릭 핸들러
   * 사용자가 감정 카드를 클릭했을 때 호출됩니다.
   * 클릭된 감정 카드를 'Clicked' 상태로 설정하고 나머지 카드는 'Unclicked' 상태로 설정합니다.
   * 감정을 서버에 저장합니다.
   * @param iconType - 클릭된 감정의 타입
   */
  const handleCardClick = async (iconType: EmotionType) => {
    setStates((prevStates) => {
      const newStates = { ...prevStates };

      if (prevStates[iconType] === 'Clicked') {
        // 현재 클릭된 카드가 다시 클릭되면 모든 카드를 Default로 설정
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

  // 반응형 디자인을 위한 카드 크기 설정
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
      {/* 감정이 선택되었을 때 토스트 메시지 표시 */}
      {selectedEmotion && <EmotionSaveToast iconType={selectedEmotion} />}
    </>
  );
}

export default EmotionSelector;
