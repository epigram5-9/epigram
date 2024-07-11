import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { GetEpigramRequestType } from '@/schema/epigram';
import { getMe, getUser } from './user';
import getEpigram from './epigram';

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
  epigram: {
    getEpigram: (request: GetEpigramRequestType) => ({
      queryKey: ['epigram', request],
      queryFn: () => getEpigram(request),
    }),
  },
});

export default quries;
