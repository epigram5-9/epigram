import React from 'react';
import Header from '@/components/Header/Header';
import TodayEpigram from '@/components/main/TodayEpigram';
import EmotionSelector from '@/components/Emotion/EmotionSelector';
import RecentEpigrams from '@/components/main/RecentEpigram';
import RecentComments from '@/components/main/RecentComment';

function MainLayout() {
  return (
    <>
      <Header icon='search' routerPage='/.' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <main className='w-full min-h-screen bg-background-100 flex flex-col items-center'>
        <div className='flex flex-col items-center gap-6 mt-6'>
          <section className='w-[360px] flex flex-col items-center'>
            <TodayEpigram />
          </section>
          <section className='w-[360px] flex flex-col items-center'>
            <EmotionSelector />
          </section>
          <section className='w-[360px] flex flex-col items-center'>
            <RecentEpigrams />
          </section>
          <section className='w-[360px] flex flex-col items-center'>
            <RecentComments />
          </section>
        </div>
      </main>
    </>
  );
}

export default MainLayout;
