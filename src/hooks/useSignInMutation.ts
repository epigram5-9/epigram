import { postSignin } from '@/apis/auth';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useSigninMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/epigrams');
    },
    onError: () => {
      toast({ description: '이메일 혹은 비밀번호를 확인해주세요.', className: 'border-state-error text-state-error font-semibold' });
    },
  });
};

export default useSigninMutation;
