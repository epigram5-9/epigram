import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useGetRecentEpigrams from '@/hooks/useGetRecentEpigrams';
import { RecentEpigramType } from '@/schema/recentEpigram';
import Image from 'next/image';
import MoreEpigramButton from './MoreEpigramButton';
import FeedCard from './FeedCard';
import spinner from '../../../public/spinner.svg';

function EpigramFeed() {
  const router = useRouter();
  const [epigrams, setEpigrams] = useState<RecentEpigramType[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const [limit, setLimit] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [isSingleColumn, setIsSingleColumn] = useState<boolean>(false);

  const { data, error, isLoading } = useGetRecentEpigrams({
    cursor,
    limit,
    enabled: shouldFetch,
  });

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
    setLimit(10);
    setShouldFetch(true);
  };

  const toggleLayout = () => {
    setIsSingleColumn(!isSingleColumn);
  };

  const handleSortKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleLayout();
    }
  };

  if (isLoading && epigrams.length === 0) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <div className='w-full h-[26px] justify-between items-center inline-flex mt-[32px] lg:mt-[120px]'>
        <h1 className='text-[#373737] text-base lg:text-2xl font-semibold font-pretendard leading-relaxed'>피드</h1>
        <div className='w-6 h-6 relative block md:hidden' onClick={toggleLayout} onKeyPress={handleSortKeyPress} role='button' tabIndex={0} aria-label='Toggle layout'>
          <Image src={isSingleColumn ? '/icon/grid-icon.svg' : '/icon/sort-icon.svg'} alt={isSingleColumn ? 'grid layout' : 'sort layout'} width={24} height={24} className='w-full h-full' />
        </div>
      </div>
      <div className={`mt-[24px] lg:mt-[40px] mb-[10px] gap-x-2 gap-y-4 md:gap-y-6 lg:gap-y-10 ${isSingleColumn ? 'grid grid-cols-1' : 'grid grid-cols-2'}`}>
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
            <FeedCard content={epigram.content} author={epigram.author} tags={epigram.tags} size={isSingleColumn ? 'sm2' : 'sm1'} />
          </div>
        ))}
      </div>
      {isLoadingMore && (
        <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
          <Image src={spinner} alt='로딩중' width={50} height={50} />
        </div>
      )}
      {!isLoadingMore && data?.nextCursor !== null && (
        <div className='mt-10 mb-14 w-full flex justify-center'>
          <MoreEpigramButton onClick={loadMore} />
        </div>
      )}
    </div>
  );
}

export default EpigramFeed;
