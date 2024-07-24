import type { GetRecentCommentsResponseType } from '@/schema/recentcomment';
import httpClient from './index';

const getRecentComments = async (limit: number): Promise<GetRecentCommentsResponseType> => {
  const response = await httpClient.get('/comments', {
    params: {
      limit,
    },
  });
  return response.data;
};

export default getRecentComments;
