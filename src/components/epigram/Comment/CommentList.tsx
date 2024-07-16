import CommentCard from '@/components/Card/CommentCard';
import { useEpigramCommentsQuery } from '@/hooks/useEpigramQueryHook';
import { EpigramCommentProps } from '@/types/epigram.types';

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

  return (
    <div>
      <h3 className='text-base lg:text-xl font-semibold'>댓글({comments?.list.length || 0})</h3>
      {comments?.list.map((comment) => <CommentCard key={comment.id} comment={comment} status={comment.writer.id === currentUserId ? 'edit' : 'complete'} />)}
    </div>
  );
}
export default CommentList;
