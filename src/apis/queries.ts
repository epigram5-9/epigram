import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { GetMonthlyEmotionLogsRequestType } from '@/schema/emotion';
import { getMe, getUser } from './user';
import getMonthlyEmotionLogs from './emotion';

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
});

export default quries;
