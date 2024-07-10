import React from 'react';
import EmotionIconCardContainer from '@/components/Emotion/card/EmotionIconCardContainer';

function ExampleComponent() {
  return (
    <div>
      {/* 기본 상태 (Default), 감동 아이콘, 작은 크기 (sm) */}
      <EmotionIconCardContainer iconType='고민' size='sm' />

      {/* 클릭되지 않은 상태 (Unclicked), 기쁨 아이콘, 중간 크기 (md) */}
      <EmotionIconCardContainer iconType='기쁨' size='md' />

      {/* 클릭된 상태 (Clicked), 슬픔 아이콘, 큰 크기 (lg) */}
      <EmotionIconCardContainer iconType='감동' size='lg' />
      <EmotionIconCardContainer iconType='기쁨' size='lg' />
      <EmotionIconCardContainer iconType='고민' size='lg' />
      <EmotionIconCardContainer iconType='슬픔' size='lg' />
      <EmotionIconCardContainer iconType='분노' size='lg' />
    </div>
  );
}

export default ExampleComponent;
