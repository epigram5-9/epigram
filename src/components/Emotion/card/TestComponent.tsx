import { EmotionIconCard } from '@/components/Emotion/card/EmotionIconCard';

function ExampleComponent() {
  return (
    <div>
      {/* 기본 상태 (Default), 감동 아이콘, 작은 크기 (sm) */}
      <EmotionIconCard iconType='고민' state='Default' size='sm' />

      {/* 클릭되지 않은 상태 (Unclicked), 기쁨 아이콘, 중간 크기 (md) */}
      <EmotionIconCard iconType='기쁨' state='Unclicked' size='md' />

      {/* 클릭된 상태 (Clicked), 슬픔 아이콘, 큰 크기 (lg) */}
      <EmotionIconCard iconType='슬픔' state='Clicked' size='lg' />
    </div>
  );
}

export default ExampleComponent;
