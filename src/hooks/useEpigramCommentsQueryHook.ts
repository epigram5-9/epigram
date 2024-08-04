// hooks/useEpigramCommentHook.ts

import { useInfiniteQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import { CommentResponseType } from '@/schema/comment';

const useEpigramCommentsQuery = (epigramId: number) => {
  const query = queries.epigramComment.getCommentList({ id: epigramId, limit: 3 });

  return useInfiniteQuery({
    ...query,
    initialPageParam: undefined,
    getNextPageParam: (lastPage: CommentResponseType) => lastPage.nextCursor ?? undefined,
  });
};

export default useEpigramCommentsQuery;
