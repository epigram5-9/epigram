import React from 'react';
import Image from 'next/image';

interface LoadMoreButtonProps {
  onClick: () => void;
}

function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <div
      onClick={onClick}
      className='h-12 px-[18px] py-3 rounded-[100px] border border-[#cfdbea] justify-center items-center gap-1 inline-flex cursor-pointer'
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
      <div className='text-#abb8ce text-sm font-normal font-Pretendard leading-normal'>더보기</div>
    </div>
  );
}

export default LoadMoreButton;
