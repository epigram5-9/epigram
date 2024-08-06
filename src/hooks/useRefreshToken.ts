import { useMutation } from '@tanstack/react-query';
import { postRefreshToken } from '@/apis/auth';
import { PostRefreshTokenRequestType, PostRefreshTokenResponseType } from '@/schema/auth';

const useRefreshToken = () =>
  useMutation<PostRefreshTokenResponseType, Error, PostRefreshTokenRequestType>({
    mutationFn: postRefreshToken,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
    },
    onError: () => {
      localStorage.removeItem('refreshToken');
    },
  });

export default useRefreshToken;
