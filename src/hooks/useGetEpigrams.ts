import quries from '@/apis/queries';
import { GetEpigramsParamsType } from '@/schema/epigrams';
import { useQuery } from '@tanstack/react-query';

const useGetEpigrams = (requset: GetEpigramsParamsType) => useQuery(quries.epigrams.getEpigrams(requset));

export default useGetEpigrams;
