import { useQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import { GetEpigramRequestType } from '@/schema/epigram';

const useEpigramQuery = (request: GetEpigramRequestType, enabled = true) => {
  return useQuery({
    ...queries.epigram.getEpigram(request),
    enabled,
  });
};

export default useEpigramQuery;
