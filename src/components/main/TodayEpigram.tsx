import React from 'react';
import { useRouter } from 'next/router';
import useGetTodayEpigram from '@/hooks/useGetTodayEpigram';
import EpigramCard from '@/components/Card/EpigramCard';

function TodayEpigram() {
  const router = useRouter();
  const { data: epigram, error, isLoading } = useGetTodayEpigram();

  const handleEpigramClick = (id: number) => {
    router.push(`/epigrams/${id}`);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;
  if (!epigram) return <p>오늘의 에피그램이 없습니다.</p>;

  return (
    <div>
      <h1 className='text-black-600 font-semibold font-pretendard leading-loose text-[16px] lg:text-[24px]'>오늘의 에피그램</h1>
      <div className='mt-[24px] lg:mt-[40px] gap-[16px] flex flex-col items-center'>
        <div
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
      </div>
    </div>
  );
}

export default TodayEpigram;
