import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'https://fe-project-epigram-api.vercel.app';
const TEAM_ID = '5-9';

const httpClient = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}/`,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (parameters) => qs.stringify(parameters, { arrayFormat: 'repeat', encode: false }),
});

export default httpClient;
