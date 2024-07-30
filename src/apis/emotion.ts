import { GetMonthlyEmotionLogsRequestType, GetMonthlyEmotionLogsResponseType } from '@/schema/emotion';

import httpClient from '.';

const getMonthlyEmotionLogs = async (request: GetMonthlyEmotionLogsRequestType): Promise<GetMonthlyEmotionLogsResponseType> => {
  const response = await httpClient.get(`/emotionLogs/monthly`, {
    params: request,
  });
  return response.data;
};

export default getMonthlyEmotionLogs;
