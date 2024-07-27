import axios from 'axios';
import qs from 'qs';

// NOTE: 토큰 가져오는 함수
const getToken = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInRlYW1JZCI6IjUtOSIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIyMDUwNTY3LCJleHAiOjE3MjIwNTIzNjcsImlzcyI6InNwLWVwaWdyYW0ifQ.uD0OZu7OFxBl3XqHGqNaqCLCDcE9BZant875W9tVr0o';

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
