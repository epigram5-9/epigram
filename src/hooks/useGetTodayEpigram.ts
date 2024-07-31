import { useQuery } from '@tanstack/react-query';
import getTodayEpigram from '@/apis/getTodayEpigram';
import { EpigramType } from '@/schema/todayepigram';

const useGetTodayEpigram = () =>
  useQuery<EpigramType, Error>({
    queryKey: ['epigram'],
    queryFn: getTodayEpigram,
  });

export default useGetTodayEpigram;
