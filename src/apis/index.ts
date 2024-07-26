import axios from 'axios';
import qs from 'qs';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

// NOTE: eslint-disable no-param-reassign 미해결로 인한 설정
httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  /* eslint-disable no-param-reassign */
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  /* eslint-enable no-param-reassign */
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        window.location.href = '/auth/SignIn';
        return Promise.reject(error);
      }

      return httpClient
        .post('/auth/refresh-token', null, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        })
        .then((response) => {
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          const originalRequest = error.config;
          return httpClient(originalRequest);
        })
        .catch(() => {
          window.location.href = '/auth/SignIn';
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  },
);

export default httpClient;
