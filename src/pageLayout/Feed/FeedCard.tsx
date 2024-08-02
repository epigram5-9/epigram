import React from 'react';

interface Tag {
  name: string;
  id: number;
}

interface EpigramCardProps {
  content: string;
  author: string;
  tags: Tag[];
  size?: 'sm1' | 'sm2' | 'md' | 'lg';
}

const sizeStyles = {
  sm1: 'w-[152px] max-h-[154px]',
  sm2: 'w-[312px] max-h-[172px]',
  md: 'md:w-[294px] md:max-h-[214px]',
  lg: 'lg:w-[585px] lg:max-h-[307px]',
};

const textSizeStyles = {
  sm1: 'text-xs',
  sm2: 'text-sm',
  md: 'md:text-base',
  lg: 'lg:text-2xl',
};

const paddingStyles = {
  sm1: 'p-4',
  sm2: 'p-6',
  md: 'md:p-6',
  lg: 'lg:p-6',
};

function FeedCard({ content, author, tags, size = 'sm1' }: EpigramCardProps) {
  return (
    <div className={`relative flex-col justify-start items-end gap-[16px] inline-flex ${sizeStyles[size]} ${sizeStyles.md} ${sizeStyles.lg}`}>
      <div
        className={`w-full ${paddingStyles[size]} ${paddingStyles.md} ${paddingStyles.lg} bg-white rounded-[14.67px] shadow border border-zinc-100 flex-col justify-start items-start flex relative overflow-hidden`}
      >
        <div className='absolute inset-0 bg-stripes w-full h-full'></div> {/* Background stripes */}
        <div className='relative w-full z-10 flex flex-col justify-start items-start flex-1'>
          <div className='self-stretch flex-col justify-start items-start gap-2 flex'>
            <div className={`self-stretch ${textSizeStyles[size]} ${textSizeStyles.md} ${textSizeStyles.lg} text-neutral-700 font-normal font-iropkeBatang leading-normal`}>{content}</div>
            <div className={`self-stretch ${textSizeStyles[size]} ${textSizeStyles.md} ${textSizeStyles.lg} text-right text-slate-400 font-normal font-iropkeBatang leading-normal`}>- {author}</div>
          </div>
        </div>
      </div>
      <div className='justify-start items-start gap-2 inline-flex'>
        {tags.map((tag) => (
          <div key={tag.id} className={`text-right ${textSizeStyles[size]} ${textSizeStyles.md} ${textSizeStyles.lg} text-slate-400 font-normal font-iropkeBatang leading-normal`}>
            #{tag.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedCard;
