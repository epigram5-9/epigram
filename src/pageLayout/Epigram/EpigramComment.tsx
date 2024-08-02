import React, { useState } from 'react';
import CommentList from '@/components/epigram/Comment/CommentList';
import CommentTextarea from '@/components/epigram/Comment/CommentTextarea';
import { paddingStyles } from '@/styles/CommentCardStyles';
import { EpigramCommentProps } from '@/types/epigram.types';
import Image from 'next/image';

function EpigramComment({ epigramId, currentUserId, userImage }: EpigramCommentProps) {
  // NOTE: 수정상태를 수정중인 댓글의 ID로 변경
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  return (
    <div className='bg-slate-100 flex justify-center'>
      <div className='w-80 md:w-96 lg:w-[640px] pt-6 lg:pt-12'>
        <h3 className='text-base lg:text-xl font-semibold'>댓글 작성</h3>
        <div className={`flex flex-col gap-4 lg:gap-6 ${paddingStyles.sm} ${paddingStyles.md} ${paddingStyles.lg}`}>
          <div className='flex gap-4 lg:gap-6'>
            <div className='w-12 h-12'>
              {userImage ? (
                <Image src={userImage} alt='사용자 프로필 사진' width={48} height={48} className='rounded-full' />
              ) : (
                <Image src='/profile.svg' alt='기본 프로필 사진' width={48} height={48} />
              )}
            </div>
            {/* NOTE: editingCommentId을 null로 바꿈으로써 수정중인 상태가 아니라는걸 알림 */}
            <CommentTextarea epigramId={epigramId} onEditComplete={() => setEditingCommentId(null)} />
          </div>
        </div>
        <CommentList epigramId={epigramId} currentUserId={currentUserId} editingCommentId={editingCommentId} onEditComment={setEditingCommentId} />
      </div>
    </div>
  );
}

export default EpigramComment;
