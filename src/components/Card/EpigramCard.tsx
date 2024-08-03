import React from 'react';

interface Tag {
  name: string;
  id: number;
}

interface EpigramCardProps {
  content: string;
  author: string;
  tags: Tag[];
}

const sizeStyles = {
  base: 'w-[312px] max-h-[152px]',
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

function EpigramCard({ content, author, tags }: EpigramCardProps) {
  return (
    <div className={`relative flex-col justify-start items-end gap-2 inline-flex ${sizeStyles.base} ${sizeStyles.md} ${sizeStyles.lg} ${sizeStyles.xl}`}>
      <div className='w-full p-[22px] bg-white rounded-[14.67px] shadow border border-zinc-100 flex-col justify-start items-start flex relative overflow-hidden'>
        {/* eslint-disable-next-line */}
        <div className='absolute inset-0 bg-stripes w-full h-full'></div> {/* 줄무늬를 만들려면 비어있는 div가 필요합니다. */}
        <div className='relative w-full z-10 flex flex-col justify-start items-start flex-1'>
          <div className='self-stretch flex-col justify-start items-start gap-2 flex'>
            <div
              className={`self-stretch ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} text-neutral-700 font-normal font-iropkeBatang leading-normal`}
            >
              {content}
            </div>
            <div
              className={`self-stretch ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} text-right text-slate-400 font-normal font-iropkeBatang leading-normal`}
            >
              - {author} -
            </div>
          </div>
        </div>
      </div>
      <div className='justify-start items-start gap-2 inline-flex'>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`text-right ${textSizeStyles.xs} ${textSizeStyles.sm} ${textSizeStyles.md} ${textSizeStyles.lg} ${textSizeStyles.xl} text-slate-400 font-normal font-iropkeBatang leading-normal`}
          >
            #{tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpigramCard;
