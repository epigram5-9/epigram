import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { CommentResponseType } from '@/schema/comment';
import getEpigramComments from '@/apis/epigramComment';

const useEpigramCommentsQuery = (epigramId: number) =>
  useInfiniteQuery<CommentResponseType, Error, InfiniteData<CommentResponseType>, [string, number], number | undefined>({
    queryKey: ['epigramComments', epigramId],
    queryFn: ({ pageParam }) => getEpigramComments({ id: epigramId, limit: 3, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

export default useEpigramCommentsQuery;
