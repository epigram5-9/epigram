import { useQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import { GetEpigramRequestType } from '@/schema/epigram';

const useEpigramQuery = (request: GetEpigramRequestType) => useQuery(queries.epigram.getEpigram(request));

export default useEpigramQuery;
