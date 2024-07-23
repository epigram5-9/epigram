import postSignup from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    },
    onError: () => {},
  });
};

export default useRegisterMutation;
