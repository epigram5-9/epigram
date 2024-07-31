import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { sizeStyles, textSizeStyles, gapStyles, paddingStyles, contentWidthStyles } from '@/styles/CommentCardStyles';
import { CommentType } from '@/schema/comment';
import { Button } from '@/components/ui/button';
import NONE_EPI from '../../../public/none-epi.svg';

interface MyCommentProps {
  comments: CommentType[];
  totalCount: number;
  onMoreEpigramLoad: () => void;
}

function MyComment({ comments, totalCount, onMoreEpigramLoad }: MyCommentProps) {
  const router = useRouter();

  const handleMoveToMain = () => {
    router.push('/epigrams');
  };

  return totalCount > 0 ? (
    <div className='flex flex-col'>
      {comments.map((comment) => {
        const formattedDate = new Date(comment.createdAt).toLocaleString(); // createdAt을 comment에서 가져옴

        return (
          <div
            key={comment.id}
            className={`bg-background-100 border-t border-slate-300 flex-col justify-start items-start gap-2.5 inline-flex ${sizeStyles.sm} ${sizeStyles.md} ${sizeStyles.lg} ${paddingStyles.sm} ${paddingStyles.md} ${paddingStyles.lg}`}
          >
            <div className='justify-start items-start gap-4 inline-flex'>
              <div className='w-12 h-12 relative'>
                <div className='w-12 h-12 bg-zinc-300 rounded-full overflow-hidden flex items-center justify-center relative'>
                  <Image src={comment.writer.image || '/ProfileTestImage.jpg'} alt='프로필 이미지' width={50} height={50} className='rounded-full' />
                </div>
              </div>
              <div
                className={`flex-col justify-start items-start ${gapStyles.sm} ${gapStyles.md} ${gapStyles.lg} inline-flex ${contentWidthStyles.sm} ${contentWidthStyles.md} ${contentWidthStyles.lg}`}
              >
                <div className='justify-between items-center w-full inline-flex'>
                  <div className='justify-start items-start gap-2 flex'>
                    <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.name} ${textSizeStyles.md.name} ${textSizeStyles.lg.name}`}>
                      {comment.writer.nickname}
                    </div>
                    <div className={`text-zinc-600 font-normal font-pretendard leading-normal ${textSizeStyles.sm.time} ${textSizeStyles.md.time} ${textSizeStyles.lg.time}`}>
                      {formattedDate} {/* 중괄호 추가 */}
                    </div>
                  </div>
                  <div className='justify-start items-start gap-4 flex'>
                    <Button className={`text-neutral-700 underline leading-[18px] cursor-pointer p-0 ${textSizeStyles.sm.action} ${textSizeStyles.md.action} ${textSizeStyles.lg.action}`}>수정</Button>
                    <Button className={`text-red-400 underline leading-[18px] cursor-pointer p-0 ${textSizeStyles.sm.action} ${textSizeStyles.md.action} ${textSizeStyles.lg.action}`}>삭제</Button>
                  </div>
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
      })}
      {totalCount > comments.length && (
        <div className='w-full flex items-center justify-center'>
          <Button className='text-slate-400 border border-slate-300 rounded-[100px] py-[12px] px-[20px]' onClick={onMoreEpigramLoad}>
            + 더보기
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <Image src={NONE_EPI} alt='돋보기아이콘' width={144} height={144} />
      <div className='flex flex-col gap-[48px] justify-center items-center'>
        <div className='text-center'>
          <p>아직 작성한 댓글이 없어요!</p>
          <p>댓글을 달고 다른 사람들과 교류해보세요.</p>
        </div>
        <Button className='px-[18px] py-3 rounded-[100px] border border-neutral-200 justify-center items-center gap-1' onClick={handleMoveToMain}>
          에피그램 둘러보기
        </Button>
      </div>
    </div>
  );
}

export default MyComment;
