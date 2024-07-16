import { GetEpigramsParamsType, GetEpigramsResponseType, GetEpigramsResponse } from '@/schema/epigrams';
import httpClient from '.';

const getEpigrams = async (params: GetEpigramsParamsType): Promise<GetEpigramsResponseType> => {
  const response = await httpClient.get(`epigrams`, { params });

  // 데이터 일치하는지 확인
  const parsedResponse = GetEpigramsResponse.parse(response.data);
  return parsedResponse;
};

export default getEpigrams;
