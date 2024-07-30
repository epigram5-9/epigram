import axios from 'axios';

const postOauth = async (code: string) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/KAKAO`, {
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    token: code,
  });
  return response.data;
};

export default postOauth;
