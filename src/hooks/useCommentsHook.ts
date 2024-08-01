import quries from '@/apis/queries';
import { CommentRequestType } from '@/schema/comment';
import { useQuery } from '@tanstack/react-query';

const useCommentsHook = (requset: CommentRequestType) => useQuery(quries.epigramComment.getMyComments(requset));

export default useCommentsHook;
