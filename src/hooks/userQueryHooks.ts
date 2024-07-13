import queries from '@/apis/queries';
import { updateMe } from '@/apis/user';
import { GetUserResponseType, GetUserRequestType, PatchMeRequestType } from '@/schema/user';
import { MutationOptions } from '@/types/query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useMeQuery = () => useQuery(queries.user.getMe());

export const useUserQuery = (request: GetUserRequestType) => useQuery(queries.user.getUser(request));

export const useUpdateMe = (options: MutationOptions<GetUserResponseType>) => {
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
