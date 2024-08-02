import httpClient from '.';

const postGoogleOauth = async (code: string) => {
  const response = await httpClient.post('/auth/signIn/GOOGLE', {
    redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    token: code,
  });
  return response.data;
};

export default postGoogleOauth;
