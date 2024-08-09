import React, { useEffect, useRef, useCallback } from 'react';
import { EpigramCommentProps } from '@/types/epigram.types';
import useEpigramCommentsQuery from '@/hooks/useEpigramCommentsQueryHook';
import NoComment from './NoComment';
import CommentItem from './CommentItem';

interface CommentListProps extends Omit<EpigramCommentProps, 'userImage'> {
  onEditComment: (id: number) => void;
  editingCommentId: number | null;
}

function CommentList({ epigramId, currentUserId, onEditComment, editingCommentId }: CommentListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useEpigramCommentsQuery(epigramId);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (lastCommentRef.current) {
      observerRef.current.observe(lastCommentRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  if (status === 'pending') return <div>댓글을 불러오는 중...</div>;
  if (status === 'error') return <div>에러: 댓글을 불러오는데 실패했습니다.</div>;

  const allComments = data?.pages.flatMap((page) => page.list) || [];
  const totalCount = data?.pages[0]?.totalCount || 0;

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-base lg:text-xl font-semibold'>댓글({totalCount})</h3>
      {allComments.length > 0 ? (
        <>
          {allComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              status={comment.writer.id === currentUserId ? 'edit' : 'view'}
              onEditComment={onEditComment}
              isEditing={editingCommentId === comment.id}
              epigramId={epigramId}
            />
          ))}
          <div ref={lastCommentRef}>{isFetchingNextPage && <div>더 많은 댓글을 불러오는 중...</div>}</div>
        </>
      ) : (
        <NoComment />
      )}
    </div>
  );
}

export default CommentList;
