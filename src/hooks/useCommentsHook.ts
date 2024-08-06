import quries from '@/apis/queries';
import { CommentRequestType } from '@/schema/comment';
import { useQuery } from '@tanstack/react-query';

const useCommentsHook = (request: CommentRequestType) =>
  useQuery({
    ...quries.epigramComment.getMyComments(request),
    refetchOnWindowFocus: false,
    enabled: !!request,
  });

export default useCommentsHook;
