import useEpigramQuery from '@/hooks/epigramQueryHook';
import CommentSection from '@/pageLayout/Epigram/EpigramComment';
import EpigramFigure from '@/pageLayout/Epigram/EpigramFigure';
import Image from 'next/image';
import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: epigram, isLoading, error } = useEpigramQuery({ id: id as string });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div> 에러 발생!! {(error as Error).message}</div>;
  if (!epigram) return <div>Epigram이 없는데요.</div>;

  return (
    <div className='flex flex-col '>
      <nav className='flex justify-between border-b-2 px-6 py-4'>
        <Image src='/arrow-left.svg' alt='뒤로가기 버튼' width={36} height={36} />
        <Image src='/logo.svg' alt='Epigram 로고' width={172} height={48} />
        <Image src='/share.svg' alt='공유 버튼' width={36} height={36} />
      </nav>
      <EpigramFigure epigram={epigram} />
      <CommentSection />
    </div>
  );
}

export default DetailPage;
