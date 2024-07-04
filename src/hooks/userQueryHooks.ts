import quries from '@/apis/queries';
import { updateMe } from '@/apis/user';
import { GetUserRequestType, PatchMeRequestType } from '@/schema/user';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useMeQuery = () => useQuery(quries.user.getMe());

export const useUserQuery = (requset: GetUserRequestType) => useQuery(quries.user.getUser(requset));

export const useUpdateMe = () =>
  useMutation({
    mutationFn: (request: PatchMeRequestType) => updateMe(request),
  });
