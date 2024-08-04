import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Epigram } from '@/types/epigram.types';
import NONE_EPI from '../../../public/none-epi.svg';

const sizeStyles = {
  xs: 'w-[286px] max-h-[132px]',
  sm: 'sm:w-[312px] sm:max-h-[152px]',
  md: 'md:w-[384px] md:max-h-[180px]',
  lg: 'lg:w-[540px] lg:max-h-[160px]',
  xl: 'xl:w-[640px] xl:max-h-[196px]',
};

const textSizeStyles = {
  xs: 'text-xs',
  sm: 'sm:text-sm',
  md: 'md:text-base',
  lg: 'lg:text-xl',
  xl: 'xl:text-2xl',
};

interface MyEpigramProps {
  epigrams: Epigram[];
  totalCount: number;
  onMoreEpigramLoad: () => void;
}

function MyEpigrams({ epigrams, totalCount, onMoreEpigramLoad }: MyEpigramProps) {
  const router = useRouter();

  // 에피그램 등록 페이지 이동
  const handleAddEpigram = () => {
    router.push('/addEpigram');
  };

  // 에피그램 상세 페이지 이동
  const handleEpigramClick = (epigramId: number) => {
    router.push(`/epigrams/${epigramId}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, epigramId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleEpigramClick(epigramId);
    }
  };

  return totalCount > 0 ? (
    <div className='flex flex-col gap-[48px]'>
      {epigrams.map((epigram) => (
        <div
          key={epigram.id}
          onClick={() => handleEpigramClick(epigram.id)}
          onKeyDown={(event) => handleKeyDown(event, epigram.id)}
          role='button'
          tabIndex={0}
          className={`relative flex-col justify-start items-end gap-2 inline-flex cursor-pointer ${sizeStyles.xs} ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg} ${sizeStyles.xl}`}
        >
          <div className='w-full p-[22px] bg-white rounded-[14.67px] shadow border border-zinc-100 flex-col justify-start items-start flex relative overflow-hidden'>
            <div className='absolute inset-0 bg-stripes w-full h-full'></div>
            <div className='relative w-full z-10 flex flex-col justify-start items-start flex-1'>
              <div className='self-stretch flex-col justify-start items-start gap-2 flex'>
                <div
                  className={`self-stretch ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} text-neutral-700 font-normal font-iropkeBatang leading-normal`}
                >
                  {epigram.content}
                </div>
                <div
                  className={`self-stretch ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} text-right text-slate-400 font-normal font-iropkeBatang leading-normal`}
                >
                  - {epigram.author} -
                </div>
              </div>
            </div>
          </div>
          <div className='justify-start items-start gap-2 inline-flex'>
            {epigram.tags.map((tag) => (
              <div
                key={tag.id}
                className={`text-right ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} text-slate-400 font-normal font-iropkeBatang leading-normal`}
              >
                #{tag.name}
              </div>
            ))}
          </div>
        </div>
      ))}
      {totalCount > epigrams.length && (
        <div className='w-full flex items-center justify-center'>
          <Button className='text-slate-400 border border-slate-300 rounded-[100px] py-[12px] px-[20px]' onClick={onMoreEpigramLoad}>
            + 더보기
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <Image src={NONE_EPI} alt='돋보기아이콘' width={144} height={144} />
      <div className='flex flex-col gap-[48px] justify-center items-center'>
        <div className='text-center'>
          <p>아직 작성한 에피그램이 없어요!</p>
          <p>에피그램을 작성하고 감정을 공유해보세요.</p>
        </div>
        <Button className='px-[18px] py-3 rounded-[100px] border border-neutral-200 justify-center items-center gap-1' onClick={handleAddEpigram}>
          에피그램 만들기
        </Button>
      </div>
    </div>
  );
}

export default MyEpigrams;
