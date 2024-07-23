import type { GetRecentEpigramsResponseType } from '@/schema/recentEpigram';
import httpClient from './index';

const getRecentEpigrams = async (): Promise<GetRecentEpigramsResponseType> => {
  const response = await httpClient.get('/epigrams', {
    params: {
      limit: 3,
    },
  });
  return response.data;
};

export default getRecentEpigrams;
