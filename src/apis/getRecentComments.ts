import type { GetRecentCommentsResponseType } from '@/schema/recentcomment';
import httpClient from './index';

const getRecentComments = async (cursor: number, limit: number): Promise<GetRecentCommentsResponseType> => {
  const response = await httpClient.get('/comments', {
    params: {
      cursor,
      limit,
    },
  });
  return response.data;
};

export default getRecentComments;
