import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddEpigramFormType } from '@/schema/addEpigram';
import { MutationOptions } from '@/types/query';
import postEpigram from '@/apis/add';

// useAddEpigram 훅
const useAddEpigram = (options?: MutationOptions<AddEpigramFormType>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newEpigram: AddEpigramFormType) => postEpigram(newEpigram),
    ...options,
    onSuccess: (...args) => {
      // 성공 시 에피그램 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['epigrams'] });

      // 사용자 정의 onSuccess 콜백 실행
      if (options?.onSuccess) {
        options.onSuccess(...args);
      }
    },
  });
};

export default useAddEpigram;
