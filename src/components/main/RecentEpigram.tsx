import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useGetRecentEpigrams from '@/hooks/useGetRecentEpigrams';
import EpigramCard from '@/components/Card/EpigramCard';
import { RecentEpigramType } from '@/schema/recentEpigram';
import Image from 'next/image';
import LoadMoreButton from './LoadMoreButton';
import spinner from '../../../public/spinner.svg';

function RecentEpigrams() {
  const router = useRouter();
  const [epigrams, setEpigrams] = useState<RecentEpigramType[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const { data, error, isLoading } = useGetRecentEpigrams({ cursor, limit, enabled: shouldFetch });

  useEffect(() => {
    if (data) {
      setEpigrams((prevEpigrams) => [...prevEpigrams, ...data.list]);
      if (data.list.length > 0) {
        setCursor(data.list[data.list.length - 1].id);
      }
      setIsLoadingMore(false);
      setShouldFetch(false);
    }
  }, [data]);


  const handleEpigramClick = (id: number) => {
    router.push(`/epigrams/${id}`);
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    setLimit(5);
    setShouldFetch(true);
  };

  if (isLoading && epigrams.length === 0) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className='text-black-600 text-2xl font-semibold font-pretendard leading-loose text-[16px] lg:text-[24px]'>최신 에피그램</h1>
      <div className='mt-[24px] lg:mt-[40px] gap-[16px] flex flex-col items-center'>
        {epigrams.map((epigram: RecentEpigramType) => (
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
        {isLoadingMore && (
          <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
            <Image src={spinner} alt='로딩중' width={50} height={50} />
          </div>
        )}
        {!isLoadingMore && data?.nextCursor !== null && (
          <div className='mt-10 w-full flex justify-center'>
            <LoadMoreButton onClick={loadMore} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentEpigrams;
