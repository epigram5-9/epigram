// NOTE: 페이지이동 확인용 페이지

import { useRouter } from 'next/router';

export default function Detailpage() {
  const router = useRouter();
  const { id } = router.query;

  return <div>안녕하세 {id}페이지입니다.</div>;
}
