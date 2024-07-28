import React from 'react';
import Image from 'next/image';
import { CommentType } from '@/schema/comment';
import { sizeStyles, textSizeStyles, gapStyles, paddingStyles, contentWidthStyles } from '@/styles/CommentCardStyles';
import getCustomRelativeTime from '@/lib/dateUtils';
import { CommentCardProps } from '@/components/Card/CommentCard';

interface CommentItemProps extends CommentCardProps {
  comment: CommentType;
}

function CommentItem({ comment, status }: CommentItemProps) {
  return (
    <div
      className={`bg-slate-100 border-t border-slate-300 flex-col justify-start items-start gap-2.5 inline-flex ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg} ${paddingStyles.sm} ${paddingStyles.md} ${paddingStyles.lg}`}
    >
      <div className='justify-start items-start gap-4 inline-flex'>
        <div className='w-12 h-12 relative'>
          <div className='w-12 h-12 bg-zinc-300 rounded-full overflow-hidden flex items-center justify-center'>
            <Image src={comment.writer.image || '/ProfileTestImage.jpg'} alt='프로필 이미지' layout='fill' objectFit='cover' className='rounded-full' />
          </div>
        </div>
        <div className={`flex-col justify-start items-start ${gapStyles.sm} ${gapStyles.md} ${gapStyles.lg} inline-flex ${contentWidthStyles.sm} ${contentWidthStyles.md} ${contentWidthStyles.lg}`}>
          <div className='justify-between items-center w-full inline-flex'>
            <div className='justify-start items-start gap-2 flex'>
              <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.name} ${textSizeStyles.md.name} ${textSizeStyles.lg.name}`}>{comment.writer.nickname}</div>
              <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.time} ${textSizeStyles.md.time} ${textSizeStyles.lg.time}`}>
                {getCustomRelativeTime(comment.createdAt)}
              </div>
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
            {comment.content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
