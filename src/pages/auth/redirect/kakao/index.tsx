import useKakaoLogin from '@/hooks/useKakaoLogin';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Kakao() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { mutate: login } = useKakaoLogin();

  useEffect(() => {
    if (code) {
      login(code);
    } else {
      /* eslint-disable no-console */
      console.log(code); // code가 없을 때 콘솔에 출력
    }
  }, [code, login]);
}
