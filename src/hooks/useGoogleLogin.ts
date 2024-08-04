import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import postGoogleOauth from '@/apis/postGoogleOauth';
import { toast } from '@/components/ui/use-toast';

const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (code: string) => {
      const idToken = await postGoogleOauth(code);
      localStorage.setItem('accessToken', idToken.accessToken);
      localStorage.setItem('refreshToken', idToken.refreshToken);
      return { idToken };
    },
    onSuccess: () => {
      router.push('/epigrams');
    },
    onError: (error) => {
      let errorMessage = '알 수 없는 에러가 발생했습니다.';

      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          errorMessage = '잘못된 요청입니다. 요청을 확인해 주세요.';
        } else if (Number(status) >= 500) {
          errorMessage = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        }
      }

      toast({
        description: errorMessage,
        className: 'bg-state-error text-white font-semibold',
      });

      router.push('/auth/SignIn');
    },
  });
};

export default useGoogleLogin;
