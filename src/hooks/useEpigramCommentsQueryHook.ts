import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import { CommentResponseType } from '@/schema/comment';

const useEpigramCommentsQuery = (epigramId: number) =>
  useInfiniteQuery<CommentResponseType, Error, InfiniteData<CommentResponseType>>({
    ...queries.epigramComment.getComments(epigramId),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

export default useEpigramCommentsQuery;
