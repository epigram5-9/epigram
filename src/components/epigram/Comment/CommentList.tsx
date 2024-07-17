import { useEpigramCommentsQuery } from '@/hooks/useEpigramQueryHook';
import { EpigramCommentProps } from '@/types/epigram.types';
import CommentItem from './CommentItem';
import NoComment from './NoComment';

function CommentList({ epigramId, currentUserId }: EpigramCommentProps) {
  const {
    data: comments,
    isLoading,
    error,
  } = useEpigramCommentsQuery({
    id: epigramId,
    limit: 3,
  });

  if (isLoading) return <div>댓글을 불러오는 중...</div>;
  if (error) return <div>에러: {(error as Error).message}</div>;
  const commentCount = comments?.list.length || 0;

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-base lg:text-xl font-semibold'>댓글({comments?.totalCount})</h3>
      {commentCount > 0 ? comments?.list.map((comment) => <CommentItem key={comment.id} comment={comment} status={comment.writer.id === currentUserId ? 'edit' : 'complete'} />) : <NoComment />}
    </div>
  );
}
export default CommentList;
