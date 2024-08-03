import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { EpigramRequestType } from '@/schema/epigram';
import { CommentRequestType } from '@/schema/comment';
import { GetMonthlyEmotionLogsRequestType } from '@/schema/emotion';
import { GetEpigramsParamsType } from '@/schema/epigrams';
import { getMe, getUser } from './user';
import { getEpigram, toggleEpigramLike } from './epigram';
import { getEpigramComments } from './epigramComment';
import getMonthlyEmotionLogs from './emotion';
import getEpigrams from './getEpigrams';

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
    toggleLike: (request: EpigramRequestType) => ({
      queryKey: ['toggleEpigramLike', request.id],
      mutationFn: (variables: EpigramRequestType) => toggleEpigramLike(variables),
    }),
  },
  epigramComment: {
    getComments: (request: CommentRequestType) => ({
      queryKey: ['epigramComments', request],
      queryFn: () => getEpigramComments(request),
    }),
    getCommentList: (request: CommentRequestType) => ({
      queryKey: ['epigramComments', request] as const,
      queryFn: ({ pageParam }: { pageParam: number | undefined }) => getEpigramComments({ ...request, cursor: pageParam }),
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

export default queries;
