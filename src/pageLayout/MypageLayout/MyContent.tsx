import { useToast } from '@/components/ui/use-toast';
import MyEpigrams from '@/components/mypage/MyEpigrams';
import MyComment from '@/components/mypage/MyComment';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useMyContentState from '@/hooks/useMyContentState';
import useDeleteCommentMutation from '@/hooks/useDeleteCommentHook';
import UserInfo from '@/types/user';
import spinner from '../../../public/spinner.svg';

interface MyContentProps {
  user: UserInfo;
}

export default function MyContent({ user }: MyContentProps) {
  const { toast } = useToast();
  const { isLoadingMore, selectedTab, epigrams, comments, isEpigramsLoading, isCommentsLoading, epigramsError, commentsError, handleMoreLoad, handleTabClick, setComments, refetchComments } =
    useMyContentState(user);

  const deleteCommentMutation = useDeleteCommentMutation({
    onSuccess: ({ commentId }) => {
      // 댓글 삭제 후 상태 업데이트
      setComments((prev) => ({
        totalCount: prev.totalCount - 1,
        nextCursor: prev.nextCursor,
        list: prev.list.filter((comment) => comment.id !== commentId),
      }));
    },
  });

  // 댓글 삭제 훅 호출
  const handleDeleteComment = async (commentId: number) => {
    await deleteCommentMutation.mutateAsync({ commentId, userId: user.id });
  };

  const handleEditComment = () => {
    refetchComments();
  };

  // 에러 처리
  const handleError = (error: Error | null) => {
    if (error) {
      toast({
        description: error.message,
        className: 'border-state-error text-state-error font-semibold',
      });
    }
  };

  handleError(epigramsError);
  handleError(commentsError);

  // 로딩상태
  if ((isEpigramsLoading || isCommentsLoading) && !isLoadingMore) {
    return <Image src={spinner} alt='로딩중' width={200} height={200} />;
  }

  return (
    <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] gap-12'>
      <div className='inline-flex gap-6'>
        <Button
          className={`font-semibold text-2xl ${selectedTab === 'epigrams' ? 'cursor-default text-black-600 disabled:opacity-1 ' : 'cursor-pointer text-neutral-400'}`}
          onClick={() => selectedTab !== 'epigrams' && handleTabClick('epigrams')}
          disabled={selectedTab === 'epigrams'}
        >
          내 에피그램({epigrams.totalCount})
        </Button>
        <Button
          className={`font-semibold text-2xl ${selectedTab === 'comments' ? 'cursor-default text-black-600 disabled:opacity-1 ' : 'cursor-pointer text-neutral-400'}`}
          onClick={() => selectedTab !== 'comments' && handleTabClick('comments')}
          disabled={selectedTab === 'comments'}
        >
          내 댓글({comments.totalCount})
        </Button>
      </div>
      <div className='w-full py-[36px]'>
        <div className='flex flex-col gap-[48px]'>
          {selectedTab === 'epigrams' && <MyEpigrams epigrams={epigrams.list} totalCount={epigrams.totalCount} onMoreEpigramLoad={handleMoreLoad} />}
          {selectedTab === 'comments' && (
            <MyComment comments={comments.list} totalCount={comments.totalCount} onMoreEpigramLoad={handleMoreLoad} onDeleteComment={handleDeleteComment} onEditComment={handleEditComment} />
          )}
          {isLoadingMore && (
            <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
              <Image src={spinner} alt='로딩중' width={200} height={200} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
