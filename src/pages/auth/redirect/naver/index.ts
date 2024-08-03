import useNaverLogin from '@/hooks/useNaverLogin';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Naver() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const { mutate: login } = useNaverLogin();

  useEffect(() => {
    if (code && state) {
      login({ code, state });
    } else {
      /* eslint-disable no-console */
      console.log(code, state); // code가 없을 때 콘솔에 출력
    }
  }, [code, state, login]);
}
