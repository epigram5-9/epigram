import type { GetRecentEpigramsResponseType } from '@/schema/recentEpigram';
import httpClient from './index';

const getRecentEpigrams = async (limit: number): Promise<GetRecentEpigramsResponseType> => {
  const response = await httpClient.get('/epigrams', {
    params: {
      limit,
    },
  });
  return response.data;
};

export default getRecentEpigrams;
