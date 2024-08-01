import { useQuery } from '@tanstack/react-query';
import getRecentEpigrams from '@/apis/getRecentEpigrams';
import { GetRecentEpigramsResponseType } from '@/schema/recentEpigram';

const useGetRecentEpigrams = ({ cursor, limit, enabled }: { cursor: number | null; limit: number; enabled: boolean }) =>
  useQuery<GetRecentEpigramsResponseType, Error>({
    queryKey: ['recentEpigrams', cursor, limit],
    queryFn: () => getRecentEpigrams(cursor, limit),
    enabled,
  });

export default useGetRecentEpigrams;
