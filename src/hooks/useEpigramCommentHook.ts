import queries from '@/apis/queries';
import { CommentRequestType } from '@/schema/comment';
import { useQuery } from '@tanstack/react-query';

const useEpigramCommentsQuery = (request: CommentRequestType) => useQuery(queries.epigramComment.getComments(request));

export default useEpigramCommentsQuery;
