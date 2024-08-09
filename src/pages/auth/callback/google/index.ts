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
      console.log('No code found in URL parameters'); // code가 없을 때 콘솔에 출력
    }
  }, [code, login]);
}
