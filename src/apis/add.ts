import { AddEpigramRequestType, AddEpigramResponseType } from '@/schema/addEpigram';
import httpClient from '.';

const postEpigram = async (request: AddEpigramRequestType): Promise<AddEpigramResponseType> => {
  const response = await httpClient.post<AddEpigramResponseType>('/epigrams', request);
  return response.data;
};

export default postEpigram;
