import React, { useState, useEffect } from 'react';
import useGetRecentComments from '@/hooks/useGetRecentComments';
import CommentCard from '@/components/Card/CommentCard';
import type { CommentType } from '@/schema/recentcomment';
import Image from 'next/image';
import LoadMoreButton from './LoadMoreButton';
import spinner from '../../../public/spinner.svg';

function RecentComments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  const { data, error, isLoading } = useGetRecentComments({ cursor, limit, enabled: shouldFetch });

  useEffect(() => {
    if (data) {
      setComments((prevComments) => [...prevComments, ...data.list]);
      if (data.list.length > 0) {
        setCursor(data.list[data.list.length - 1].id);
      }
      setIsLoadingMore(false);
      setShouldFetch(false);
    }
  }, [data]);

  const loadMore = () => {
    setIsLoadingMore(true);
    setLimit(4);
    setShouldFetch(true);
  };

  if (isLoading && comments.length === 0) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className='text-black-600 text-2xl font-semibold font-pretendard leading-loose text-[16px] lg:text-[24px]'>최신 댓글</h1>
      <div className='mt-[16px] lg:mt-[40px] flex flex-col items-center'>
        {comments.map((comment) => (
          <CommentCard key={comment.id} writer={comment.writer} content={comment.content} createdAt={new Date(comment.createdAt)} status='view' />
        ))}
        {isLoadingMore && (
          <div className='w-full flex items-center justify-center lg:mt-[70px] md:mt-[50px]'>
            <Image src={spinner} alt='로딩중' width={50} height={50} />
          </div>
        )}
        {!isLoadingMore && data?.nextCursor !== null && (
          <div className='mt-10 w-full flex justify-center'>
            <LoadMoreButton onClick={loadMore} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentComments;
