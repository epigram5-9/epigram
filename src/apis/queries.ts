import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { GetUserRequestType } from '@/schema/user';
import { EpigramRequestType } from '@/schema/epigram';
import { CommentRequestType } from '@/schema/comment';
import { GetMonthlyEmotionLogsRequestType } from '@/schema/emotion';
import { GetEpigramsParamsType } from '@/schema/epigrams';
import { getMe, getUser, getMyContentCount } from './user';
import { getEpigram, toggleEpigramLike } from './epigram';
import { getEpigramComments, getMyEpigramComments } from './epigramComment';
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
    getMyContentCount: (request: GetUserRequestType) => ({
      queryKey: ['getMyContentCount', request],
      queryFn: () => getMyContentCount(request),
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
    getComments: (epigramId: number) => ({
      queryKey: ['epigramComments', epigramId],
      queryFn: ({ pageParam }: { pageParam?: number }) => getEpigramComments({ id: epigramId, limit: 3, cursor: pageParam }),
    }),
    getCommentList: (request: CommentRequestType) => ({
      queryKey: ['epigramComments', request] as const,
      queryFn: ({ pageParam }: { pageParam: number | undefined }) => getEpigramComments({ ...request, cursor: pageParam }),
    }),
    getMyComments: (request: CommentRequestType) => ({
      queryKey: ['myEpigramComments', request],
      queryFn: () => getMyEpigramComments(request),
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
