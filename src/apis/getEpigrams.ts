import httpClient from '.';
import { GetEpigramsParamsType, GetEpigramsResponseType, GetEpigramsResponse } from '@/schema/epigrams';

const TEAM_ID = '5-9';

export const getEpigrams = async (params: GetEpigramsParamsType): Promise<GetEpigramsResponseType> => {
  const response = await httpClient.get(`/${TEAM_ID}/epigrams`, { params });

  // 데이터 일치하는지 확인
  const parsedResponse = GetEpigramsResponse.parse(response.data);
  return parsedResponse;
};
