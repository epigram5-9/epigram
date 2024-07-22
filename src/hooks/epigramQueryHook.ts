import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddEpigramFormType, AddEpigramResponseType } from '@/schema/addEpigram';
import { MutationOptions } from '@/types/query';
import postEpigram from '@/apis/add';
import { AxiosError } from 'axios';

const useAddEpigram = (options?: MutationOptions<AddEpigramFormType, AddEpigramResponseType>) => {
  const queryClient = useQueryClient();

  return useMutation<AddEpigramResponseType, AxiosError, AddEpigramFormType>({
    mutationFn: (newEpigram: AddEpigramFormType) => postEpigram(newEpigram),
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};

export default useAddEpigram;
