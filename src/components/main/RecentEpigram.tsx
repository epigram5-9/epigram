import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useGetRecentEpigrams from '@/hooks/useGetRecentEpigrams';
import EpigramCard from '@/components/Card/EpigramCard';
import { RecentEpigramType } from '@/schema/recentEpigram';
import LoadMoreButton from './LoadMoreButton';

function RecentEpigrams() {
  const router = useRouter();
  const [limit, setLimit] = useState(3);
  const { data, error, isLoading } = useGetRecentEpigrams(limit);

  const handleEpigramClick = (id: number) => {
    router.push(`/epigrams/${id}`);
  };

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className='text-black-600 text-2xl font-semibold font-pretendard leading-loose'>최신 에피그램</h1>
      <div className='mt-10 flex flex-col items-center'>
        {data?.list.map((epigram: RecentEpigramType) => (
          <div
            key={epigram.id}
            onClick={() => handleEpigramClick(epigram.id)}
            role='button'
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEpigramClick(epigram.id);
              }
            }}
          >
            <EpigramCard content={epigram.content} author={epigram.author} tags={epigram.tags} />
          </div>
        ))}
        {data && limit < data.totalCount && (
          <div className='mt-10 w-full flex justify-center'>
            <LoadMoreButton onClick={loadMore} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentEpigrams;
