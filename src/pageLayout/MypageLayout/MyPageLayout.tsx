import Header from '@/components/Header/Header';
import { useMeQuery } from '@/hooks/userQueryHooks';
import UserInfo from '@/types/user';
import Profile from '@/user/ui-profile/Profile';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
      <Header icon='back' routerPage='/mypage' isLogo={false} insteadOfLogo='' isProfileIcon={false} isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='bg-background-100 w-full h-[200px]'></div>
      <div className='w-full flex flex-col items-center bg-blue-100 rounded-3xl relative shadow-3xl'>
        <Profile image={data.image} nickname={data.nickname} />
        <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 border border-black'>오늘의 감정</div>
        <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 border border-black'>캘린더</div>
        <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 border border-black'>감정차트</div>
      </div>
      <div className='bg-background-100 flex flex-col items-center w-full py-[100px]'>
        <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] gap-12'>
          <div className='inline-flex gap-6'>
            <p className='text-neutral-400 font-semibold text-2xl'>내 에피그램(19)</p>
            <p className='text-black-600 font-semibold text-2xl'>내 댓글(110)</p>
          </div>
          <div className='w-full'>댓글 컴포넌트</div>
        </div>
      </div>
    </div>
  );
}
