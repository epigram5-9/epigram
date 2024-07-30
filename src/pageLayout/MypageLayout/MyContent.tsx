import { useEffect, useState } from 'react';
import useGetEpigrams from '@/hooks/useGetEpigrams';
import MyEpigrams from '@/user/ui-content/MyEpigrams';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import NONE_EPI from '../../../public/none-epi.svg';
import spinner from '../../../public/spinner.svg';

interface MyContentProps {
  userId: number;
}

interface Epigram {
  writerId: number;
  id: number;
  likeCount: number;
  tags: { id: number; name: string }[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

interface EpigramsResponse {
  totalCount: number;
  nextCursor: number | null;
  list: Epigram[];
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

  const handleMoreLoad = () => {
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
          내 에피그램({epigrams?.totalCount})
        </button>
        <button type='button' className='text-neutral-400 font-semibold text-2xl'>
          내 댓글(0)
        </button>
      </div>
      <div className='w-full py-[36px]'>
        <div className='flex flex-col gap-[48px]'>
          {epigrams.totalCount > 0 ? (
            <>
              {epigrams.list.map((epi) => {
                const epigram = {
                  epigramId: epi.id,
                  content: epi.content,
                  author: epi.author,
                  tags: epi.tags,
                };
                return <MyEpigrams key={epi.id} epigram={epigram} />;
              })}
              {epigrams.totalCount > epigrams.list.length && (
                <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
                  <Button className='text-slate-400 border border-slate-300 rounded-[100px] py-[12px] px-[20px]' onClick={handleMoreLoad}>
                    + 더보기
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className='flex flex-col gap-4 justify-center items-center'>
              <Image src={NONE_EPI} alt='돋보기아이콘' width={144} height={144} />
              <div className='flex flex-col gap-[48px] justify-center items-center'>
                <div className='text-center'>
                  <p>아직 작성한 에피그램이 없어요!</p>
                  <p>에피그램을 작성하고 감정을 공유해보세요.</p>
                </div>
                <Button className='px-[18px] py-3 rounded-[100px] border border-neutral-200 justify-center items-center gap-1'>에피그램 만들기</Button>
              </div>
            </div>
          )}
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
