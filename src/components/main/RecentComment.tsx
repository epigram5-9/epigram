import React, { useState } from 'react';
import useGetRecentComments from '@/hooks/useGetRecentComments';
import CommentCard from '@/components/Card/CommentCard';
import type { CommentType } from '@/schema/recentcomment';
import LoadMoreButton from './LoadMoreButton';

function RecentComments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [limit, setLimit] = useState(3);
  const { data, error, isLoading } = useGetRecentComments(limit);

  React.useEffect(() => {
    if (data?.list) {
      setComments(data.list);
    }
  }, [data]);

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className='text-black-600 text-2xl font-semibold font-pretendard leading-loose text-[16px] lg:text-[24px]'>최신 댓글</h1>
      <div className='mt-[16px] lg:mt-[40px] flex flex-col items-center'>
        {comments.map((comment) => (
          <CommentCard key={comment.id} writer={comment.writer} content={comment.content} createdAt={new Date(comment.createdAt)} status='view' />
        ))}
        {data?.totalCount && comments.length < data.totalCount && (
          <div className='mt-10 flex justify-center w-full'>
            <LoadMoreButton onClick={handleLoadMore} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentComments;
