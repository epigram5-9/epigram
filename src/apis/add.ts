import { AddEpigramRequestType } from '@/schema/addEpigram';
import httpClient from '.';

const postEpigram = async (request: AddEpigramRequestType) => {
  const response = await httpClient.post('/epigrams', request);
  return response.data;
};

export default postEpigram;
