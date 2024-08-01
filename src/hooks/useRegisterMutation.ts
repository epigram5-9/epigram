import { postSignup } from '@/apis/auth';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { isAxiosError } from 'axios';

const useRegisterMutation = (onRegisterError: (field: 'email' | 'nickname') => void) => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const { status, data } = error.response || {};

        if (!status) return;

        if (status === 400) {
          const errorMessage = data?.message || '잘못된 요청입니다. 입력 값을 확인해주세요.';

          if (errorMessage.includes('이미 사용중인 이메일')) {
            toast({
              description: '이미 사용중인 이메일입니다.',
              className: 'border-state-error text-state-error font-semibold right-0 top-0',
            });
            onRegisterError('email');
            return;
          }

          toast({
            description: errorMessage,
            className: 'border-state-error text-state-error font-semibold',
          });
          return;
        }

        if (status === 500) {
          const errorMessage = data?.message || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

          // NOTE: swagger 문서에서 중복된 닉네임은 500에러와 함께 "Internal Server Error" 메시지로 응답 옴
          if (errorMessage.includes('Internal Server Error')) {
            toast({
              description: '이미 존재하는 닉네임입니다.',
              className: 'border-state-error text-state-error font-semibold',
            });
            onRegisterError('nickname');
            return;
          }

          toast({
            description: errorMessage,
            className: 'border-state-error text-state-error font-semibold',
          });
          return;
        }

        if (status >= 500) {
          toast({
            description: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            className: 'border-state-error text-state-error font-semibold',
          });
          return;
        }

        toast({
          description: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          className: 'border-state-error text-state-error font-semibold',
        });
      }
    },
  });
};

export default useRegisterMutation;
