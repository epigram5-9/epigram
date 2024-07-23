import { useQuery } from '@tanstack/react-query';
import getRecentEpigrams from '@/apis/getRecentEpigrams';
import { GetRecentEpigramsResponseType } from '@/schema/recentEpigram';

const useGetRecentEpigrams = () =>
  useQuery<GetRecentEpigramsResponseType, Error>({
    queryKey: ['recentEpigrams', 3],
    queryFn: getRecentEpigrams,
  });

export default useGetRecentEpigrams;
