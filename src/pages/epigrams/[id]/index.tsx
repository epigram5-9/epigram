import { EpigramRequestSchema } from '@/schema/epigram';
import useEpigramQuery from '@/hooks/useEpigramQueryHook';
import EpigramComment from '@/pageLayout/Epigram/EpigramComment';
import EpigramFigure from '@/pageLayout/Epigram/EpigramFigure';
import { useRouter } from 'next/router';
import { useMeQuery } from '@/hooks/userQueryHooks';
import Header from '@/components/Header/Header';

function DetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const parsedId = EpigramRequestSchema.safeParse({ id });

  const { data: epigram, isLoading, error } = useEpigramQuery(parsedId.success ? parsedId.data : undefined, parsedId.success);
  const { data: userData } = useMeQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (!parsedId.success) return <div>잘못된 Epigram ID입니다.</div>;
  if (error) return <div>에러 발생!! {(error as Error).message}</div>;
  if (!epigram) return <div>Epigram을 찾을 수 없습니다.</div>;

  return (
    <div className='flex flex-col min-h-screen '>
      <Header icon='search' routerPage='/search' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <EpigramFigure epigram={epigram} currentUserId={userData?.id} />
      <EpigramComment epigramId={epigram.id} currentUserId={userData?.id} userImage={userData?.image} />
    </div>
  );
}

export default DetailPage;
