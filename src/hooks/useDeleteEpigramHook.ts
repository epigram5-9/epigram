import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEpigram } from '@/apis/epigram';
import { MutationOptions } from '@/types/query';
import { DeleteEpigramType } from '@/types/epigram.types';

const useDeleteEpigram = (options?: MutationOptions<number, DeleteEpigramType>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEpigram(id),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

export default useDeleteEpigram;
