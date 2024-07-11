import React from 'react';
import Image from 'next/image';

interface CommentCardProps {
  size: 'sm' | 'md' | 'lg';
  status: 'edit' | 'complete';
}

const sizeStyles = {
  sm: 'w-[360px] h-[130px]',
  md: 'w-[384px] h-[162px]',
  lg: 'w-[640px] h-[176px]',
};

function CommentCard({ size, status }: CommentCardProps) {
  return (
    <div className={`${sizeStyles[size]} px-6 py-4 bg-slate-100 border-t border-slate-300 flex-col justify-start items-start gap-2.5 inline-flex`}>
      <div className='justify-start items-start gap-4 inline-flex'>
        <div className='w-12 h-12 relative'>
          <div className='w-12 h-12 bg-zinc-300 rounded-full overflow-hidden flex items-center justify-center'>
            <Image src='/ProfileTestImage.jpg' alt='프로필 이미지' layout='fill' objectFit='cover' className='rounded-full' />{' '}
          </div>
        </div>
        <div className='flex-col justify-start items-start gap-2 inline-flex'>
          <div className='justify-start items-center gap-[76px] inline-flex'>
            <div className='justify-start items-start gap-2 flex'>
              <div className="text-zinc-600 text-xs font-normal font-['Pretendard'] leading-[18px]">지킬과 하이드</div>
              <div className="text-zinc-600 text-xs font-normal font-['Pretendard'] leading-[18px]">1시간 전</div>
            </div>
            {status === 'edit' && (
              <div className='justify-start items-start gap-4 flex'>
                <div className="text-neutral-700 text-xs font-normal font-['Pretendard'] underline leading-[18px] cursor-pointer">수정</div>
                <div className="text-red-400 text-xs font-normal font-['Pretendard'] underline leading-[18px] cursor-pointer">삭제</div>
              </div>
            )}
          </div>
          <div className="w-full text-zinc-800 text-sm font-normal font-['Pretendard'] leading-normal">
            오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
