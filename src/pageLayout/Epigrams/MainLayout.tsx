import React from 'react';
import Header from '@/components/Header/Header';
import TodayEpigram from '@/components/main/TodayEpigram';
import EmotionSelector from '@/components/Emotion/EmotionSelector';
import RecentEpigrams from '@/components/main/RecentEpigram';
import RecentComments from '@/components/main/RecentComment';

function MainLayout() {
  return (
    <div>
      <Header icon='search' routerPage='/.' isLogo insteadOfLogo='' isProfileIcon isShareIcon={false} isButton={false} textInButton='' disabled={false} onClick={() => {}} />
      <main>
        <TodayEpigram />
        <EmotionSelector />
        <RecentEpigrams />
        <RecentComments />
      </main>
    </div>
  );
}

export default MainLayout;
