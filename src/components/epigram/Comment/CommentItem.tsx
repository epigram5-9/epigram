import React, { useState } from 'react';
import Image from 'next/image';
import { CommentType } from '@/schema/comment';
import { textSizeStyles, gapStyles, paddingStyles, contentWidthStyles } from '@/styles/CommentCardStyles';
import getCustomRelativeTime from '@/lib/dateUtils';
import { Button } from '@/components/ui/button';
import useDeleteCommentMutation from '@/hooks/useDeleteCommentHook';
import UserProfileModal from '@/components/Card/UserProfileModal';
import { sampleImage } from '@/user/utill/constants';
import DeleteAlertModal from '../DeleteAlertModal';
import CommentTextarea from './CommentTextarea';

interface CommentItemProps {
  comment: CommentType;
  status?: 'view' | 'edit';
  onEditComment: (id: number) => void;
  isEditing: boolean;
  epigramId: number;
}

function CommentItem({ comment, status, onEditComment, isEditing, epigramId }: CommentItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteCommentMutation = useDeleteCommentMutation({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
    },
  });

  const handleDeleteComment = async () => {
    deleteCommentMutation.mutate({ commentId: comment.id, epigramId });
  };

  const handleEditClick = () => {
    onEditComment(comment.id);
  };

  // NOTE: 수정 중일 때(isEditing===true) CommentTextarea를 수정모드로 렌더링
  if (isEditing) {
    return <CommentTextarea epigramId={epigramId} editingComment={comment} onEditComplete={() => onEditComment(0)} />;
  }

  return (
    <div
      className={`h-auto bg-slate-100 border-t border-slate-300 flex-col justify-start items-start gap-2.5 inline-flex w-[360px] md:w-[384px] lg:w-[640px] ${paddingStyles.sm} ${paddingStyles.md} ${paddingStyles.lg}`}
    >
      <div className='h-full justify-start items-start gap-4 inline-flex'>
        <UserProfileModal username={comment.writer.nickname} profileImage={comment.writer.image || '/ProfileTestImage.jpg'}>
          <div className='w-12 h-12 relative cursor-pointer rounded-full'>
            <div>
              <Image src={comment.writer.image || sampleImage} alt='프로필 이미지' layout='fill' objectFit='cover' className='rounded-full' />
            </div>
          </div>
        </UserProfileModal>
        <div className={`flex-col justify-start items-start ${gapStyles.sm} ${gapStyles.md} ${gapStyles.lg} inline-flex ${contentWidthStyles.sm} ${contentWidthStyles.md} ${contentWidthStyles.lg}`}>
          <div className='justify-between items-center w-full inline-flex'>
            <div className='justify-start items-center gap-2 flex'>
              <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.name} ${textSizeStyles.md.name} ${textSizeStyles.lg.name}`}>{comment.writer.nickname}</div>
              <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.time} ${textSizeStyles.md.time} ${textSizeStyles.lg.time}`}>
                {getCustomRelativeTime(comment.createdAt)}
              </div>
              {comment.isPrivate && <Image src='/icon/privateIcon.png' width={16} height={16} alt='비공개' />}
            </div>
            {status === 'edit' && (
              <div className='justify-start items-start gap-4 flex'>
                <Button
                  className={`h-5 p-0 text-neutral-700 leading-[18px] cursor-pointer ${textSizeStyles.sm.action} ${textSizeStyles.md.action} ${textSizeStyles.lg.action}`}
                  onClick={handleEditClick}
                  type='button'
                >
                  수정
                </Button>
                <Button
                  className={`h-5 p-0 text-red-400 leading-[18px] cursor-pointer ${textSizeStyles.sm.action} ${textSizeStyles.md.action} ${textSizeStyles.lg.action}`}
                  onClick={() => setIsDeleteModalOpen(true)}
                  type='button'
                >
                  삭제
                </Button>
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
      <DeleteAlertModal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} onConfirm={handleDeleteComment} title='댓글을 삭제하시겠습니까?' />
    </div>
  );
}

export default CommentItem;
