import React, { useState } from 'react';
import EmotionSelector from '../Emotion/EmotionSelector';

function TodayEmotion() {
  const [isEmotionSaved, setIsEmotionSaved] = useState<boolean>(false);

  const handleEmotionSaved = () => {
    setTimeout(() => {
      setIsEmotionSaved(true);
    }, 1000);
  };

  if (isEmotionSaved) return null;

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
