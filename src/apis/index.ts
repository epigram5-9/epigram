import axios from 'axios';
import qs from 'qs';

const getToken = () =>
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidGVhbUlkIjoiNS05Iiwic2NvcGUiOiJhY2Nlc3MiLCJpYXQiOjE3MjE5ODMyMTksImV4cCI6MTcyMTk4NTAxOSwiaXNzIjoic3AtZXBpZ3JhbSJ9.57RemB9wCHGmVhLInNKWs6uKulDLDCv4dcJuGrBsG4s';

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
