import axios from 'axios';
import qs from 'qs';

// 토큰 가져오는 함수
const getToken = () =>
  // NOTE: 토큰 가져오는 함수. 현재는 임시로 사용
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsInRlYW1JZCI6IjUtOSIsInNjb3BlIjoicmVmcmVzaCIsImlhdCI6MTcyMDk4NTQ0MCwiZXhwIjoxNzIxNTkwMjQwLCJpc3MiOiJzcC1lcGlncmFtIn0.zJGhi0PYNPQlhGLwojVLSMm5qwJ-SUVnx72NPbOrjsQ';
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

// 요청 인터셉터 추가
httpClient.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const token = getToken();
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }

    if (newConfig.data instanceof FormData) {
      newConfig.headers['Content-Type'] = 'multipart/form-data';
    } else {
      newConfig.headers['Content-Type'] = 'application/json';
    }

    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default httpClient;
