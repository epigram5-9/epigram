import queries from '@/apis/queries';
import { updateMe, createPresignedUrl } from '@/apis/user';
import { GetUserRequestType, PatchMeRequestType, PostPresignedUrlRequestType, PostPresignedUrlResponseType } from '@/schema/user';
import { MutationOptions } from '@/types/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    onSuccess: (data: PostPresignedUrlResponseType) =>
      // 이미지 URL 반환
      data.url,
  });
