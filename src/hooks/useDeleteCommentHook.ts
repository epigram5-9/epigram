import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/apis/epigramComment';
import { toast } from '@/components/ui/use-toast';
import queries from '@/apis/queries';

interface DeleteCommentVariables {
  commentId: number;
  epigramId?: number;
  userId?: number;
}

const useDeleteCommentMutation = (options?: { onSuccess?: (variables: DeleteCommentVariables) => void }) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, DeleteCommentVariables>({
    mutationFn: ({ commentId }) => deleteComment(commentId),
    onSuccess: (_, variables) => {
      if (variables.epigramId) {
        queryClient.invalidateQueries({
          queryKey: queries.epigramComment.getComments(variables.epigramId).queryKey,
        });
      }

      if (variables.userId) {
        queryClient.invalidateQueries({
          queryKey: queries.epigramComment.getMyComments({
            id: variables.userId,
            limit: 3,
            cursor: 0,
          }).queryKey,
        });
      }

      toast({
        title: '댓글이 삭제되었습니다.',
        variant: 'destructive',
      });

      if (options?.onSuccess) {
        options.onSuccess(variables);
      }
    },
    onError: () => {
      toast({
        title: '댓글 삭제 실패했습니다.',
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteCommentMutation;
