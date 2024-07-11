import quries from '@/apis/queries';
import { updateMe, createPresignedUrl } from '@/apis/user';
import { GetUserReponseType, GetUserRequestType, PatchMeRequestType, PostImageRequestType, PostImageResponseType } from '@/schema/user';
import { MutationOptions } from '@/types/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useMeQuery = () => useQuery(quries.user.getMe());

export const useUserQuery = (requset: GetUserRequestType) => useQuery(quries.user.getUser(requset));

export const useUpdateMe = (options: MutationOptions<GetUserReponseType>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PatchMeRequestType) => updateMe(request),
    ...options,
    onSuccess: (...arg) => {
      queryClient.invalidateQueries(quries.user.getMe());
      if (options?.onSuccess) {
        options?.onSuccess(...arg);
      }
    },
  });
};

// presignedUrl 생성
export const useCreatePresignedUrl = () =>
  useMutation({
    mutationFn: (request: PostImageRequestType) => createPresignedUrl(request),
    onSuccess: (data: PostImageResponseType) =>
      // 이미지 URL 반환
      data.url,
    onError: (error) => {
      // 에러 처리 로직 구현
      console.error(error); // eslint-disable-line no-console
    },
  });
