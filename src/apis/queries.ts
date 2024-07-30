import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { GetMonthlyEmotionLogsRequestType } from '@/schema/emotion';
import { GetEpigramsParamsType } from '@/schema/epigrams';
import { getMe, getUser } from './user';
import getMonthlyEmotionLogs from './emotion';
import getEpigrams from './getEpigrams';

const quries = createQueryKeyStore({
  user: {
    getMe: () => ({
      queryKey: ['getMe'],
      queryFn: () => getMe(),
    }),
    getUser: (request: GetUserRequestType) => ({
      queryKey: [request],
      queryFn: () => getUser(request),
    }),
  },
  emotion: {
    getMonthlyEmotionLogs: (request: GetMonthlyEmotionLogsRequestType) => ({
      queryKey: ['getMonthlyEmotionLogs', request],
      queryFn: () => getMonthlyEmotionLogs(request),
    }),
  },
  epigrams: {
    getEpigrams: (request: GetEpigramsParamsType) => ({
      queryKey: ['getEpigrams', request],
      queryFn: () => getEpigrams(request),
    }),
  },
});

export default quries;
