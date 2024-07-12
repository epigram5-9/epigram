import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { GetEpigramRequestType } from '@/schema/epigram';
import { getMe, getUser } from './user';
import getEpigram from './epigram';

const queries = createQueryKeyStore({
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
  // NOTE: Epigram 관련 query함수
  epigram: {
    getEpigram: (request: GetEpigramRequestType) => ({
      queryKey: ['epigram', request],
      queryFn: () => getEpigram(request),
    }),
  },
});

export default queries;
