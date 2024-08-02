import postGoogleOauth from '@/apis/postGoogleOauth';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';

const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (code: string) => {
      const result = await postGoogleOauth(code);
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);
      return result;
    },
    onSuccess: () => {
      router.push('/epigrams');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const status = error.response?.status;

        if (!status) return;

        if (status === 400) {
          toast({ description: '잘못된 요청입니다. 요청을 확인해 주세요.', className: 'bg-state-error text-white font-semibold' });
          router.push('/auth/SignIn');
          return;
        }

        if (status >= 500) {
          toast({ description: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.', className: 'bg-state-error text-white font-semibold' });
        }
      }
      toast({ description: '알 수 없는 에러가 발생했습니다.', className: 'bg-state-error text-white font-semibold' });
    },
  });
};

export default useGoogleLogin;
