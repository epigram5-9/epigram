import { useQuery } from '@tanstack/react-query';
import getEpigrams from '@/apis/getEpigrams';
import { GetEpigramsResponseType } from '@/schema/epigrams';

function useEpigrams(query: string) {
  return useQuery<GetEpigramsResponseType, Error>({
    queryKey: ['epigrams', query],
    queryFn: () => getEpigrams({ keyword: query, limit: 10 }),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 데이터 신선도 설정
  });
}

export default useEpigrams;
