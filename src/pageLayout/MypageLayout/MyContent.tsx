import { useEffect, useState } from 'react';
import useGetEpigrams from '@/hooks/useGetEpigrams';
import MyEpigrams from '@/user/ui-content/MyEpigrams';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { EpigramsResponse } from '@/types/epigram.types';
import spinner from '../../../public/spinner.svg';

interface MyContentProps {
  userId: number;
}

export default function MyContent({ userId }: MyContentProps) {
  const limit = 3;
  const [cursor, setCursor] = useState(0);
  const [epigrams, setEpigrams] = useState<EpigramsResponse>({ totalCount: 0, nextCursor: null, list: [] });
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { toast } = useToast();

  const epigramsRequest = {
    limit,
    cursor,
    writerId: userId,
  };
  const { data, isLoading, error } = useGetEpigrams(epigramsRequest);

  useEffect(() => {
    if (data && data.list.length > 0) {
      setEpigrams((prev) => ({
        totalCount: data.totalCount,
        nextCursor: data.nextCursor,
        list: [...prev.list, ...data.list],
      }));
      setIsLoadingMore(false);
    }
  }, [data]);

  const handleMoreEpigramLoad = () => {
    if (epigrams.nextCursor !== null) {
      setCursor(epigrams.nextCursor);
      setIsLoadingMore(true);
    }
  };

  if (isLoading && !isLoadingMore) {
    return <Image src={spinner} alt='로딩중' width={200} height={200} />;
  }

  if (error) {
    toast({
      description: error.message,
      className: 'border-state-error text-state-error font-semibold',
    });
  }

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] gap-12'>
      <div className='inline-flex gap-6'>
        <button type='button' className='text-black-600 font-semibold text-2xl'>
          내 에피그램({epigrams.totalCount})
        </button>
        <button type='button' className='text-neutral-400 font-semibold text-2xl'>
          내 댓글(0)
        </button>
      </div>
      <div className='w-full py-[36px]'>
        <div className='flex flex-col gap-[48px]'>
          <MyEpigrams epigrams={epigrams.list} totalCount={epigrams.totalCount} onMoreEpigramLoad={handleMoreEpigramLoad} />
          {isLoadingMore && (
            <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
              <Image src={spinner} alt='로딩중' width={200} height={200} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
