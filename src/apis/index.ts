import axios from 'axios';
import qs from 'qs';

// NOTE: axios 선언
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

// NOTE: eslint-disable no-param-reassign 미해결로 인한 설정
httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const idToken = localStorage.getItem('idToken');

    // NOTE: 일반 API 요청에는 accessToken을 사용
    if (accessToken) {
      /* eslint-disable no-param-reassign */
      config.headers.Authorization = `Bearer ${accessToken}`;
      /* eslint-enable no-param-reassign */
    }

    // NOTE: 구글 간편 로그인 관련 요청에는 idToken을 사용
    if (idToken && config.url?.includes('/google')) {
      /* eslint-disable no-param-reassign */
      config.headers.Authorization = `Bearer ${idToken}`;
      /* eslint-enable no-param-reassign */
      return config;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

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

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  window.location.href = '/auth/SignIn';
};
