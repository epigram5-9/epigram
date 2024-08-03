import type { GetRecentEpigramsResponseType } from '@/schema/recentEpigram';
import httpClient from './index';

const getRecentEpigrams = async (cursor: number | null, limit: number): Promise<GetRecentEpigramsResponseType> => {
  const response = await httpClient.get('/epigrams', {
    params: {
      cursor,
      limit,
    },
  });
  return response.data;
};

export default getRecentEpigrams;
