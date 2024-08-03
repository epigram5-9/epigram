import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useGoogleLogin from '@/hooks/useGoogleLogin';

export default function Google() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { mutate: login } = useGoogleLogin();

  useEffect(() => {
    if (code) {
      login(code);
    } else {
      /* eslint-disable no-console */
      console.log(code); // code가 없을 때 콘솔에 출력
    }
  }, [code, login]);
}

// code가 없는 경우의 예시 http://localhost:3000/auth/redirect/kakao
// 토스트로 에러 메시지 띄우고, 로그인 페이지로 리다이렉트
