import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useGoogleLogin from '@/hooks/useGoogleLogin'; // useGoogleLogin 훅을 가져옵니다

export default function Google() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code'); // URL에서 'code' 값을 가져옵니다
  const { mutate: login } = useGoogleLogin(); // useGoogleLogin 훅에서 mutate 함수를 가져옵니다

  useEffect(() => {
    if (code) {
      login(code);
    } else {
      /* eslint-disable no-console */
      console.log('No code found in URL parameters'); // code가 없을 때 콘솔에 출력
    }
  }, [code, login]);

  return null; // 컴포넌트가 UI를 렌더링하지 않음
}
