import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetEpigramResponseType, EpigramRequestType } from '@/schema/epigram';
import { toast } from '@/components/ui/use-toast';
import queries from '@/apis/queries';
import { toggleEpigramLike } from '@/apis/epigram';

type MutationContext = {
  previousEpigram: GetEpigramResponseType | undefined;
};

const useEpigramLike = (epigram: GetEpigramResponseType) => {
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation<GetEpigramResponseType, Error, EpigramRequestType, MutationContext>({
    mutationFn: toggleEpigramLike,
    onMutate: async (): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: queries.epigram.getEpigram({ id: epigram.id }).queryKey });

      const previousEpigram = queryClient.getQueryData<GetEpigramResponseType>(queries.epigram.getEpigram({ id: epigram.id }).queryKey);

      if (previousEpigram) {
        const updatedEpigram = {
          ...previousEpigram,
          isLiked: !previousEpigram.isLiked,
          likeCount: previousEpigram.isLiked ? previousEpigram.likeCount - 1 : previousEpigram.likeCount + 1,
        };
        queryClient.setQueryData(queries.epigram.getEpigram({ id: epigram.id }).queryKey, updatedEpigram);
      }

      return { previousEpigram };
    },
    onError: (err, _, context) => {
      if (context?.previousEpigram) {
        queryClient.setQueryData(queries.epigram.getEpigram({ id: epigram.id }).queryKey, context.previousEpigram);
      }
      toast({
        title: '좋아요 오류',
        description: '잠시 후 다시 시도해 주세요.',
        variant: 'destructive',
      });
      // eslint-disable-next-line no-console
      console.error('좋아요 오류:', err);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queries.epigram.getEpigram({ id: epigram.id }).queryKey, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queries.epigram.getEpigram({ id: epigram.id }).queryKey });
    },
  });

  const handleLikeClick = () => {
    toggleLike({ id: epigram.id });
  };

  return { handleLikeClick };
};

export default useEpigramLike;
