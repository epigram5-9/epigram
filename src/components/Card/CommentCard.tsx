import React from 'react';
import Image from 'next/image';

interface CommentCardProps {
  status: 'edit' | 'complete';
}

const sizeStyles = {
  sm: 'w-[360px] h-[130px]',
  md: 'md:w-[384px] md:h-[162px]',
  lg: 'lg:w-[640px] lg:h-[176px]',
};

const textSizeStyles = {
  sm: {
    name: 'text-xs',
    time: 'text-xs',
    action: 'text-xs',
    content: 'text-sm',
  },
  md: {
    name: 'md:text-sm',
    time: 'md:text-sm',
    action: 'md:text-sm',
    content: 'md:text-base',
  },
  lg: {
    name: 'lg:text-base',
    time: 'lg:text-base',
    action: 'lg:text-base',
    content: 'lg:text-xl',
  },
};

const gapStyles = {
  sm: 'gap-2',
  md: 'md:gap-3',
  lg: 'lg:gap-4',
};

const paddingStyles = {
  sm: 'py-4 px-6',
  md: 'md:p-6',
  lg: 'lg:py-[35px] lg:px-6',
};

const contentWidthStyles = {
  sm: 'w-[248px]',
  md: 'md:w-[272px]',
  lg: 'lg:w-[528px]',
};

function CommentCard({ status }: CommentCardProps) {
  return (
    <div
      className={`bg-slate-100 border-t border-slate-300 flex-col justify-start items-start gap-2.5 inline-flex ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg} ${paddingStyles.sm} ${paddingStyles.md} ${paddingStyles.lg}`}
    >
      <div className='justify-start items-start gap-4 inline-flex'>
        <div className='w-12 h-12 relative'>
          <div className='w-12 h-12 bg-zinc-300 rounded-full overflow-hidden flex items-center justify-center'>
            <Image src='/ProfileTestImage.jpg' alt='프로필 이미지' layout='fill' objectFit='cover' className='rounded-full' />{' '}
          </div>
        </div>
        <div className={`flex-col justify-start items-start ${gapStyles.sm} ${gapStyles.md} ${gapStyles.lg} inline-flex ${contentWidthStyles.sm} ${contentWidthStyles.md} ${contentWidthStyles.lg}`}>
          <div className='justify-between items-center w-full inline-flex'>
            <div className='justify-start items-start gap-2 flex'>
              <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.name} ${textSizeStyles.md.name} ${textSizeStyles.lg.name}`}>지킬과 하이드</div>
              <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.time} ${textSizeStyles.md.time} ${textSizeStyles.lg.time}`}>1시간 전</div>
            </div>
            {status === 'edit' && (
              <div className='justify-start items-start gap-4 flex'>
                <div className={`text-neutral-700 underline leading-[18px] cursor-pointer ${textSizeStyles.sm.action} ${textSizeStyles.md.action} ${textSizeStyles.lg.action}`}>수정</div>
                <div className={`text-red-400 underline leading-[18px] cursor-pointer ${textSizeStyles.sm.action} ${textSizeStyles.md.action} ${textSizeStyles.lg.action}`}>삭제</div>
              </div>
            )}
          </div>
          <div
            className={`w-full text-zinc-800 font-normal font-pretendard ${textSizeStyles.sm.content} ${textSizeStyles.md.content} ${textSizeStyles.lg.content} ${contentWidthStyles.sm} ${contentWidthStyles.md} ${contentWidthStyles.lg}`}
          >
            오늘 하루 우울했었는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
