import queries from '@/apis/queries';
import { updateMe, createPresignedUrl } from '@/apis/user';
import { GetUserRequestType, PatchMeRequestType, PostPresignedUrlRequestType, PostPresignedUrlResponseType } from '@/schema/user';
import { MutationOptions } from '@/types/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

export const useMeQuery = () => useQuery(queries.user.getMe());

export const useUserQuery = (request: GetUserRequestType) => useQuery(queries.user.getUser(request));

export const useUpdateMe = (onRegisterError: () => void, onModalClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PatchMeRequestType) => updateMe(request),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.user.getMe());
      onModalClose();
      toast({
        title: '프로필 수정 완료',
        description: '프로필 수정이 완료되었습니다.',
        className: 'bg-illust-green text-white font-semibold',
      });
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        return;
      }

      const { status, data } = error.response || {};

      const errorMessage = data?.message || '잘못된 요청입니다. 입력 값을 확인해주세요.';

      // NOTE: swagger 문서에서 닉네임 관련은 400 에러로 응답 옴.
      if (status === 400) {
        if (errorMessage.includes('Validation Failed')) {
          toast({
            description: '닉네임 입력은 필수입니다.',
            className: 'bg-state-error text-white font-semibold',
          });
        } else {
          toast({
            description: errorMessage,
            className: 'bg-state-error text-white font-semibold',
          });
        }

        onRegisterError();
        return;
      }

      toast({
        description: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        className: 'bg-state-error text-white font-semibold',
      });
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
