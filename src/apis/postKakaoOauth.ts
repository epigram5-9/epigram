import httpClient from '.';

const postKakaoOauth = async (code: string) => {
  const response = await httpClient.post('/auth/signIn/KAKAO', {
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    token: code,
  });
  return response.data;
};

export default postKakaoOauth;
