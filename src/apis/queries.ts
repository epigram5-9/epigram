import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { EpigramRequestType } from '@/schema/epigram';
import { CommentRequestType } from '@/schema/comment';
import { getMe, getUser } from './user';
import { getEpigram } from './epigram';
import { getEpigramComments } from './epigramComment';

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
    getEpigram: (request: EpigramRequestType) => ({
      queryKey: ['epigram', request.id, request],
      queryFn: () => {
        if (request.id === undefined) {
          throw new Error('Epigram ID가 제공되지 않았습니다.');
        }
        return getEpigram(request);
      },
      enabled: request.id !== undefined,
    }),
  },
  epigramComment: {
    getComments: (request: CommentRequestType) => ({
      queryKey: ['epigramComments', request],
      queryFn: () => getEpigramComments(request),
    }),
  },
});

export default queries;
