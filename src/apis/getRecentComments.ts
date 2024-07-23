import type { GetRecentCommentsResponseType } from '@/schema/recentcomment';
import httpClient from './index';

const getRecentComments = async (): Promise<GetRecentCommentsResponseType> => {
  const response = await httpClient.get('/comments', {
    params: {
      limit: 3,
    },
  });
  return response.data;
};

export default getRecentComments;
