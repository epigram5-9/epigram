import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useRefreshToken from '@/hooks/useRefreshToken';
import { toast } from '@/components/ui/use-toast';

export default function RefreshToken() {
  const router = useRouter();
  const refreshToken = localStorage.getItem('refreshToken') || ''; // 로컬 스토리지에서 리프레시 토큰을 가져옵니다
  const { mutate: refresh } = useRefreshToken(refreshToken); // 훅을 사용하여 리프레시 토큰을 갱신합니다

  useEffect(() => {
    if (refreshToken) {
      refresh(); // 리프레시 토큰을 사용하여 엑세스 토큰을 갱신합니다
    } else {
      toast({
        description: '리프레시 토큰이 없습니다. 로그인 페이지로 이동합니다.',
        className: 'bg-state-error text-white font-semibold',
      });
      router.push('/auth/SignIn'); // 로그인 페이지로 리다이렉트
    }
  }, [refreshToken, refresh, router]);

  return null; // 컴포넌트가 UI를 렌더링하지 않음
}
