import quries from '@/apis/queries';
import { GetUserRequestType } from '@/schema/user';
import { useQuery } from '@tanstack/react-query';

const useGetMyContentHook = (requset: GetUserRequestType) => useQuery(quries.user.getMyContentCount(requset));

export default useGetMyContentHook;
