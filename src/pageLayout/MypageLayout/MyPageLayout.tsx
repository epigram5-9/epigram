import Header from '@/components/Header/Header';

export default function MyPageLayout() {
  return (
    <div className='bg-background-100 w-full relative h-dvh'>
      <Header icon='back' routerPage='/mypage' isLogo={false} insteadOfLogo='' isProfileIcon={false} isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <div className='w-full flex flex-col items-center bg-blue-100 rounded-3xl relative shadow-3xl'>
        <div className='flex flex-col w-full lg:max-w-[640px] md:max-w-[640px] mt-[160px] space-y-0 md:mb-10 mb-5 border border-black'>프로필</div>
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
