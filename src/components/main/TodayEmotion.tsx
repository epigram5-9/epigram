import React, { useState } from 'react';
import { useEmotionContext } from '@/context/EmotionContext';
import EmotionSelector from '../Emotion/EmotionSelector';

interface TodayEmotionProps {
  isMyPage?: boolean;
}

function TodayEmotion({ isMyPage = false }: TodayEmotionProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  // NOTE: 오늘의 감정 선택 시 감정 달력 및 감정 차트 동기화를 위한 context 추가
  const { setShouldRefetch } = useEmotionContext();

  const handleEmotionSaved = () => {
    if (isMyPage) setShouldRefetch(true);
    else setIsVisible(false);
  };

  if (!isVisible) return null;
  return (
    <div className='w-[312px] md:w-[384px] lg:w-[640px]'>
      <h1 className='text-black-600 font-semibold font-pretendard leading-loose text-[16px] lg:text-[24px]'>오늘의 감정</h1>
      <div className='mt-[24px] lg:mt-[40px] flex justify-end'>
        <EmotionSelector onEmotionSaved={handleEmotionSaved} />
      </div>
    </div>
  );
}

export default TodayEmotion;
