import { useInfiniteQuery, QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { GetEpigramsResponseType } from '@/schema/epigrams';
import getEpigrams from '@/apis/getEpigrams';

type EpigramsQueryKey = [string, string];

const fetchEpigrams = async ({ pageParam = 0, queryKey }: QueryFunctionContext<EpigramsQueryKey>): Promise<GetEpigramsResponseType> => {
  const [, keyword] = queryKey;
  const cursor = typeof pageParam === 'number' ? pageParam : undefined;
  const response = await getEpigrams({ keyword, limit: 10, cursor });
  return response;
};

const useEpigrams = (currentSearch: string) =>
  useInfiniteQuery<GetEpigramsResponseType, Error>({
    queryKey: ['epigrams', currentSearch] as unknown as QueryKey,
    queryFn: fetchEpigrams as unknown as ({ pageParam, queryKey }: QueryFunctionContext<QueryKey>) => Promise<GetEpigramsResponseType>,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    enabled: !!currentSearch,
    staleTime: 5 * 60 * 1000,
  });

export default useEpigrams;
