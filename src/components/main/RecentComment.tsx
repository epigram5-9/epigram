import React from 'react';
import useGetRecentComments from '@/hooks/useGetRecentComments';
import CommentCard from '@/components/Card/CommentCard';

function RecentComments() {
  const { data, error, isLoading } = useGetRecentComments();

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1>최신 댓글</h1>
      {data?.list.map((comment) => <CommentCard key={comment.id} writer={comment.writer} content={comment.content} createdAt={new Date(comment.createdAt)} status='view' />)}
    </div>
  );
}

export default RecentComments;
