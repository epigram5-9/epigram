import axios from 'axios';
import qs from 'qs';

// NOTE: 토큰 가져오는 함수
const getToken = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsInRlYW1JZCI6IjUtOSIsInNjb3BlIjoicmVmcmVzaCIsImlhdCI6MTcyMTYxNTYxNSwiZXhwIjoxNzIyMjIwNDE1LCJpc3MiOiJzcC1lcGlncmFtIn0.sCNFSgOQcYGbXWTxWablo9bOmbsw1EI6dTWt8n0xmDQ';

// NOTE: axios 선언
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

// NOTE: 요청 인터셉터 추가
httpClient.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = getToken();
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default httpClient;
