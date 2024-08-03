import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchEpigram } from '@/apis/epigram'; // API 함수 import
import { EditEpigramRequestType, AddEpigramResponseType } from '@/schema/addEpigram';
import { MutationOptions } from '@/types/query';

const useEditEpigram = (options?: MutationOptions<EditEpigramRequestType, AddEpigramResponseType>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditEpigramRequestType) => patchEpigram(data),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['epigram', variables.id] });

      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};

export default useEditEpigram;
