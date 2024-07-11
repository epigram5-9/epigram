import axios from 'axios';
import { GetEpigramResponseType, GetEpigramRequestType } from '@/schema/epigram';

const BASE_URL = 'https://fe-project-epigram-api.vercel.app/5-9';

const getEpigram = async (request: GetEpigramRequestType): Promise<GetEpigramResponseType> => {
  const { id } = request;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInRlYW1JZCI6IjUtOSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIwNjc2MDUzLCJleHAiOjE3MjA2Nzc4NTMsImlzcyI6InNwLWVwaWdyYW0ifQ.7vUUbzQWvjJudUF3g_NLJBh6fJG9gF3S8AgaRxga0bk';

  const response = await axios.get(`${BASE_URL}/epigrams/${id}`, {
    headers: {
      // NOTE : 임시로 token을 상수로 선언해서 사용, 토큰관리를 어떻게할지 결정되면 수정 예정
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default getEpigram;
