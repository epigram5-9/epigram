import axios from 'axios';

const exchangeCodeForToken = async (code: string) => {
  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID_TEST,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET_TEST,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_TEST,
    grant_type: 'authorization_code',
  });

  return response.data;
};

export default exchangeCodeForToken;
