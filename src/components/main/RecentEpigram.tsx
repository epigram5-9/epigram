import React from 'react';
import useGetRecentEpigrams from '@/hooks/useGetRecentEpigrams';
import EpigramCard from '@/components/Card/EpigramCard';

function RecentEpigrams() {
  const { data, error, isLoading } = useGetRecentEpigrams();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>최신 에피그램</h1>
      {data?.list.map((epigram) => <EpigramCard key={epigram.id} content={epigram.content} author={epigram.author} tags={epigram.tags} />)}
    </div>
  );
}

export default RecentEpigrams;
