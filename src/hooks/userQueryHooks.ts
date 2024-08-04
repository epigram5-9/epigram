import queries from '@/apis/queries';
import { updateMe, createPresignedUrl } from '@/apis/user';
import { GetUserRequestType, PatchMeRequestType, PostPresignedUrlRequestType, PostPresignedUrlResponseType } from '@/schema/user';
import { MutationOptions } from '@/types/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

export const useMeQuery = () => useQuery(queries.user.getMe());

export const useUserQuery = (request: GetUserRequestType) => useQuery(queries.user.getUser(request));

export const useUpdateMe = (options: MutationOptions<PatchMeRequestType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PatchMeRequestType) => updateMe(request),
    ...options,
    onSuccess: (...arg) => {
      queryClient.invalidateQueries(queries.user.getMe());
      if (options?.onSuccess) {
        options?.onSuccess(...arg);
      }
    },
  });
};

// presignedUrl 생성
export const useCreatePresignedUrl = (options?: MutationOptions<PostPresignedUrlRequestType>) =>
  useMutation({
    mutationFn: (request: PostPresignedUrlRequestType) => createPresignedUrl(request),
    ...options,
    onSuccess: (data: PostPresignedUrlResponseType) => data.url, // 이미지 URL 반환
    onError: (error) => {
      if (!isAxiosError(error)) {
        return;
      }

      toast({
        description: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        className: 'bg-state-error text-white font-semibold',
      });
    },
  });
