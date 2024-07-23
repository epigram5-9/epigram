import React from 'react';
import useGetTodayEpigram from '@/hooks/useGetTodayEpigram';
import EpigramCard from '@/components/Card/EpigramCard';

function TodayEpigram() {
  const { data: epigram, error, isLoading } = useGetTodayEpigram();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;
  if (!epigram) return <p>오늘의 에피그램이 없습니다.</p>;

  return <EpigramCard content={epigram.content} author={epigram.author} tags={epigram.tags} />;
}

export default TodayEpigram;
