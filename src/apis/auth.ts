import type { PostSigninRequestType, PostSigninResponseType } from '@/schema/auth';
import { AxiosError } from 'axios';
import httpClient from '.';

const postSignin = async (request: PostSigninRequestType): Promise<PostSigninResponseType> => {
  try {
    const response = await httpClient.post('/auth/signIn', request);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Axios 에러인 경우
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버에서 응답이 온 경우 (예: 4xx, 5xx)
        throw new Error('로그인 요청 처리 중 문제가 발생했습니다.');
      } else if (axiosError.request) {
        // 요청을 보냈지만 응답을 받지 못한 경우
        throw new Error('서버 응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        // 요청을 설정하는 과정에서 문제가 발생한 경우
        throw new Error('로그인 요청을 처리하는 동안 문제가 발생했습니다.');
      }
    } else {
      // Axios 에러가 아닌 경우 (네트워크 문제 등)
      throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }
};

export default postSignin;
