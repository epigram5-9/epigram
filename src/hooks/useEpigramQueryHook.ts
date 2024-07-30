import { useQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import { EpigramRequestType } from '@/schema/epigram';

const useEpigramQuery = (request: EpigramRequestType | undefined, enabled = true) =>
  useQuery({
    ...queries.epigram.getEpigram(request ?? { id: undefined }),
    enabled: enabled && request?.id !== undefined,
  });

export default useEpigramQuery;
