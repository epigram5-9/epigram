import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import { refreshGoogleToken } from '@/apis/postGoogleOauth';
import { AxiosError } from 'axios';

interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string; // Optional: 리프레시 토큰이 반환되는 경우
}

const useRefreshToken = (refreshToken: string) => {
  const router = useRouter();

  return useMutation<RefreshTokenResponse, AxiosError, void>({
    mutationFn: async () => {
      const result = await refreshGoogleToken(refreshToken);
      localStorage.setItem('accessToken', result.access_token);
      if (result.refresh_token) {
        localStorage.setItem('refreshToken', result.refresh_token);
      }
      return result;
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast({
          description: '리프레시 토큰이 유효하지 않습니다. 다시 로그인해 주세요.',
          className: 'bg-state-error text-white font-semibold',
        });
        router.push('/auth/SignIn');
      } else {
        toast({
          description: '알 수 없는 에러가 발생했습니다.',
          className: 'bg-state-error text-white font-semibold',
        });
      }
    },
  });
};

export default useRefreshToken;
