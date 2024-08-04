import axios from 'axios';

export const getGoogleTokens = async (code: string) => {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_TEST,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET_TEST,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_TEST,
    grant_type: 'authorization_code',
  });

  return response.data; // `response.data`에는 `access_token`, `refresh_token`, `id_token`이 포함됨
};

interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
}

export const refreshGoogleToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  try {
    const response = await axios.post<RefreshTokenResponse>('https://oauth2.googleapis.com/token', {
      client_id: process.env.GOOGLE_CLIENT_ID_TEST,
      client_secret: process.env.GOOGLE_CLIENT_SECRET_TEST,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError를 사용하는 경우
      /* eslint-disable no-console */
      console.error('Error refreshing Google token:', error.response?.data || error.message);
    } else {
      // AxiosError가 아닌 경우
      /* eslint-disable no-console */
      console.error('Unknown error occurred while refreshing Google token:', error);
    }
    throw error;
  }
};

export default async function postGoogleOauth(code: string) {
  // Google OAuth 토큰 교환
  const tokens = await getGoogleTokens(code);
  const idToken = tokens.id_token;

  // Google ID Token을 반환합니다
  return idToken;
}
