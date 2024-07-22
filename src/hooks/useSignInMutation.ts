import postSignin from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useSigninMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      router.push('/');
    },
    onError: (error) => {
      // NOTE: 임시 테스트용 콘솔, 토스트 추가 예정
      /* eslint-disable no-console */
      console.error(error);
    },
  });
};

export default useSigninMutation;
