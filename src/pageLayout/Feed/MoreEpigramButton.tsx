import React from 'react';
import Image from 'next/image';

interface LoadMoreButtonProps {
  onClick: () => void;
}

function MoreEpigramButton({ onClick }: LoadMoreButtonProps) {
  return (
    <div
      onClick={onClick}
      className='h-12 lg:h-14 px-[18px] lg:px-10 py-3 bg-[#f5f7fa] rounded-[100px] border border-[#cfdbea] justify-center items-center gap-1 lg:gap-2 inline-flex cursor-pointer'
      role='button'
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className='w-6 h-6 relative'>
        <Image src='/icon/plus-icon.svg' alt='plus icon' layout='fill' objectFit='contain' />
      </div>
      <div className='text-blue-400 text-sm lg:text-xl font-normal lg:font-medium font-pretendard leading-normal lg:leading-loose'>에피그램 더보기</div>
    </div>
  );
}

export default MoreEpigramButton;
