import { useQuery } from '@tanstack/react-query';
import getRecentComments from '@/apis/getRecentComments';
import { GetRecentCommentsResponseType } from '@/schema/recentcomment';

const useGetRecentComments = (limit: number) =>
  useQuery<GetRecentCommentsResponseType, Error>({
    queryKey: ['recentComments', limit],
    queryFn: () => getRecentComments(limit),
  });

export default useGetRecentComments;
