import React, { useEffect, useRef, useCallback } from 'react';
import { EpigramCommentProps } from '@/types/epigram.types';
import useEpigramCommentsQuery from '@/hooks/useEpigramCommentsQueryHook';
import CommentItem from './CommentItem';
import NoComment from './NoComment';

interface CommentListProps extends Omit<EpigramCommentProps, 'userImage'> {
  onEditComment: (id: number, content: string, isPrivate: boolean) => void;
}

function CommentList({ epigramId, currentUserId, onEditComment }: CommentListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useEpigramCommentsQuery(epigramId);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  // NOTE: Observer 콜백: 마지막 요소가 화면에 보이면 다음 페이지(댓글 최대3개를 묶어 1페이지 취급) 로드
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
      // NOTE: effect가 실행되기전에 호출해서 메모리 누수를 방지해줌
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
            <CommentItem key={comment.id} comment={comment} status={comment.writer.id === currentUserId ? 'edit' : 'complete'} onEditComment={onEditComment} />
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
