import { useQuery } from '@tanstack/react-query';
import getRecentEpigrams from '@/apis/getRecentEpigrams';
import { GetRecentEpigramsResponseType } from '@/schema/recentEpigram';

const useGetRecentEpigrams = (limit: number) =>
  useQuery<GetRecentEpigramsResponseType, Error>({
    queryKey: ['recentEpigrams', limit],
    queryFn: () => getRecentEpigrams(limit),
  });

export default useGetRecentEpigrams;
