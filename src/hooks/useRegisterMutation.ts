import { postSignup } from '@/apis/auth';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { isAxiosError } from 'axios';

const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toast({
          description: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
          className: 'border-state-error text-state-error font-semibold',
        });
        return;
      }

      const { status } = error.response || {};

      if (status === 400) {
        toast({
          description: '이미 사용중인 이메일입니다.',
          className: 'border-state-error text-state-error font-semibold',
        });
        return;
      }

      if (status === 500) {
        toast({
          description: '이미 존재하는 닉네임입니다.',
          className: 'border-state-error text-state-error font-semibold',
        });
        return;
      }

      toast({
        description: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        className: 'border-state-error text-state-error font-semibold',
      });
    },
  });
};

export default useRegisterMutation;
