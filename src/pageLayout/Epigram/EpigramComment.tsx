import CommentList from '@/components/epigram/Comment/CommentList';
import CommentTextarea from '@/components/epigram/Comment/CommentTextarea';
import { paddingStyles } from '@/styles/CommentCardStyles';
import { EpigramCommentProps } from '@/types/epigram.types';
import Image from 'next/image';

function EpigramComment({ epigramId, currentUserId, userImage }: EpigramCommentProps) {
  return (
    <div className='bg-slate-100 flex justify-center '>
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
            <CommentTextarea epigramId={epigramId} />
          </div>
        </div>
        <CommentList epigramId={epigramId} currentUserId={currentUserId} />
      </div>
    </div>
  );
}

export default EpigramComment;