import { useQuery } from '@tanstack/react-query';
import getRecentComments from '@/apis/getRecentComments';
import { GetRecentCommentsResponseType } from '@/schema/recentcomment';

const useGetRecentComments = ({ cursor, limit, enabled }: { cursor: number; limit: number; enabled: boolean }) =>
  useQuery<GetRecentCommentsResponseType, Error>({
    queryKey: ['recentComments', cursor, limit],
    queryFn: () => getRecentComments(cursor, limit),
    enabled,
  });

export default useGetRecentComments;
