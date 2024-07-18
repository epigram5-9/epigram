import postSignin from '@/apis/auth';
import quries from '@/apis/queries';
import { updateMe } from '@/apis/user';
import { GetUserReponseType, GetUserRequestType, PatchMeRequestType } from '@/schema/user';
import { MutationOptions } from '@/types/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

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

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    },
    onError: (error) => {
      // NOTE: 임시 테스트용 콘솔, 토스트 추가 예정
      /* eslint-disable no-console */
      console.error(error);
    },
  });
};
