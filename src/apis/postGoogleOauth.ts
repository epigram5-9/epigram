import axios from 'axios';
import httpClient from '.';

// NOTE: Google 서버에서 ID 토큰 가져오기
const getGoogleIdToken = async (code: string) => {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_TEST,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET_TEST,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_TEST,
    grant_type: 'authorization_code',
  });

  return response.data;
};

const postGoogleOauth = async (code: string) => {
  const tokenResponse = await getGoogleIdToken(code);
  const idToken = tokenResponse.id_token;

  const response = await httpClient.post('/auth/signIn/GOOGLE', {
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_TEST,
    token: idToken,
  });

  return response.data;
};

export default postGoogleOauth;
