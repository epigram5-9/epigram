import quries from '@/apis/queries';
import { updateMe } from '@/apis/user';
import { GetUserReponseType, GetUserRequestType, PatchMeRequestType } from '@/schema/user';
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
