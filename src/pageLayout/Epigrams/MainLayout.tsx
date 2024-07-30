import React from 'react';
import Header from '@/components/Header/Header';
import TodayEpigram from '@/components/main/TodayEpigram';
import TodayEmotion from '@/components/main/TodayEmotion';
import RecentEpigrams from '@/components/main/RecentEpigram';
import RecentComments from '@/components/main/RecentComment';
import FAB from '@/components/main/FAB';

function MainLayout() {
  return (
    <>
      <Header icon='search' routerPage='/.' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <main className='w-full min-h-screen bg-background-100 flex flex-col items-center'>
        <div className='w-[360px] flex flex-col items-center gap-6 mt-10 mb-40'>
          <section className='mt-10'>
            <TodayEpigram />
          </section>
          <section className='mt-10'>
            <TodayEmotion />
          </section>
          <section className='mt-10'>
            <RecentEpigrams />
          </section>
          <section className='mt-10'>
            <RecentComments />
          </section>
        </div>
      </main>
      <FAB />
    </>
  );
}

export default MainLayout;
