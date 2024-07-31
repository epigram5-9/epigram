import { useQuery } from '@tanstack/react-query';
import getEpigrams from '@/apis/getEpigrams';
import { GetEpigramsResponseType } from '@/schema/epigrams';

const useEpigrams = (query: string, page: number, limit: number = 10) =>
  useQuery<GetEpigramsResponseType, Error>({
    queryKey: ['epigrams', query, page, limit],
    queryFn: () => getEpigrams({ keyword: query, limit, cursor: page * limit }),
    enabled: !!query,
    staleTime: 5 * 60 * 1000, // 데이터 신선도 설정
  });

export default useEpigrams;
