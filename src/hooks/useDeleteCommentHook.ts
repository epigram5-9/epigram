import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '@/apis/epigramComment';
import { toast } from '@/components/ui/use-toast';

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['epigramComments'] });

      // 성공 메시지 표시
      toast({
        title: '댓글 삭제 성공',
        description: '댓글이 성공적으로 삭제되었습니다.',
      });
    },
    onError: (error) => {
      // 에러 메시지 표시
      toast({
        title: '댓글 삭제 실패',
        description: `댓글 삭제 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteCommentMutation;
