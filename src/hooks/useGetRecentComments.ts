import { useQuery } from '@tanstack/react-query';
import getRecentComments from '@/apis/getRecentComments';
import { GetRecentCommentsResponseType } from '@/schema/recentcomment';

const useGetRecentComments = () =>
  useQuery<GetRecentCommentsResponseType, Error>({
    queryKey: ['recentComments', 3],
    queryFn: getRecentComments,
  });

export default useGetRecentComments;
