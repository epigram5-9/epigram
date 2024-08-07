import { postSignin } from '@/apis/auth';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { isAxiosError } from 'axios';

const useSigninMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/epigrams');
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        return;
      }

      const { status } = error.response || {};

      if (status === 500) {
        toast({
          description: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          className: 'bg-state-error text-white font-semibold',
        });
        return;
      }

      // NOTE: status값은 항상 있으며 undefined와 숫자를 비교연산 할 수 없어 Number로 설정
      if (Number(status) >= 500) {
        toast({
          description: '서버에서 예상치 못한 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
          className: 'bg-state-error text-white font-semibold',
        });
        return;
      }

      toast({
        description: '이메일 혹은 비밀번호를 확인해주세요.',
        className: 'bg-state-error text-white font-semibold',
      });
    },
  });
};

export default useSigninMutation;
