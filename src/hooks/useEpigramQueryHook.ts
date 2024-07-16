import { useQuery } from '@tanstack/react-query';
import queries from '@/apis/queries';
import { GetEpigramRequestType } from '@/schema/epigram';
import { CommentRequestType } from '@/schema/comment';

export const useEpigramQuery = (request: GetEpigramRequestType | undefined, enabled = true) =>
  useQuery({
    ...queries.epigram.getEpigram(request ?? { id: undefined }),
    enabled: enabled && request?.id !== undefined,
  });

export const useEpigramCommentsQuery = (request: CommentRequestType) => useQuery(queries.epigramComment.getComments(request));
