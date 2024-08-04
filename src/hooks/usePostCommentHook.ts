import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '@/apis/epigramComment';
import { PostCommentRequest } from '@/types/epigram.types';
import { toast } from '@/components/ui/use-toast';
import queries from '@/apis/queries';

const usePostCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentData: PostCommentRequest) => postComment(commentData),
    onSuccess: (variables) => {
      //NOTE: 댓글이 추가된 에피그램의 댓글 쿼리를 무효화
      queryClient.invalidateQueries({
        queryKey: queries.epigramComment.getComments(variables.epigramId).queryKey,
      });
      toast({
        className: 'bg-white',
        title: '댓글 등록 성공',
        description: '댓글이 성공적으로 등록되었습니다.',
      });
    },
    onError: (error) => {
      toast({
        className: 'bg-white',
        title: '댓글 등록 실패',
        description: `댓글 등록 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
        variant: 'destructive',
      });
    },
  });
};

export default usePostCommentMutation;
