import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { CommentResponseType } from '@/schema/comment';
import { getEpigramComments } from '@/apis/epigramComment';

const useEpigramCommentsQuery = (epigramId: number) =>
  // NOTE: 순서대로 API응답타입, 에러타입, 반환되는데이터타입, 쿼리 키 타입, 페이지 파라미터의 타입
  useInfiniteQuery<CommentResponseType, Error, InfiniteData<CommentResponseType>, [string, number], number | undefined>({
    queryKey: ['epigramComments', epigramId],
    queryFn: ({ pageParam }) => getEpigramComments({ id: epigramId, limit: 3, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

export default useEpigramCommentsQuery;
