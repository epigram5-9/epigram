import NewHeader from '@/components/Header/NewHeader';
import { useMeQuery } from '@/hooks/userQueryHooks';
import UserInfo from '@/types/user';
import EmotionMonthlyLogs from '@/pageLayout/MypageLayout/EmotionMonthlyLogs';
import Profile from '@/user/ui-profile/Profile';
import { useRouter } from 'next/navigation';
import MyContent from './MyContent';

export default function MyPageLayout() {
  const { data, isLoading, isError }: { data: UserInfo | undefined; isLoading: boolean; isError: boolean } = useMeQuery();

  const router = useRouter();

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading</div>;
  }

  // NOTE: 회원정보가 확인되지 않는다면 로그인 페이지로 이동
  if (!data) {
    router.push('/login');
    return false;
  }

  return (
    <div className='bg-background-100 w-full relative h-dvh'>
      <NewHeader />
      <div className='bg-background-100 w-full h-[200px]'></div>
      <div className='w-full flex flex-col items-center bg-blue-100 rounded-3xl relative shadow-3xl'>
        <Profile image={data.image} nickname={data.nickname} />
        <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 border border-black'>오늘의 감정</div>
        <EmotionMonthlyLogs userId={data.id} />
      </div>
      <div className='bg-background-100 flex flex-col items-center w-full py-[100px]'>
        <MyContent userId={data.id} />
      </div>
    </div>
  );
}
