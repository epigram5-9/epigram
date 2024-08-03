import type { EpigramType } from '@/schema/todayepigram';
import httpClient from './index';

const getTodayEpigram = async (): Promise<EpigramType> => {
  const response = await httpClient.get('/epigrams/today');
  return response.data;
};

export default getTodayEpigram;
