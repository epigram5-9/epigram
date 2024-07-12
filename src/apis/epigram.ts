import axios, { AxiosError } from 'axios';
import { GetEpigramResponseType, GetEpigramRequestType } from '@/schema/epigram';

const BASE_URL = 'https://fe-project-epigram-api.vercel.app/5-9';

const getEpigram = async (request: GetEpigramRequestType): Promise<GetEpigramResponseType> => {
  const { id } = request;
  const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInRlYW1JZCI6IjUtOSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIwNzUzNjYwLCJleHAiOjE3MjA3NTU0NjAsImlzcyI6InNwLWVwaWdyYW0ifQ.HqHWi_Uoj37aZzC_43d2lh5-VR2b4mXZWO--905fCQQ';

  try {
    const response = await axios.get(`${BASE_URL}/epigrams/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    // 에러가 Axios에러인지 확인
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버에 요청 성공, 응답으로 200번대 이외의 상태를 응답으로 받았을때
        throw new Error(`API 에러: ${axiosError.response.status}`);
      } else if (axiosError.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      } else {
        // 요청 설정 중에 오류가 발생한 경우
        throw new Error('요청 설정 중 오류가 발생했습니다.');
      }
    } else {
      // axios 에러가 아닌 경우
      throw new Error('예상치 못한 오류가 발생했습니다.');
    }
  }
};

export default getEpigram;
