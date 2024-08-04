import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchComment } from '@/apis/epigramComment';
import { PatchCommentRequest } from '@/types/epigram.types';
import { toast } from '@/components/ui/use-toast';
import queries from '@/apis/queries';

const usePatchCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, ...commentData }: { commentId: number } & PatchCommentRequest) => patchComment(commentId, commentData),
    onSuccess: (updatedComment) => {
      //NOTE: 쿼리를 무효화하면서 바로 캐시를 업데이트
      queryClient.invalidateQueries({
        queryKey: queries.epigramComment.getComments(updatedComment.epigramId).queryKey,
      });
      toast({
        title: '댓글 수정 성공',
        description: '댓글이 성공적으로 수정되었습니다.',
      });
    },
    onError: (error) => {
      toast({
        title: '댓글 수정 실패',
        description: `댓글 수정 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: 'destructive',
      });
    },
  });
};

export default usePatchCommentMutation;
