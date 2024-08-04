import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/apis/epigramComment';
import { toast } from '@/components/ui/use-toast';
import queries from '@/apis/queries';

interface DeleteCommentVariables {
  commentId: number;
  epigramId: number;
}

const useEpigramCommentDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, DeleteCommentVariables>({
    mutationFn: ({ commentId }) => deleteComment(commentId),
    onSuccess: (_, { epigramId }) => {
      // 특정 에피그램의 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: queries.epigramComment.getComments(epigramId).queryKey,
      });

      toast({
        title: '댓글 삭제 성공',
        description: '댓글이 성공적으로 삭제되었습니다.',
      });
    },
    onError: (error) => {
      toast({
        title: '댓글 삭제 실패',
        description: `댓글 삭제 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: 'destructive',
      });
    },
  });
};

export default useEpigramCommentDelete;
