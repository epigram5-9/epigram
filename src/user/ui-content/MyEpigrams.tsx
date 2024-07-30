import React from 'react';

// figma 상으로는 sm ~ 3xl 사이즈로 구현되어 있는데, tailwind 환경을 반영해
// xs ~ 2xl 으로 정의했습니다.
const sizeStyles = {
  xs: 'w-[286px] max-h-[132px]',
  sm: 'sm:w-[312px] sm:max-h-[152px]',
  md: 'md:w-[384px] md:max-h-[180px]',
  lg: 'lg:w-[540px] lg:max-h-[160px]',
  xl: 'xl:w-[640px] xl:max-h-[196px]',
  '2xl': '2xl:w-[744px] 2xl:max-h-[196px]',
};

const textSizeStyles = {
  xs: 'text-xs',
  sm: 'sm:text-sm',
  md: 'md:text-base',
  lg: 'lg:text-xl',
  xl: 'xl:text-2xl',
  '2xl': '2xl:text-2xl',
};

interface Tag {
  name: string;
  id: number;
}

interface MyEpigramProps {
  epigram: {
    epigramId: number;
    content: string;
    author: string;
    tags: Tag[];
  };
}

function MyEpigrams({ epigram }: MyEpigramProps) {
  return (
    <div className={`relative flex-col justify-start items-end gap-2 inline-flex ${sizeStyles.xs} ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg} ${sizeStyles.xl} ${sizeStyles['2xl']}`}>
      <div className='w-full p-[22px] bg-white rounded-[14.67px] shadow border border-zinc-100 flex-col justify-start items-start flex relative overflow-hidden'>
        {/* eslint-disable-next-line */}
        <div className='absolute inset-0 bg-stripes w-full h-full'></div> {/* 줄무늬를 만들려면 비어있는 div가 필요합니다. */}
        <div className='relative w-full z-10 flex flex-col justify-start items-start flex-1'>
          <div className='self-stretch flex-col justify-start items-start gap-2 flex'>
            <div
              className={`self-stretch ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} ${textSizeStyles['2xl']} text-neutral-700 font-normal font-iropkeBatang leading-normal`}
            >
              {epigram.content}
            </div>
            <div
              className={`self-stretch ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} ${textSizeStyles['2xl']} text-right text-slate-400 font-normal font-iropkeBatang leading-normal`}
            >
              - {epigram.author} -
            </div>
          </div>
        </div>
      </div>
      <div className='justify-start items-start gap-2 inline-flex'>
        {epigram.tags.map((tag) => (
          <div
            key={tag.id} // 태그의 고유 ID를 키로 사용
            className={`text-right ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} ${textSizeStyles['2xl']} text-slate-400 font-normal font-iropkeBatang leading-normal`}
          >
            #{tag.name} {/* 태그 출력 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEpigrams;
