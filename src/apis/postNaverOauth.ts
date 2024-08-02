import httpClient from '.';

const postNaverOauth = async (code: string, state: string) => {
  const response = await httpClient.post('/auth/signIn/NAVER', {
    state,
    redirectUri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI,
    token: code,
  });
  return response.data;
};

export default postNaverOauth;
