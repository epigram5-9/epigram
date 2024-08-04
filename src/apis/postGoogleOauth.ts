import httpClient from '.';
import exchangeCodeForToken from './exchangeCodeForToken';

const postGoogleOauth = async (code: string) => {
  // Google OAuth 2.0 토큰 엔드포인트를 호출하여 ID 토큰을 얻습니다.
  const tokenResponse = await exchangeCodeForToken(code);
  const idToken = tokenResponse.id_token;

  // 서버로 ID 토큰을 보내서 인증을 처리합니다.
  const response = await httpClient.post('/auth/signIn/GOOGLE', {
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_TEST,
    token: idToken,
  });

  return response.data;
};

export default postGoogleOauth;
