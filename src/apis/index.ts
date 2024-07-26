import axios from 'axios';
import qs from 'qs';

const getToken = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidGVhbUlkIjoiNS05Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjE5Nzk0MzIsImV4cCI6MTcyMTk4MTIzMiwiaXNzIjoic3AtZXBpZ3JhbSJ9.Ii8vAMjXqT4hvu0V_KX9TZZsfTPFa2PoPXcy5TEXfY0';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

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
